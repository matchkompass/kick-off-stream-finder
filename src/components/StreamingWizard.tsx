
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Search, Check, TrendingUp, Star, Trophy, ChevronDown, ChevronUp } from "lucide-react";

const teams = [
  { id: 1, name: "Bayern München", league: "Bundesliga", logo: "🔴", competitions: ["bundesliga", "champions-league", "dfb-pokal"] },
  { id: 2, name: "Borussia Dortmund", league: "Bundesliga", logo: "🟡", competitions: ["bundesliga", "champions-league", "dfb-pokal"] },
  { id: 3, name: "Real Madrid", league: "La Liga", logo: "⚪", competitions: ["la-liga", "champions-league", "copa-del-rey"] },
  { id: 4, name: "FC Barcelona", league: "La Liga", logo: "🔵", competitions: ["la-liga", "europa-league", "copa-del-rey"] },
  { id: 5, name: "Manchester City", league: "Premier League", logo: "🔵", competitions: ["premier-league", "champions-league", "fa-cup"] },
  { id: 6, name: "Liverpool FC", league: "Premier League", logo: "🔴", competitions: ["premier-league", "champions-league", "fa-cup"] },
  { id: 7, name: "Juventus Turin", league: "Serie A", logo: "⚫", competitions: ["serie-a", "europa-league", "coppa-italia"] },
  { id: 8, name: "AC Mailand", league: "Serie A", logo: "🔴", competitions: ["serie-a", "champions-league", "coppa-italia"] },
  { id: 9, name: "SC Freiburg", league: "Bundesliga", logo: "🔴", competitions: ["bundesliga", "dfb-pokal"] },
  { id: 10, name: "1. FC Köln", league: "2. Bundesliga", logo: "🔴", competitions: ["2-bundesliga", "dfb-pokal"] },
  { id: 11, name: "Hamburger SV", league: "2. Bundesliga", logo: "🔵", competitions: ["2-bundesliga", "dfb-pokal"] },
  { id: 12, name: "Deutschland", league: "Nationalmannschaft", logo: "🇩🇪", competitions: ["nationalteam", "euro", "wm"] },
];

const competitions = [
  { id: "bundesliga", name: "Bundesliga", description: "Deutsche Meisterschaft", country: "Deutschland" },
  { id: "2-bundesliga", name: "2. Bundesliga", description: "Deutsche Zweitliga", country: "Deutschland" },
  { id: "champions-league", name: "Champions League", description: "Europas Königsklasse", country: "International" },
  { id: "europa-league", name: "Europa League", description: "Europäischer Pokal", country: "International" },
  { id: "conference-league", name: "Conference League", description: "UEFA Conference League", country: "International" },
  { id: "premier-league", name: "Premier League", description: "Englische Liga", country: "England" },
  { id: "la-liga", name: "La Liga", description: "Spanische Liga", country: "Spanien" },
  { id: "serie-a", name: "Serie A", description: "Italienische Liga", country: "Italien" },
  { id: "ligue-1", name: "Ligue 1", description: "Französische Liga", country: "Frankreich" },
  { id: "dfb-pokal", name: "DFB-Pokal", description: "Deutscher Pokal", country: "Deutschland" },
  { id: "fa-cup", name: "FA Cup", description: "Englischer Pokal", country: "England" },
  { id: "copa-del-rey", name: "Copa del Rey", description: "Spanischer Pokal", country: "Spanien" },
  { id: "coppa-italia", name: "Coppa Italia", description: "Italienischer Pokal", country: "Italien" },
  { id: "nationalteam", name: "Nationalmannschaft", description: "Deutschland & internationale Spiele", country: "International" },
  { id: "euro", name: "Europameisterschaft", description: "UEFA EURO", country: "International" },
  { id: "wm", name: "Weltmeisterschaft", description: "FIFA WM", country: "International" },
  { id: "club-wm", name: "FIFA Club WM", description: "FIFA Klub-Weltmeisterschaft", country: "International" },
];

