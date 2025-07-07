import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Club {
  club_id: number;
  name: string;
  country: string;
  logo_url?: string;
  primary_color?: string;
  popularity_score?: number;
  leagues?: League[];
}

interface League {
  league_id: number;
  league: string;
  country_code: string;
}

const COUNTRY_ORDER = ['DE', 'GB', 'ES', 'IT', 'FR', 'INT'];

export function useClubSelection() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedClubs, setSelectedClubs] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set(['DE']));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch clubs with their leagues
      const { data: clubsData, error: clubsError } = await supabase
        .from('clubs')
        .select(`
          club_id,
          name,
          country,
          logo_url,
          primary_color,
          popularity_score,
          club_leagues(
            league_id,
            leagues(
              league_id,
              league,
              country_code
            )
          )
        `)
        .order('popularity_score', { ascending: false });

      if (clubsError) throw clubsError;

      // Fetch all leagues
      const { data: leaguesData, error: leaguesError } = await supabase
        .from('leagues')
        .select('league_id, league, country_code')
        .order('country_code');

      if (leaguesError) throw leaguesError;

      const processedClubs = (clubsData || []).map((club: any) => ({
        ...club,
        leagues: club.club_leagues?.map((cl: any) => cl.leagues).filter(Boolean) || []
      }));

      setClubs(processedClubs);
      setLeagues(leaguesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group clubs by country
  const clubsByCountry = clubs.reduce((acc, club) => {
    const country = club.country || 'Unknown';
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(club);
    return acc;
  }, {} as Record<string, Club[]>);

  // Sort countries and filter clubs
  const sortedCountries = Object.keys(clubsByCountry).sort((a, b) => {
    const aIndex = COUNTRY_ORDER.indexOf(a);
    const bIndex = COUNTRY_ORDER.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Filter clubs based on search term and country
  const filteredClubsByCountry = sortedCountries.reduce((acc, country) => {
    if (countryFilter && country !== countryFilter) return acc;
    
    const countryClubs = clubsByCountry[country].filter(club =>
      searchTerm === '' || 
      club.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (countryClubs.length > 0) {
      acc[country] = countryClubs;
    }
    return acc;
  }, {} as Record<string, Club[]>);

  const toggleClub = (clubId: number) => {
    setSelectedClubs(prev =>
      prev.includes(clubId)
        ? prev.filter(id => id !== clubId)
        : [...prev, clubId]
    );
  };

  const clearSelection = () => {
    setSelectedClubs([]);
  };

  const getSelectedClubNames = () => {
    return clubs
      .filter(club => selectedClubs.includes(club.club_id))
      .map(club => club.name || '');
  };

  const getSelectedClubLeagues = () => {
    const selectedClubsData = clubs.filter(club => selectedClubs.includes(club.club_id));
    const allLeagues = new Set<number>();
    
    selectedClubsData.forEach(club => {
      club.leagues?.forEach(league => {
        allLeagues.add(league.league_id);
      });
    });
    
    return Array.from(allLeagues);
  };

  const toggleCountryExpansion = (country: string) => {
    setExpandedCountries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(country)) {
        newSet.delete(country);
      } else {
        newSet.add(country);
      }
      return newSet;
    });
  };

  return {
    clubs,
    clubsByCountry: filteredClubsByCountry,
    leagues,
    selectedClubs,
    loading,
    searchTerm,
    setSearchTerm,
    countryFilter,
    setCountryFilter,
    expandedCountries,
    toggleCountryExpansion,
    toggleClub,
    clearSelection,
    getSelectedClubNames,
    getSelectedClubLeagues,
    sortedCountries: Object.keys(filteredClubsByCountry)
  };
}
