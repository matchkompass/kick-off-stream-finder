
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Check, X, Star } from "lucide-react";

interface ProviderPageProps {
  providerName: string;
  onBack: () => void;
}

export const ProviderPage = ({ providerName, onBack }: ProviderPageProps) => {
  const providerData = {
    name: providerName,
    logo: "🔵",
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: true,
      conference: true,
      catchUp: true,
      noAds: true,
      offline: false
    },
    competitions: [
      { name: "Bundesliga", coverage: 100 },
      { name: "Champions League", coverage: 100 },
      { name: "Premier League", coverage: 100 },
      { name: "DFB-Pokal", coverage: 100 }
    ],
    pros: [
      "Komplette Bundesliga-Abdeckung",
      "Alle Champions League Spiele",
      "Konferenz-Schaltungen verfügbar",
      "4K Qualität inklusive"
    ],
    cons: [
      "Höherer Preis als Konkurrenz",
      "Keine Offline-Downloads",
      "Vertragsbindung erforderlich"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>

        <div className="space-y-6">
          {/* Provider Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{providerData.logo}</span>
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">{providerData.name}</CardTitle>
                    <CardDescription className="text-lg">Premium Streaming Service</CardDescription>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-2xl font-bold text-blue-600">€{providerData.monthlyPrice}</div>
                  <div className="text-sm text-gray-600">pro Monat</div>
                  <div className="text-xs text-gray-500">€{providerData.yearlyPrice}/Jahr</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-lg py-3 px-8">
                <ExternalLink className="h-5 w-5 mr-2" />
                Jetzt {providerData.name} abonnieren
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Funktionen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(providerData.features).map(([feature, available]) => (
                  <div key={feature} className="flex items-center space-x-2">
                    {available ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                    <span className={available ? "text-gray-900" : "text-gray-500"}>
                      {feature === 'fourK' && '4K Qualität'}
                      {feature === 'multiDevice' && 'Mehrere Geräte'}
                      {feature === 'liveReplay' && 'Live Replay'}
                      {feature === 'conference' && 'Konferenz'}
                      {feature === 'catchUp' && 'Catch-Up'}
                      {feature === 'noAds' && 'Werbefrei'}
                      {feature === 'offline' && 'Offline Downloads'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Competitions */}
          <Card>
            <CardHeader>
              <CardTitle>Verfügbare Wettbewerbe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {providerData.competitions.map((comp, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{comp.name}</div>
                    <Badge variant={comp.coverage === 100 ? "default" : "secondary"}>
                      {comp.coverage}% Abdeckung
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Vorteile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {providerData.pros.map((pro, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">{pro}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Nachteile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {providerData.cons.map((con, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <X className="h-5 w-5 text-red-600 mt-0.5" />
                      <span className="text-sm">{con}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
