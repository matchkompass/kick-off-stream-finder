import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

interface OptimizationRequest {
  clubIds: number[];
  targetCoverage?: number;
  maxProviders?: number;
  ownedProviders?: number[];
}

interface OptimizationResult {
  providers: StreamingProvider[];
  totalCost: number;
  coveragePercentage: number;
  coveredLeagues: number;
  totalLeagues: number;
  savings?: number;
  leagueDetails: LeagueDetail[];
  missingLeagues: LeagueDetail[];
}

interface StreamingProvider {
  streamer_id: number;
  provider_name: string;
  name: string;
  monthly_price: string;
  covered_league_ids: number[];
  features?: any;
  affiliate_url?: string;
}

interface LeagueDetail {
  league_id: number;
  league_name: string;
  coverage_percentage: number;
  total_games: number;
  covered_games: number;
}

export class StreamingOptimizer {
  private supabase: SupabaseClient<Database>;
  private cache = new Map<string, OptimizationResult[]>();

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  async optimizeForClubs(request: OptimizationRequest): Promise<OptimizationResult[]> {
    const cacheKey = JSON.stringify(request);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // 1. Get required leagues for selected clubs
    const requiredLeagueIds = await this.getRequiredLeagues(request.clubIds);
    
    // 2. Get all streaming providers with their coverage
    const providers = await this.getStreamingProviders(requiredLeagueIds);
    
    // 3. Filter out owned providers from available options
    const availableProviders = request.ownedProviders && request.ownedProviders.length > 0
      ? providers.filter(p => !request.ownedProviders!.includes(p.streamer_id))
      : providers;

    // 4. Calculate optimal combinations for different coverage levels
    const results = await Promise.all([
      this.findOptimalCombination(requiredLeagueIds, availableProviders, 100),
      this.findOptimalCombination(requiredLeagueIds, availableProviders, 90),
      this.findOptimalCombination(requiredLeagueIds, availableProviders, 66)
    ]);

    // 5. Add owned providers to each result if they exist
    const finalResults = results.filter(Boolean).map(result => {
      if (request.ownedProviders && request.ownedProviders.length > 0) {
        const ownedProvidersData = providers.filter(p => request.ownedProviders!.includes(p.streamer_id));
        return this.combineWithOwnedProviders(result!, ownedProvidersData, requiredLeagueIds);
      }
      return result!;
    });

    // 6. Generate all possible combinations for transparency
    const allCombinations = await this.generateAllCombinations(requiredLeagueIds, availableProviders, request.ownedProviders || []);

    this.cache.set(cacheKey, [...finalResults, ...allCombinations]);
    return [...finalResults, ...allCombinations];
  }

  private async getRequiredLeagues(clubIds: number[]): Promise<number[]> {
    const { data } = await this.supabase
      .from('club_leagues')
      .select('league_id')
      .in('club_id', clubIds);

    return [...new Set(data?.map(cl => cl.league_id) || [])];
  }

  private async getStreamingProviders(requiredLeagueIds: number[]): Promise<StreamingProvider[]> {
    const { data } = await this.supabase
      .from('streaming')
      .select(`
        streamer_id,
        provider_name,
        name,
        monthly_price,
        features,
        affiliate_url,
        streaming_leagues!inner(
          league_id,
          coverage_percentage
        )
      `)
      .in('streaming_leagues.league_id', requiredLeagueIds);

    return data?.map(provider => ({
      ...provider,
      covered_league_ids: provider.streaming_leagues
        .filter(sl => sl.coverage_percentage > 0)
        .map(sl => sl.league_id)
    })) || [];
  }

  private async findOptimalCombination(
    requiredLeagueIds: number[],
    providers: StreamingProvider[],
    targetCoverage: number
  ): Promise<OptimizationResult | null> {
    const maxCombinations = 4; // Maximum 4 providers
    let bestSolution: OptimizationResult | null = null;

    // Try combinations of 1 to maxCombinations providers
    for (let size = 1; size <= maxCombinations; size++) {
      const combinations = this.getCombinations(providers, size);
      
      for (const combination of combinations) {
        const solution = await this.evaluateCombination(
          combination,
          requiredLeagueIds,
          targetCoverage
        );
        
        if (solution && solution.coveragePercentage >= targetCoverage) {
          if (!bestSolution || solution.totalCost < bestSolution.totalCost) {
            bestSolution = solution;
          }
        }
      }
      
      // If we found a solution at this size, we can stop (greedy approach)
      if (bestSolution) break;
    }

    return bestSolution;
  }

