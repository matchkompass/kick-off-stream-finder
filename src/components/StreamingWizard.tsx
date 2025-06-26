import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Search, Check, Trophy, ExternalLink, Star } from "lucide-react";
import { useStreamingOptimizer } from "@/hooks/useStreamingOptimizer";
import { useClubSelection } from "@/hooks/useClubSelection";
import { useLeagues } from "@/hooks/useLeagues";
import { useStreamingProviders } from "@/hooks/useStreamingProviders";

interface StreamingWizardProps {
  embedded?: boolean;
}

export const StreamingWizard = ({ embedded = false }: StreamingWizardProps) => {
  const { clubs, selectedClubs, toggleClub, searchTerm, setSearchTerm, loading: clubsLoading, getSelectedClubNames } = useClubSelection();
  const { data: leaguesData, isLoading: leaguesLoading } = useLeagues();
  const { data: streamingData, isLoading: streamingLoading } = useStreamingProviders();
  const { optimize, results, loading: optimizing, error, clearResults } = useStreamingOptimizer();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLeagues, setSelectedLeagues] = useState<number[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [ownedProviders, setOwnedProviders] = useState<number[]>([]);

  // Step 2: Auto-select leagues based on selected clubs
  useEffect(() => {
    if (currentStep === 2 && leaguesData && selectedClubs.length > 0) {
      // Find all leagues for selected clubs
      const clubLeagues = new Set<number>();
      leaguesData.forEach((league: any) => {
        if (league.club_ids && league.club_ids.some((id: number) => selectedClubs.includes(id))) {
          clubLeagues.add(league.league_id || league.id);
        }
      });
      setSelectedLeagues(Array.from(clubLeagues));
    }
  }, [currentStep, leaguesData, selectedClubs]);

  // Step 5: Run optimizer when entering results step
  useEffect(() => {
    if (currentStep === 5 && selectedClubs.length > 0) {
      optimize(selectedClubs);
    }
    // eslint-disable-next-line
  }, [currentStep]);

  const maxSteps = 5;

  // Step 1: Club Selection
  const renderStep1 = () => (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">Welche Vereine interessieren Sie?</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Wählen Sie Ihre Lieblingsvereine aus. Die Top 10 werden angezeigt, weitere finden Sie über die Suche.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Verein oder Liga suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {clubs.map((club) => (
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
                <div className="text-2xl flex items-center justify-center w-8 h-8 rounded-full">
                  {club.logo_url ? <img src={club.logo_url} alt={club.name} className="w-8 h-8 rounded-full" /> : club.name[0]}
                </div>
                <div className="text-xs font-medium text-gray-900 text-center">{club.name}</div>
              </div>
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
        <CardTitle>Ligen anpassen</CardTitle>
        <CardDescription>
          Basierend auf Ihren Vereinen wurden Ligen vorausgewählt. Sie können weitere hinzufügen oder entfernen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Ligen Ihrer Vereine</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {leaguesData && leaguesData.filter((l: any) => selectedLeagues.includes(l.league_id || l.id)).map((league: any) => (
                <div
                  key={league.league_id || league.id}
                  onClick={() => setSelectedLeagues((prev) => prev.includes(league.league_id || league.id) ? prev.filter(id => id !== (league.league_id || league.id)) : [...prev, league.league_id || league.id])}
                  className={`p-3 border ${selectedLeagues.includes(league.league_id || league.id) ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"} rounded-lg cursor-pointer transition-all hover:shadow-sm`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{league.icon || "🏆"}</span>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{league.name}</div>
                      <div className="text-xs text-gray-500">{league.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {streamingData && streamingData.map((provider: any) => (
            <div
              key={provider.streamer_id || provider.id}
              onClick={() => setOwnedProviders((prev) => prev.includes(provider.streamer_id || provider.id) ? prev.filter(id => id !== (provider.streamer_id || provider.id)) : [...prev, provider.streamer_id || provider.id])}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                ownedProviders.includes(provider.streamer_id || provider.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{provider.logo || provider.provider_name[0]}</span>
                  <div>
                    <div className="font-medium text-gray-900">{provider.provider_name}</div>
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
  const renderStep5 = () => (
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
      {optimizing && <div className="text-center text-blue-600">Berechne optimale Kombinationen...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result, idx) => (
            <Card key={idx} className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 text-lg md:text-xl">
                  {result.coveragePercentage}% Abdeckung für Ihre Auswahl
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 font-medium">Anbieter: {result.providers.map((p: any) => p.provider_name).join(", ")}</div>
                <div className="mb-2">Monatliche Kosten: <span className="font-bold">€{result.totalCost}</span></div>
                <div className="mb-2">Abgedeckte Ligen: {result.coveredLeagues} von {result.totalLeagues}</div>
                {/* Add more details as needed */}
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