const providers = [
  {
    name: "Sky Sport",
    logo: "🔵",
    monthlyPrice: 29.99,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: true,
      conference: true,
      catchUp: true,
      noAds: true,
      offline: false
    },
    competitions: {
      "bundesliga": 100,
      "2-bundesliga": 0,
      "champions-league": 100,
      "europa-league": 0,
      "conference-league": 0,
      "premier-league": 100,
      "la-liga": 0,
      "serie-a": 0,
      "ligue-1": 0,
      "dfb-pokal": 100,
      "nationalteam": 50
    }
  },
  {
    name: "DAZN",
    logo: "🟡",
    monthlyPrice: 44.99,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: true,
      conference: false,
      catchUp: true,
      noAds: true,
      offline: true
    },
    competitions: {
      "bundesliga": 0,
      "2-bundesliga": 0,
      "champions-league": 85,
      "europa-league": 100,
      "conference-league": 100,
      "premier-league": 0,
      "la-liga": 100,
      "serie-a": 100,
      "ligue-1": 100,
      "dfb-pokal": 0,
      "nationalteam": 30
    }
  },
  {
    name: "WOW",
    logo: "🟣",
    monthlyPrice: 24.99,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: true,
      conference: true,
      catchUp: true,
      noAds: true,
      offline: false
    },
    competitions: {
      "bundesliga": 100,
      "2-bundesliga": 0,
      "champions-league": 100,
      "europa-league": 0,
      "conference-league": 0,
      "premier-league": 100,
      "la-liga": 0,
      "serie-a": 0,
      "ligue-1": 0,
      "dfb-pokal": 100,
      "nationalteam": 50
    }
  },
  {
    name: "Amazon Prime",
    logo: "🔶",
    monthlyPrice: 8.99,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: false,
      conference: false,
      catchUp: true,
      noAds: false,
      offline: true
    },
    competitions: {
      "bundesliga": 0,
      "2-bundesliga": 0,
      "champions-league": 15,
      "europa-league": 0,
      "conference-league": 0,
      "premier-league": 0,
      "la-liga": 0,
      "serie-a": 0,
      "ligue-1": 0,
      "dfb-pokal": 0,
      "nationalteam": 0
    }
  }
];

interface StreamingWizardProps {
  embedded?: boolean;
}

