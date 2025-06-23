
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Search, Check, TrendingUp } from "lucide-react";

const teams = [
  { id: 1, name: "Bayern München", league: "Bundesliga", logo: "🔴" },
  { id: 2, name: "Borussia Dortmund", league: "Bundesliga", logo: "🟡" },
  { id: 3, name: "Real Madrid", league: "La Liga", logo: "⚪" },
  { id: 4, name: "FC Barcelona", league: "La Liga", logo: "🔵" },
  { id: 5, name: "Manchester City", league: "Premier League", logo: "🔵" },
  { id: 6, name: "Liverpool FC", league: "Premier League", logo: "🔴" },
  { id: 7, name: "Juventus Turin", league: "Serie A", logo: "⚫" },
  { id: 8, name: "AC Mailand", league: "Serie A", logo: "🔴" },
];

const competitions = [
  { id: "bundesliga", name: "Bundesliga", description: "Deutsche Meisterschaft" },
  { id: "champions-league", name: "Champions League", description: "Europas Königsklasse" },
  { id: "premier-league", name: "Premier League", description: "Englische Liga" },
  { id: "la-liga", name: "La Liga", description: "Spanische Liga" },
  { id: "serie-a", name: "Serie A", description: "Italienische Liga" },
  { id: "europa-league", name: "Europa League", description: "Europäischer Pokal" },
  { id: "dfb-pokal", name: "DFB-Pokal", description: "Deutscher Pokal" },
  { id: "nationalteam", name: "Nationalmannschaft", description: "Deutschland & internationale Spiele" },
];

export const StreamingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([]);
  const [budget, setBudget] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [preferences, setPreferences] = useState({
    flexibility: "monthly",
    devices: [] as string[],
    features: [] as string[],
  });

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.league.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTeam = (teamId: number) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const toggleCompetition = (competitionId: string) => {
    setSelectedCompetitions(prev => 
      prev.includes(competitionId)
        ? prev.filter(id => id !== competitionId)
        : [...prev, competitionId]
    );
  };

  const getRecommendation = () => {
    // Simplified recommendation logic
    const coverage = Math.min(85 + selectedCompetitions.length * 3, 98);
    const monthlyCost = Math.max(25, budget * 0.8);
    
    return {
      coverage,
      monthlyCost,
      providers: ["Sky Sport", "DAZN"],
      savings: Math.max(0, budget - monthlyCost)
    };
  };

  const recommendation = currentStep === 4 ? getRecommendation() : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Ihre personalisierte Streaming-Empfehlung
            </h1>
            <span className="text-sm text-gray-600">Schritt {currentStep} von 3</span>
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>

        {/* Step 1: Team Selection */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Welche Vereine interessieren Sie?</CardTitle>
              <CardDescription>
                Wählen Sie Ihre Lieblingsvereine aus. Sie können mehrere Teams auswählen.
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
              <CardTitle>Welche Wettbewerbe sind wichtig?</CardTitle>
              <CardDescription>
                Wählen Sie die Ligen und Pokale aus, die Sie regelmäßig verfolgen möchten.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {competitions.map((competition) => (
                  <div
                    key={competition.id}
                    onClick={() => toggleCompetition(competition.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedCompetitions.includes(competition.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{competition.name}</div>
                        <div className="text-sm text-gray-500">{competition.description}</div>
                      </div>
                      {selectedCompetitions.includes(competition.id) && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedCompetitions.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-600 mb-2">Ausgewählte Wettbewerbe:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompetitions.map(compId => {
                      const comp = competitions.find(c => c.id === compId);
                      return (
                        <Badge key={compId} variant="secondary" className="bg-blue-100 text-blue-800">
                          {comp?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Budget and Preferences */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Budget und Präferenzen</CardTitle>
              <CardDescription>
                Legen Sie Ihr monatliches Budget fest und wählen Sie weitere Präferenzen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Monatliches Budget</Label>
                <div className="mt-2">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>€10</span>
                    <span className="font-medium text-lg text-gray-900">€{budget}/Monat</span>
                    <span>€100</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Flexibilität</Label>
                <div className="space-y-2">
                  {[
                    { id: "monthly", label: "Monatlich kündbar", desc: "Maximale Flexibilität" },
                    { id: "yearly", label: "Jahresabo", desc: "Bessere Preise durch längere Laufzeit" }
                  ].map(option => (
                    <div
                      key={option.id}
                      onClick={() => setPreferences(prev => ({ ...prev, flexibility: option.id }))}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        preferences.flexibility === option.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.desc}</div>
                        </div>
                        {preferences.flexibility === option.id && (
                          <Check className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Wichtige Zusatzfeatures</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "4K Qualität",
                    "Offline-Downloads", 
                    "Multi-Device Streaming",
                    "Keine Werbung"
                  ].map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={preferences.features.includes(feature)}
                        onCheckedChange={(checked) => {
                          setPreferences(prev => ({
                            ...prev,
                            features: checked
                              ? [...prev.features, feature]
                              : prev.features.filter(f => f !== feature)
                          }));
                        }}
                      />
                      <Label htmlFor={feature}>{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && recommendation && (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <TrendingUp className="h-5 w-5" />
                  Ihre optimale Streaming-Lösung
                </CardTitle>
                <CardDescription className="text-green-700">
                  Basierend auf Ihren Präferenzen haben wir die beste Kombination für Sie gefunden.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {recommendation.coverage}%
                    </div>
                    <div className="text-sm text-gray-600">Spielabdeckung</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      €{recommendation.monthlyCost}
                    </div>
                    <div className="text-sm text-gray-600">Pro Monat</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      €{recommendation.savings}
                    </div>
                    <div className="text-sm text-gray-600">Ersparnis/Monat</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empfohlene Anbieter-Kombination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendation.providers.map((provider, index) => (
                    <div key={provider} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-blue-600">{provider.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{provider}</div>
                          <div className="text-sm text-gray-500">
                            {index === 0 ? "Bundesliga, Champions League" : "Premier League, Serie A"}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Zum Anbieter
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={() => setCurrentStep(1)}
                variant="outline" 
                className="mr-4"
              >
                Neue Analyse starten
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Angebote vergleichen
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {currentStep < 4 && (
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
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={
                (currentStep === 1 && selectedTeams.length === 0) ||
                (currentStep === 2 && selectedCompetitions.length === 0)
              }
              className="bg-green-600 hover:bg-green-700"
            >
              {currentStep === 3 ? "Empfehlung erhalten" : "Weiter"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
