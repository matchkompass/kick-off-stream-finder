import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Search, Check, Trophy, ExternalLink, Star, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useStreamingOptimizer } from "@/hooks/useStreamingOptimizer";
import { useClubSelection } from "@/hooks/useClubSelection";
import { useLeagues } from "@/hooks/useLeagues";
import { useStreamingProviders } from "@/hooks/useStreamingProviders";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StreamingWizardProps {
  embedded?: boolean;
}

const getContrastColor = (hexColor: string): string => {
  if (!hexColor) return '#000000';
  const color = hexColor.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

export const StreamingWizard = ({ embedded = false }: StreamingWizardProps) => {
  const { 
    clubsByCountry, 
    selectedClubs, 
    toggleClub, 
    searchTerm, 
    setSearchTerm, 
    loading: clubsLoading, 
    getSelectedClubNames,
    getSelectedClubLeagues,
    expandedCountries,
    toggleCountryExpansion,
    sortedCountries,
    leagues,
    countryFilter,
    setCountryFilter
  } = useClubSelection();

  const { data: streamingData, isLoading: streamingLoading } = useStreamingProviders();
  const { optimize, results, loading: optimizing, error, clearResults } = useStreamingOptimizer();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLeagues, setSelectedLeagues] = useState<number[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [ownedProviders, setOwnedProviders] = useState<number[]>([]);
  const [showAllResults, setShowAllResults] = useState(false);

  // Auto-select leagues based on selected clubs
  useEffect(() => {
    if (selectedClubs.length > 0) {
      const clubLeagues = getSelectedClubLeagues();
      setSelectedLeagues(clubLeagues);
    } else {
      setSelectedLeagues([]);
    }
  }, [selectedClubs, getSelectedClubLeagues]);

  // Run optimizer when entering results step
  useEffect(() => {
    if (currentStep === 5 && selectedClubs.length > 0) {
      optimize(selectedClubs, ownedProviders);
    }
  }, [currentStep, selectedClubs, ownedProviders, optimize]);

  const maxSteps = 5;

  // Group leagues by country
  const leaguesByCountry = leagues.reduce((acc, league) => {
    const country = league.country_code || 'INT';
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(league);
    return acc;
  }, {} as Record<string, typeof leagues>);

  // Step 1: Club Selection with Country Grouping
  const renderStep1 = () => (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">Welche Vereine interessieren Sie?</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Wählen Sie Ihre Lieblingsvereine aus. Die beliebtesten Vereine werden zuerst angezeigt.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Verein oder Land suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <select
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
              className="border rounded px-2 py-2 text-sm"
            >
              <option value="">Alle Länder</option>
              {sortedCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {sortedCountries.map(country => (
            <div key={country} className="border rounded-lg">
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleCountryExpansion(country)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{country}</span>
                  <Badge variant="secondary" className="text-xs">
                    {clubsByCountry[country]?.length || 0} Vereine
                  </Badge>
                </div>
                {expandedCountries.has(country) ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </div>
              
              {expandedCountries.has(country) && (
                <div className="p-3 border-t bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {clubsByCountry[country]?.map((club) => (
                      <div
                        key={club.club_id}
                        onClick={() => toggleClub(club.club_id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedClubs.includes(club.club_id)
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              backgroundColor: club.primary_color || '#f3f4f6',
                              color: club.primary_color ? getContrastColor(club.primary_color) : '#374151'
                            }}
                          >
                            {club.logo_url ? 
                              <img src={club.logo_url} alt={club.name} className="w-8 h-8 rounded-full" /> : 
                              club.name?.[0] || '?'
                            }
                          </div>
                          <div className="text-xs font-medium text-gray-900 text-center">{club.name}</div>
                          <div className="text-xs text-gray-500 text-center">{club.country}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedClubs.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">Ausgewählte Vereine:</p>
            <div className="flex flex-wrap gap-2">
              {getSelectedClubNames().map((name) => (
                <Badge key={name} variant="secondary" className="text-xs">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Step 2: League Selection
  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Ihre Wettbewerbe</CardTitle>
        <CardDescription>
          Basierend auf Ihren Vereinen wurden automatisch alle relevanten Wettbewerbe ausgewählt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(leaguesByCountry).map(([countryCode, countryLeagues]) => {
            const hasSelectedLeagues = countryLeagues.some(league => selectedLeagues.includes(league.league_id));
            if (!hasSelectedLeagues && countryCode !== 'INT') return null;

            return (
              <div key={countryCode}>
                <h3 className="font-medium text-gray-900 mb-3">
                  {countryCode === 'INT' ? 'Internationale Wettbewerbe' : `${countryCode} Wettbewerbe`}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {countryLeagues
                    .filter(league => countryCode === 'INT' || selectedLeagues.includes(league.league_id))
                    .map((league) => (
                    <div
                      key={league.league_id}
                      className={`p-3 border rounded-lg transition-all ${
                        selectedLeagues.includes(league.league_id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🏆</span>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{league.league}</div>
                          <div className="text-xs text-gray-500">{league.country_code}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  // Step 3: Features
  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Gewünschte Features</CardTitle>
        <CardDescription>
          Wählen Sie die Features aus, die für Sie wichtig sind.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: "conference", label: "Konferenz-Schaltungen", desc: "Mehrere Spiele gleichzeitig" },
            { key: "catchUp", label: "Nachträglich schauen", desc: "Spiele on-demand abrufen" },
            { key: "fourK", label: "4K Qualität", desc: "Ultra HD Streaming" },
            { key: "multiDevice", label: "Mehrere Geräte", desc: "Parallel auf verschiedenen Geräten" },
            { key: "noAds", label: "Werbefrei", desc: "Ohne Werbeunterbrechungen" },
            { key: "offline", label: "Offline-Downloads", desc: "Spiele herunterladen" }
          ].map(feature => (
            <div key={feature.key} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <Checkbox
                id={feature.key}
                checked={selectedFeatures.includes(feature.key)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFeatures(prev => [...prev, feature.key]);
                  } else {
                    setSelectedFeatures(prev => prev.filter(f => f !== feature.key));
                  }
                }}
                className="mt-1"
              />
              <div>
                <Label htmlFor={feature.key} className="font-medium cursor-pointer">{feature.label}</Label>
                <div className="text-sm text-gray-500">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Step 4: Owned Providers
  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Bereits vorhandene Streaming-Dienste</CardTitle>
        <CardDescription>
          Wählen Sie die Streaming-Dienste aus, die Sie bereits besitzen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <Button
            variant={ownedProviders.length === 0 ? "default" : "outline"}
            onClick={() => setOwnedProviders([])}
            className="mb-2"
          >
            Ich habe noch keine Streaming-Abos
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {streamingData && streamingData.map((provider: any) => (
            <div
              key={provider.streamer_id || provider.id}
              onClick={() => setOwnedProviders((prev) => 
                prev.includes(provider.streamer_id || provider.id) 
                  ? prev.filter(id => id !== (provider.streamer_id || provider.id))
                  : [...prev, provider.streamer_id || provider.id]
              )}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                ownedProviders.includes(provider.streamer_id || provider.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{provider.logo_url ? 
                    <img src={provider.logo_url} alt={provider.name} className="w-8 h-8" /> :
                    provider.name?.[0] || '?'
                  }</span>
                  <div>
                    <div className="font-medium text-gray-900">{provider.name}</div>
                    <div className="text-sm text-gray-500">€{provider.monthly_price}/Monat</div>
                  </div>
                </div>
                {ownedProviders.includes(provider.streamer_id || provider.id) && (
                  <Check className="h-5 w-5 text-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Step 5: Results
  const renderStep5 = () => {
    const topResults = results.filter(r => r.coveragePercentage === 100).slice(0, 1);
    const otherResults = results.filter(r => r.coveragePercentage < 100 || !topResults.some(tr => tr.totalCost === r.totalCost));

    return (
      <div className="space-y-4 md:space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-green-800 text-lg md:text-xl">
              <Trophy className="h-5 w-5" />
              Ihre optimale Streaming-Lösung
            </CardTitle>
            <CardDescription className="text-green-700 text-sm md:text-base">
              Die günstigste 100% Abdeckung für Ihre ausgewählten Vereine.
            </CardDescription>
          </CardHeader>
        </Card>

        {optimizing && (
          <div className="text-center text-blue-600">Berechne optimale Kombinationen...</div>
        )}
        
        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}

        {topResults.length > 0 && (
          <div className="space-y-4">
            {topResults.map((result, idx) => (
              <Card key={`top-${idx}`} className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg md:text-xl flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    {result.coveragePercentage}% Vollständige Abdeckung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="mb-2 font-medium">
                        Anbieter: {result.providers.map((p: any) => p.name || p.provider_name).join(", ")}
                      </div>
                      <div className="mb-2">
                        Monatliche Kosten: <span className="font-bold text-lg">€{result.totalCost}</span>
                      </div>
                      <div className="mb-2">
                        Abgedeckte Ligen: {result.coveredLeagues} von {result.totalLeagues}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {result.providers.map((provider: any, pidx: number) => (
                        <div key={pidx} className="flex items-center justify-between p-2 bg-white rounded border">
                          <span className="text-sm font-medium">{provider.name || provider.provider_name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">€{provider.monthly_price}</span>
                            {provider.affiliate_url && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={provider.affiliate_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.leagueDetails && result.leagueDetails.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Abgedeckte Ligen:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {result.leagueDetails.map((league: any, lidx: number) => (
                          <TooltipProvider key={lidx}>
                            <Tooltip>
                              <TooltipTrigger className="text-left">
                                <div className="flex items-center justify-between p-2 bg-white rounded border text-sm">
                                  <span>{league.league_name}</span>
                                  <div className="flex items-center gap-1">
                                    <span>{league.coverage_percentage}%</span>
                                    <Info className="h-3 w-3" />
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{league.covered_games} von {league.total_games} Spielen</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {otherResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Weitere Kombinationen</h3>
              <Button
                variant="outline" 
                onClick={() => setShowAllResults(!showAllResults)}
                className="text-sm"
              >
                {showAllResults ? 'Weniger anzeigen' : `Alle ${otherResults.length} anzeigen`}
              </Button>
            </div>

            {(showAllResults ? otherResults : otherResults.slice(0, 3)).map((result, idx) => (
              <Card key={`other-${idx}`} className="border-gray-200">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{result.coveragePercentage}% Abdeckung</span>
                    <span className="font-bold">€{result.totalCost}/Monat</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {result.providers.map((p: any) => p.name || p.provider_name).join(", ")}
                  </div>
                  <div className="text-xs text-gray-500">
                    {result.coveredLeagues} von {result.totalLeagues} Ligen abgedeckt
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button onClick={() => { clearResults(); setCurrentStep(1); }} variant="outline" className="mr-4 text-sm md:text-base">
            Neue Analyse starten
          </Button>
        </div>
      </div>
    );
  };

  if (clubsLoading || streamingLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Daten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={embedded ? "" : "min-h-screen bg-gray-50 py-4 md:py-8"}>
      <div className={embedded ? "" : "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"}>
        {/* Progress Bar */}
        {!embedded && (
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Ihre personalisierte Streaming-Empfehlung
              </h1>
              <span className="text-sm text-gray-600">Schritt {currentStep} von {maxSteps}</span>
            </div>
            <Progress value={(currentStep / maxSteps) * 100} className="h-2" />
          </div>
        )}

        {/* Steps */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}

        {/* Navigation */}
        {currentStep < maxSteps && (
          <div className="flex justify-between mt-6 md:mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="text-sm md:text-base px-3 md:px-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(maxSteps, currentStep + 1))}
              disabled={
                (currentStep === 1 && selectedClubs.length === 0) ||
                (currentStep === 2 && selectedLeagues.length === 0)
              }
              className="bg-green-600 hover:bg-green-700 text-sm md:text-base px-3 md:px-4"
            >
              {currentStep === maxSteps - 1 ? "Empfehlung erhalten" : "Weiter"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};