  private async evaluateCombination(
    providers: StreamingProvider[],
    requiredLeagueIds: number[],
    targetCoverage?: number
  ): Promise<OptimizationResult> {
    const coveredLeagues = new Set<number>();
    let totalCost = 0;

    // Calculate coverage and cost
    providers.forEach(provider => {
      provider.covered_league_ids.forEach(leagueId => {
        if (requiredLeagueIds.includes(leagueId)) {
          coveredLeagues.add(leagueId);
        }
      });
      totalCost += this.parsePrice(provider.monthly_price);
    });

    const coveragePercentage = (coveredLeagues.size / requiredLeagueIds.length) * 100;

    // Get detailed league information
    const leagueDetails = await this.getLeagueDetails(Array.from(coveredLeagues), providers);
    const missingLeagues = await this.getLeagueDetails(
      requiredLeagueIds.filter(id => !coveredLeagues.has(id)), 
      []
    );

    return {
      providers,
      totalCost: Math.round(totalCost * 100) / 100,
      coveragePercentage: Math.round(coveragePercentage),
      coveredLeagues: coveredLeagues.size,
      totalLeagues: requiredLeagueIds.length,
      leagueDetails,
      missingLeagues
    };
  }

  private async getLeagueDetails(leagueIds: number[], providers: StreamingProvider[]): Promise<LeagueDetail[]> {
    if (leagueIds.length === 0) return [];

    const { data: leagues } = await this.supabase
      .from('leagues')
      .select('league_id, league, "number of games"')
      .in('league_id', leagueIds);

    const { data: streamingLeagues } = await this.supabase
      .from('streaming_leagues')
      .select('league_id, coverage_percentage, streamer_id')
      .in('league_id', leagueIds)
      .in('streamer_id', providers.map(p => p.streamer_id));

    return leagues?.map(league => {
      const streamingData = streamingLeagues?.find(sl => 
        sl.league_id === league.league_id && 
        providers.some(p => p.streamer_id === sl.streamer_id)
      );
      
      const coveragePercentage = streamingData?.coverage_percentage || 0;
      const totalGames = league["number of games"] || 0;
      const coveredGames = Math.round((totalGames * coveragePercentage) / 100);

      return {
        league_id: league.league_id,
        league_name: league.league || '',
        coverage_percentage: coveragePercentage,
        total_games: totalGames,
        covered_games: coveredGames
      };
    }) || [];
  }

  private combineWithOwnedProviders(
    result: OptimizationResult, 
    ownedProviders: StreamingProvider[], 
    requiredLeagueIds: number[]
  ): OptimizationResult {
    const allProviders = [...ownedProviders, ...result.providers];
    const coveredLeagues = new Set<number>();
    
    allProviders.forEach(provider => {
      provider.covered_league_ids.forEach(leagueId => {
        if (requiredLeagueIds.includes(leagueId)) {
          coveredLeagues.add(leagueId);
        }
      });
    });

    const coveragePercentage = (coveredLeagues.size / requiredLeagueIds.length) * 100;

    return {
      ...result,
      providers: allProviders,
      coveragePercentage: Math.round(coveragePercentage),
      coveredLeagues: coveredLeagues.size,
      // Don't add cost of owned providers
      totalCost: result.totalCost
    };
  }

  private async generateAllCombinations(
    requiredLeagueIds: number[], 
    providers: StreamingProvider[], 
    ownedProviders: number[]
  ): Promise<OptimizationResult[]> {
    const allCombinations: OptimizationResult[] = [];
    const maxCombinations = 4;

    for (let size = 1; size <= maxCombinations; size++) {
      const combinations = this.getCombinations(providers, size);
      
      for (const combination of combinations) {
        const result = await this.evaluateCombination(combination, requiredLeagueIds);
        
        // Add owned providers if they exist
        if (ownedProviders.length > 0) {
          const ownedProvidersData = providers.filter(p => ownedProviders.includes(p.streamer_id));
          const finalResult = this.combineWithOwnedProviders(result, ownedProvidersData, requiredLeagueIds);
          allCombinations.push(finalResult);
        } else {
          allCombinations.push(result);
        }
      }
    }

    // Sort by coverage percentage (desc), then by cost (asc)
    return allCombinations.sort((a, b) => {
      if (b.coveragePercentage !== a.coveragePercentage) {
        return b.coveragePercentage - a.coveragePercentage;
      }
      return a.totalCost - b.totalCost;
    });
  }

  private getCombinations<T>(arr: T[], size: number): T[][] {
    if (size > arr.length) return [];
    if (size === 1) return arr.map(item => [item]);
    
    const combinations: T[][] = [];
    for (let i = 0; i <= arr.length - size; i++) {
      const head = arr[i];
      const tailCombinations = this.getCombinations(arr.slice(i + 1), size - 1);
      for (const tail of tailCombinations) {
        combinations.push([head, ...tail]);
      }
    }
    return combinations;
  }

  private parsePrice(priceString: string): number {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
  }

  // Clear cache when prices might have changed
  clearCache(): void {
    this.cache.clear();
  }
}