export const StreamingWizard = ({ embedded = false }: StreamingWizardProps) => {
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
    const recommendations = [];
    
    // 100% Abdeckung
    const fullCoverage = {
      coverage: 100,
      providers: ["DAZN", "WOW", "Amazon Prime"],
      monthlyCost: 78.97,
      description: "Maximale Abdeckung",
      features: ["4K", "Multi-Device", "Conference", "Catch-Up", "No Ads", "Offline"]
    };
    
    // 90%+ Abdeckung  
    const goodCoverage = {
      coverage: 95,
      providers: ["DAZN", "WOW"],
      monthlyCost: 69.98,
      description: "Preis-Leistungs-Empfehlung",
      features: ["4K", "Multi-Device", "Conference", "Catch-Up", "No Ads"]
    };
    
    // 50%+ Abdeckung
    const basicCoverage = {
      coverage: 65,
      providers: ["WOW"],
      monthlyCost: 24.99,
      description: "Budget-Option",
      features: ["4K", "Multi-Device", "Conference", "Catch-Up", "No Ads"]
    };
    
    return [fullCoverage, goodCoverage, basicCoverage];
  };

  const recommendations = currentStep === 4 ? calculateRecommendations() : [];

  if (embedded && currentStep === 4) {
    setCurrentStep(1);
  }

  return (
    <div className={embedded ? "" : "min-h-screen bg-gray-50 py-8"}>
      <div className={embedded ? "" : "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"}>
        {/* Progress Bar */}
        {!embedded && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Ihre personalisierte Streaming-Empfehlung
              </h1>
              <span className="text-sm text-gray-600">Schritt {currentStep} von {maxSteps}</span>
            </div>
            <Progress value={(currentStep / maxSteps) * 100} className="h-2" />
          </div>
        )}

        {embedded && (
          <div className="mb-6">
            <Progress value={(currentStep / 3) * 100} className="h-2" />
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">Schritt {currentStep} von 3</span>
            </div>
          </div>
        )}

        {/* Step 1: Team Selection */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Welche Vereine interessieren Sie?</CardTitle>
              <CardDescription>
                Wählen Sie Ihre Lieblingsvereine aus. Relevante Wettbewerbe werden automatisch vorausgewählt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Verein oder Liga suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => toggleTeam(team.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedTeams.includes(team.id)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{team.logo}</span>
                      <div>
                        <div className="font-medium text-gray-900">{team.name}</div>
                        <div className="text-sm text-gray-500">{team.league}</div>
                      </div>
                      {selectedTeams.includes(team.id) && (
                        <Check className="h-5 w-5 text-green-600 ml-auto" />
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
                        <Badge key={teamId} variant="secondary">
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
                            key={competition.id}
                            onClick={() => toggleCompetition(competition.id)}
                            className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                              selectedCompetitions.includes(competition.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900 text-sm">{competition.name}</div>
                                <div className="text-xs text-gray-500">{competition.description}</div>
                              </div>
                              {selectedCompetitions.includes(competition.id) && (
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

        {/* Step 4: Results with three recommendations */}
        {currentStep === 4 && recommendations && !embedded && (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Trophy className="h-5 w-5" />
                  Ihre optimalen Streaming-Lösungen
                </CardTitle>
                <CardDescription className="text-green-700">
                  Basierend auf Ihren Präferenzen haben wir drei Optionen für Sie gefunden.
                </CardDescription>
              </CardHeader>
            </Card>

            {recommendations.map((rec, index) => (
              <Card key={index} className={`${index === 1 ? 'border-blue-500 bg-blue-50' : index === 0 ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`${index === 1 ? 'text-blue-800' : index === 0 ? 'text-green-800' : 'text-orange-800'}`}>
                      {rec.description}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedRecommendation(expandedRecommendation === index ? null : index)}
                    >
                      {expandedRecommendation === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {rec.coverage}%
                      </div>
                      <div className="text-sm text-gray-600">Spielabdeckung</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        €{rec.monthlyCost}
                      </div>
                      <div className="text-sm text-gray-600">Pro Monat</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-700">
                        {rec.providers.join(" + ")}
                      </div>
                      <div className="text-sm text-gray-600">Anbieter-Kombination</div>
                    </div>
                  </div>

                  {expandedRecommendation === index && (
                    <div className="space-y-4 border-t pt-4">
                      <div>
                        <h4 className="font-medium mb-2">Anbieter-Details:</h4>
                        <div className="space-y-2">
                          {rec.providers.map((providerName) => {
                            const provider = providers.find(p => p.name === providerName);
                            if (!provider) return null;
                            
                            return (
                              <div key={providerName} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <span className="text-xl">{provider.logo}</span>
                                  <div>
                                    <div className="font-medium">{provider.name}</div>
                                    <div className="text-sm text-gray-500">
                                      {Object.entries(provider.features)
                                        .filter(([_, value]) => value)
                                        .slice(0, 3)
                                        .map(([key]) => key)
                                        .join(", ")}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold">€{provider.monthlyPrice}</div>
                                  <div className="text-xs text-gray-500">pro Monat</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Alle Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.features.map(feature => (
                            <Badge key={feature} variant="secondary" className="bg-blue-100 text-blue-800">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">
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
                className="mr-4"
              >
                Neue Analyse starten
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {currentStep < maxSteps && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
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
              className="bg-green-600 hover:bg-green-700"
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
