import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Search, Check, TrendingUp, Star, Trophy, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [preferences, setPreferences] = useState({
    conference: false,
    catchUp: false,
    fourK: false,
    multiDevice: false,
    noAds: false,
    offline: false,
  });
  const [expandedRecommendation, setExpandedRecommendation] = useState<number | null>(null);

  const maxSteps = embedded ? 3 : 4;

  // Transform data
  const teams = clubsData?.map(transformClubData) || [];
  const competitions = leaguesData?.map(transformLeagueData) || [];
  const providers = streamingData?.map(transformStreamingData) || [];

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

    // Calculate coverage for each provider based on selected competitions
    const providerCoverage = providers.map(provider => {
      const relevantComps = selectedCompetitions.length > 0 ? selectedCompetitions : Object.keys(provider.competitions);
      const totalCoverage = relevantComps.reduce((sum, comp) => {
        return sum + (provider.competitions[comp as keyof typeof provider.competitions] || 0);
      }, 0);
      const avgCoverage = relevantComps.length > 0 ? totalCoverage / relevantComps.length : 0;
      
      return {
        provider,
        coverage: Math.round(avgCoverage),
        price: provider.monthlyPrice
      };
    });

    // Sort by coverage
    providerCoverage.sort((a, b) => b.coverage - a.coverage);

    const recommendations = [];
    
    // Find best single provider (highest coverage)
    const bestSingle = providerCoverage[0];
    if (bestSingle) {
      recommendations.push({
        coverage: bestSingle.coverage,
        providers: [bestSingle.provider.name],
        monthlyCost: bestSingle.price,
        description: bestSingle.coverage >= 90 ? "Beste Einzellösung" : "Budget-Option",
        features: Object.entries(bestSingle.provider.features)
          .filter(([_, value]) => value)
          .map(([key]) => featureLabels[key as keyof typeof featureLabels] || key),
        providerDetails: [bestSingle.provider]
      });
    }

    // Find best two-provider combination
    const topProviders = providerCoverage.slice(0, 3);
    for (let i = 0; i < topProviders.length - 1; i++) {
      for (let j = i + 1; j < topProviders.length; j++) {
        const combinedCoverage = Math.min(100, topProviders[i].coverage + topProviders[j].coverage * 0.5);
        const combinedPrice = topProviders[i].price + topProviders[j].price;
        
        if (combinedCoverage > (recommendations[0]?.coverage || 0)) {
          recommendations.unshift({
            coverage: Math.round(combinedCoverage),
            providers: [topProviders[i].provider.name, topProviders[j].provider.name],
            monthlyCost: combinedPrice,
            description: "Maximale Abdeckung",
            features: ["4K", "Multi-Device", "Conference", "Catch-Up", "No Ads"],
            providerDetails: [topProviders[i].provider, topProviders[j].provider]
          });
          break;
        }
      }
      if (recommendations.length >= 2) break;
    }

    return recommendations.slice(0, 3);
  };

  const recommendations = currentStep === 4 ? calculateRecommendations() : [];

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

  if (embedded && currentStep === 4) {
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
            <Progress value={(currentStep / 3) * 100} className="h-2" />
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">Schritt {currentStep} von 3</span>
            </div>
          </div>
        )}

        {/* Step 1: Team Selection */}
        {currentStep === 1 && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Welche Vereine interessieren Sie?</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Wählen Sie Ihre Lieblingsvereine aus. Relevante Wettbewerbe werden automatisch vorausgewählt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Verein oder Liga suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                {filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => toggleTeam(team.id)}
                    className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedTeams.includes(team.id)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl md:text-2xl">{team.logo}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm md:text-base">{team.name}</div>
                        <div className="text-xs md:text-sm text-gray-500">{team.league}</div>
                      </div>
                      {selectedTeams.includes(team.id) && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
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

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Streaming-Präferenzen</CardTitle>
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
                      checked={preferences[feature.key as keyof typeof preferences]}
                      onCheckedChange={(checked) => {
                        setPreferences(prev => ({
                          ...prev,
                          [feature.key]: checked
                        }));
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

        {/* Step 4: Enhanced Results with affiliate buttons */}
        {currentStep === 4 && recommendations && !embedded && (
          <div className="space-y-4 md:space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-800 text-lg md:text-xl">
                  <Trophy className="h-5 w-5" />
                  Ihre optimalen Streaming-Lösungen
                </CardTitle>
                <CardDescription className="text-green-700 text-sm md:text-base">
                  Basierend auf Ihren Präferenzen haben wir {recommendations.length} Optionen für Sie gefunden.
                </CardDescription>
              </CardHeader>
            </Card>

            {recommendations.map((rec, index) => (
              <Card key={index} className={`${index === 0 ? 'border-green-500 bg-green-50' : index === 1 ? 'border-blue-500 bg-blue-50' : 'border-orange-500 bg-orange-50'}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`${index === 0 ? 'text-green-800' : index === 1 ? 'text-blue-800' : 'text-orange-800'} text-lg md:text-xl`}>
                      {rec.description}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedRecommendation(expandedRecommendation === index ? null : index)}
                      className="p-2"
                    >
                      {expandedRecommendation === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
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
                      <div className="text-xs md:text-sm text-gray-600">Anbieter-Kombination</div>
                    </div>
                  </div>

                  {expandedRecommendation === index && rec.providerDetails && (
                    <div className="space-y-4 border-t pt-4">
                      <div>
                        <h4 className="font-medium mb-3 text-sm md:text-base">Anbieter-Details:</h4>
                        <div className="space-y-3">
                          {rec.providerDetails.map((provider) => (
                            <div key={provider.name} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white rounded-lg space-y-2 md:space-y-0">
                              <div className="flex items-center space-x-3">
                                <span className="text-lg md:text-xl">{provider.logo}</span>
                                <div>
                                  <div className="font-medium text-sm md:text-base">{provider.name}</div>
                                  <div className="text-xs md:text-sm text-gray-500">
                                    {Object.entries(provider.features)
                                      .filter(([_, value]) => value)
                                      .slice(0, 3)
                                      .map(([key]) => featureLabels[key as keyof typeof featureLabels] || key)
                                      .join(", ")}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="text-right">
                                  <div className="font-bold text-sm md:text-base">€{provider.monthlyPrice}</div>
                                  <div className="text-xs text-gray-500">pro Monat</div>
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
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-sm md:text-base">Alle Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.features.map(feature => (
                            <Badge key={feature} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700 text-sm md:text-base py-2 md:py-3">
                        Diese Kombination wählen
                      </Button>
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
                if (embedded && currentStep === 3) {
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
