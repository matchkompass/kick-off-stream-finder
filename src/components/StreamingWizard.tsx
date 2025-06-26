import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Search, Check, Trophy, ExternalLink } from "lucide-react";
import { useClubs } from "@/hooks/useClubs";
import { useLeagues } from "@/hooks/useLeagues";
import { useStreamingProviders } from "@/hooks/useStreamingProviders";
import { transformClubData, transformLeagueData, transformStreamingData } from "@/utils/dataTransformers";

interface StreamingWizardProps {
  embedded?: boolean;
}

export const StreamingWizard = ({ embedded = false }: StreamingWizardProps) => {
  const { data: clubsData, isLoading: clubsLoading } = useClubs();
  const { data: leaguesData, isLoading: leaguesLoading } = useLeagues();
  const { data: streamingData, isLoading: streamingLoading } = useStreamingProviders();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [ownedProviders, setOwnedProviders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllClubs, setShowAllClubs] = useState(false);

  const maxSteps = embedded ? 4 : 5;

  // Transform data
  const teams = clubsData?.map(transformClubData) || [];
  const competitions = leaguesData?.map(transformLeagueData) || [];
  const providers = streamingData?.map(transformStreamingData) || [];

  // Get top 10 most popular clubs for initial display
  const topClubs = teams.slice(0, 10);
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.league.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTeam = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;

    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(prev => prev.filter(id => id !== teamId));
      setSelectedCompetitions(prev => 
        prev.filter(comp => !team.competitions.includes(comp))
      );
    } else {
      setSelectedTeams(prev => [...prev, teamId]);
      setSelectedCompetitions(prev => {
        const newComps = team.competitions.filter(comp => !prev.includes(comp));
        return [...prev, ...newComps];
      });
    }
  };

  const toggleCompetition = (competitionId: string) => {
    setSelectedCompetitions(prev => 
      prev.includes(competitionId)
        ? prev.filter(id => id !== competitionId)
        : [...prev, competitionId]
    );
  };

  const calculateRecommendations = () => {
    if (!providers.length) return [];

    // Calculate coverage for each provider combination
    const availableProviders = providers.filter(p => !ownedProviders.includes(p.name));
    
    const providerCoverage = availableProviders.map(provider => {
      const relevantComps = selectedCompetitions.length > 0 ? selectedCompetitions : Object.keys(provider.competitions);
      const totalCoverage = relevantComps.reduce((sum, comp) => {
        return sum + (provider.competitions[comp as keyof typeof provider.competitions] || 0);
      }, 0);
      const avgCoverage = relevantComps.length > 0 ? Math.min(100, totalCoverage / relevantComps.length) : 0;
      
      return {
        provider,
        coverage: Math.round(avgCoverage),
        price: provider.monthlyPrice
      };
    });

    // Sort by coverage
    providerCoverage.sort((a, b) => b.coverage - a.coverage);

    const recommendations = [];
    
    // Perfect combination (100% coverage)
    const perfectCombination = findBestCombination(providerCoverage, 100);
    if (perfectCombination) {
      recommendations.push({
        ...perfectCombination,
        description: "Perfekte Kombination (100% Abdeckung)",
        type: "perfect"
      });
    }

    // Above 90% coverage (cheapest)
    const goodCombination = findBestCombination(providerCoverage, 90, true);
    if (goodCombination && goodCombination.coverage >= 90) {
      recommendations.push({
        ...goodCombination,
        description: "Günstigste Option (>90% Abdeckung)",
        type: "good"
      });
    }

    // Budget variant (>66% coverage)
    const budgetCombination = findBestCombination(providerCoverage, 66, true);
    if (budgetCombination && budgetCombination.coverage >= 66) {
      recommendations.push({
        ...budgetCombination,
        description: "Budget-Variante (>66% Abdeckung)",
        type: "budget"
      });
    }

    return recommendations.slice(0, 3);
  };

  const findBestCombination = (providerCoverage: any[], minCoverage: number, prioritizePrice = false) => {
    let bestCombination = null;
    let bestScore = prioritizePrice ? Infinity : 0;

    // Single provider
    for (const single of providerCoverage) {
      if (single.coverage >= minCoverage) {
        const score = prioritizePrice ? single.price : single.coverage;
        if ((prioritizePrice && score < bestScore) || (!prioritizePrice && score > bestScore)) {
          bestCombination = {
            coverage: single.coverage,
            providers: [single.provider.name],
            monthlyCost: single.price,
            providerDetails: [single.provider]
          };
          bestScore = score;
        }
      }
    }

    // Two provider combinations
    for (let i = 0; i < providerCoverage.length - 1; i++) {
      for (let j = i + 1; j < providerCoverage.length; j++) {
        const combinedCoverage = Math.min(100, providerCoverage[i].coverage + (providerCoverage[j].coverage * 0.6));
        const combinedPrice = providerCoverage[i].price + providerCoverage[j].price;
        
        if (combinedCoverage >= minCoverage) {
          const score = prioritizePrice ? combinedPrice : combinedCoverage;
          if ((prioritizePrice && score < bestScore) || (!prioritizePrice && score > bestScore)) {
            bestCombination = {
              coverage: Math.round(combinedCoverage),
              providers: [providerCoverage[i].provider.name, providerCoverage[j].provider.name],
              monthlyCost: combinedPrice,
              providerDetails: [providerCoverage[i].provider, providerCoverage[j].provider]
            };
            bestScore = score;
          }
        }
      }
    }

    return bestCombination;
  };

  const recommendations = currentStep === 5 ? calculateRecommendations() : [];

  if (clubsLoading || leaguesLoading || streamingLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Daten...</p>
        </div>
      </div>
    );
  }

  if (embedded && currentStep === 5) {
    setCurrentStep(1);
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

        {embedded && (
          <div className="mb-4 md:mb-6">
            <Progress value={(currentStep / 4) * 100} className="h-2" />
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">Schritt {currentStep} von 4</span>
            </div>
          </div>
        )}

        {/* Step 1: Club Selection */}
        {currentStep === 1 && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Welche Vereine interessieren Sie?</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Wählen Sie Ihre Lieblingsvereine aus. Die Top 10 werden angezeigt, weitere finden Sie über die Suche.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {/* Top 10 Clubs Grid */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Beliebteste Vereine</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {topClubs.map((team) => (
                    <div
                      key={team.id}
                      onClick={() => toggleTeam(team.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md text-center ${
                        selectedTeams.includes(team.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl">{team.logo}</span>
                        <div className="text-xs font-medium text-gray-900">{team.name}</div>
                        {selectedTeams.includes(team.id) && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Section */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Weitere Vereine</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllClubs(!showAllClubs)}
                  >
                    {showAllClubs ? "Weniger anzeigen" : "Mehr anzeigen"}
                  </Button>
                </div>
                
                {showAllClubs && (
                  <>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Verein oder Liga suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                      {(searchTerm ? filteredTeams : teams.slice(10)).map((team) => (
                        <div
                          key={team.id}
                          onClick={() => toggleTeam(team.id)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedTeams.includes(team.id)
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{team.logo}</span>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm">{team.name}</div>
                              <div className="text-xs text-gray-500">{team.league}</div>
                            </div>
                            {selectedTeams.includes(team.id) && (
                              <Check className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {selectedTeams.length > 0 && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Ausgewählte Vereine:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeams.map(teamId => {
                      const team = teams.find(t => t.id === teamId);
                      return (
                        <Badge key={teamId} variant="secondary" className="text-xs">
                          {team?.logo} {team?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Competition Selection */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Wettbewerbe anpassen</CardTitle>
              <CardDescription>
                Basierend auf Ihren Vereinen wurden Wettbewerbe vorausgewählt. Sie können weitere hinzufügen oder entfernen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Deutschland", "International", "England", "Spanien", "Italien", "Frankreich"].map(country => {
                  const countryCompetitions = competitions.filter(comp => comp.country === country);
                  if (countryCompetitions.length === 0) return null;
                  
                  return (
                    <div key={country}>
                      <h3 className="font-medium text-gray-900 mb-3">{country}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {countryCompetitions.map((competition) => (
                          <div
                            key={competition.key}
                            onClick={() => toggleCompetition(competition.key)}
                            className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                              selectedCompetitions.includes(competition.key)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900 text-sm">{competition.name}</div>
                                <div className="text-xs text-gray-500">{competition.description}</div>
                              </div>
                              {selectedCompetitions.includes(competition.key) && (
                                <Check className="h-4 w-4 text-blue-600" />
                              )}
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
        )}

        {/* Step 3: Features */}
        {currentStep === 3 && (
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
        )}

        {/* Step 4: Owned Providers */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Bereits vorhandene Streaming-Dienste</CardTitle>
              <CardDescription>
                Wählen Sie die Streaming-Dienste aus, die Sie bereits besitzen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((provider) => (
                  <div
                    key={provider.name}
                    onClick={() => {
                      if (ownedProviders.includes(provider.name)) {
                        setOwnedProviders(prev => prev.filter(p => p !== provider.name));
                      } else {
                        setOwnedProviders(prev => [...prev, provider.name]);
                      }
                    }}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      ownedProviders.includes(provider.name)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{provider.logo}</span>
                        <div>
                          <div className="font-medium text-gray-900">{provider.name}</div>
                          <div className="text-sm text-gray-500">€{provider.monthlyPrice}/Monat</div>
                        </div>
                      </div>
                      {ownedProviders.includes(provider.name) && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Results */}
        {currentStep === 5 && recommendations && !embedded && (
          <div className="space-y-4 md:space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-800 text-lg md:text-xl">
                  <Trophy className="h-5 w-5" />
                  Ihre optimalen Streaming-Lösungen
                </CardTitle>
                <CardDescription className="text-green-700 text-sm md:text-base">
                  Basierend auf Ihren Präferenzen und bereits vorhandenen Diensten.
                </CardDescription>
              </CardHeader>
            </Card>

            {recommendations.map((rec, index) => (
              <Card key={index} className={`${
                rec.type === 'perfect' ? 'border-green-500 bg-green-50' : 
                rec.type === 'good' ? 'border-blue-500 bg-blue-50' : 
                'border-orange-500 bg-orange-50'
              }`}>
                <CardHeader className="pb-4">
                  <CardTitle className={`${
                    rec.type === 'perfect' ? 'text-green-800' : 
                    rec.type === 'good' ? 'text-blue-800' : 
                    'text-orange-800'
                  } text-lg md:text-xl`}>
                    {rec.description}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                        {rec.coverage}%
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Spielabdeckung</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                        €{rec.monthlyCost.toFixed(2)}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Pro Monat</div>
                    </div>
                    <div>
                      <div className="text-sm md:text-lg font-medium text-gray-700">
                        {rec.providers.join(" + ")}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Zusätzliche Anbieter</div>
                    </div>
                  </div>

                  {rec.providerDetails && (
                    <div className="space-y-3 border-t pt-4">
                      {rec.providerDetails.map((provider) => (
                        <div key={provider.name} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white rounded-lg space-y-2 md:space-y-0">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg md:text-xl">{provider.logo}</span>
                            <div>
                              <div className="font-medium text-sm md:text-base">{provider.name}</div>
                              <div className="text-xs md:text-sm text-gray-500">€{provider.monthlyPrice}/Monat</div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-xs md:text-sm px-2 md:px-3"
                            onClick={() => window.open(provider.affiliateLink, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                            Zu {provider.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            <div className="text-center">
              <Button 
                onClick={() => setCurrentStep(1)}
                variant="outline" 
                className="mr-4 text-sm md:text-base"
              >
                Neue Analyse starten
              </Button>
            </div>
          </div>
        )}

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
              onClick={() => {
                if (embedded && currentStep === 4) {
                  alert("Analyse abgeschlossen! Wechseln Sie zur Vergleichsseite für Details.");
                  return;
                }
                setCurrentStep(Math.min(maxSteps, currentStep + 1));
              }}
              disabled={
                (currentStep === 1 && selectedTeams.length === 0) ||
                (currentStep === 2 && selectedCompetitions.length === 0)
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

const featureLabels = {
  fourK: "4K Qualität",
  multiDevice: "Mehrere Geräte",
  liveReplay: "Live & Replay", 
  conference: "Konferenz",
  catchUp: "Nachträglich schauen",
  noAds: "Werbefrei",
  offline: "Offline-Downloads"
};
