
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, X, Star, TrendingUp, Filter } from "lucide-react";

const providers = [
  {
    name: "Sky Sport",
    logo: "🔵",
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    bundesliga: 100,
    "2-bundesliga": 0,
    championsLeague: 100,
    europaLeague: 0,
    conferenceLeague: 0,
    premierLeague: 100,
    laLiga: 0,
    serieA: 0,
    ligue1: 0,
    dfbPokal: 100,
    nationalteam: 50,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: true,
      conference: true,
      catchUp: true,
      noAds: true,
      offline: false
    },
    rating: 4.2,
    popular: true
  },
  {
    name: "DAZN",
    logo: "🟡",
    monthlyPrice: 44.99,
    yearlyPrice: 449.99,
    bundesliga: 0,
    "2-bundesliga": 0,
    championsLeague: 85,
    europaLeague: 100,
    conferenceLeague: 100,
    premierLeague: 0,
    laLiga: 100,
    serieA: 100,
    ligue1: 100,
    dfbPokal: 0,
    nationalteam: 30,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: true,
      conference: false,
      catchUp: true,
      noAds: true,
      offline: true
    },
    rating: 3.8,
    popular: false
  },
  {
    name: "Amazon Prime Video",
    logo: "🔶",
    monthlyPrice: 8.99,
    yearlyPrice: 89.99,
    bundesliga: 0,
    "2-bundesliga": 0,
    championsLeague: 15,
    europaLeague: 0,
    conferenceLeague: 0,
    premierLeague: 0,
    laLiga: 0,
    serieA: 0,
    ligue1: 0,
    dfbPokal: 0,
    nationalteam: 0,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: false,
      conference: false,
      catchUp: true,
      noAds: false,
      offline: true
    },
    rating: 4.1,
    popular: false
  },
  {
    name: "MagentaTV",
    logo: "🔴",
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    bundesliga: 50,
    "2-bundesliga": 100,
    championsLeague: 0,
    europaLeague: 0,
    conferenceLeague: 0,
    premierLeague: 0,
    laLiga: 0,
    serieA: 0,
    ligue1: 0,
    dfbPokal: 50,
    nationalteam: 20,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: true,
      conference: false,
      catchUp: true,
      noAds: true,
      offline: false
    },
    rating: 3.5,
    popular: false
  },
  {
    name: "RTL+",
    logo: "🔺",
    monthlyPrice: 6.99,
    yearlyPrice: 69.99,
    bundesliga: 0,
    "2-bundesliga": 0,
    championsLeague: 0,
    europaLeague: 20,
    conferenceLeague: 100,
    premierLeague: 0,
    laLiga: 0,
    serieA: 0,
    ligue1: 0,
    dfbPokal: 0,
    nationalteam: 0,
    features: {
      fourK: false,
      multiDevice: true,
      liveReplay: true,
      conference: false,
      catchUp: true,
      noAds: false,
      offline: true
    },
    rating: 3.3,
    popular: false
  },
  {
    name: "WOW",
    logo: "🟣",
    monthlyPrice: 24.99,
    yearlyPrice: 249.99,
    bundesliga: 100,
    "2-bundesliga": 0,
    championsLeague: 100,
    europaLeague: 0,
    conferenceLeague: 0,
    premierLeague: 100,
    laLiga: 0,
    serieA: 0,
    ligue1: 0,
    dfbPokal: 100,
    nationalteam: 50,
    features: {
      fourK: true,
      multiDevice: true,
      liveReplay: true,
      conference: true,
      catchUp: true,
      noAds: true,
      offline: false
    },
    rating: 3.9,
    popular: false
  }
];

const leagues = [
  { key: "bundesliga", name: "Bundesliga", icon: "🇩🇪", country: "Deutschland" },
  { key: "2-bundesliga", name: "2. Bundesliga", icon: "🇩🇪", country: "Deutschland" },
  { key: "championsLeague", name: "Champions League", icon: "🏆", country: "International" },
  { key: "europaLeague", name: "Europa League", icon: "🥈", country: "International" },
  { key: "conferenceLeague", name: "Conference League", icon: "🥉", country: "International" },
  { key: "premierLeague", name: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "England" },
  { key: "laLiga", name: "La Liga", icon: "🇪🇸", country: "Spanien" },
  { key: "serieA", name: "Serie A", icon: "🇮🇹", country: "Italien" },
  { key: "ligue1", name: "Ligue 1", icon: "🇫🇷", country: "Frankreich" },
  { key: "dfbPokal", name: "DFB-Pokal", icon: "🏆", country: "Deutschland" },
  { key: "nationalteam", name: "Nationalmannschaft", icon: "🇩🇪", country: "Deutschland" }
];

const featureLabels = {
  fourK: "4K Qualität",
  multiDevice: "Mehrere Geräte",
  liveReplay: "Live & Replay",
  conference: "Konferenz",
  catchUp: "Nachträglich schauen",
  noAds: "Werbefrei",
  offline: "Offline-Downloads"
};

export const ProviderComparison = () => {
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["Deutschland", "International"]);

  const filteredLeagues = leagues.filter(league => 
    selectedCountries.length === 0 || selectedCountries.includes(league.country)
  );

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 100) return "text-green-600 bg-green-100";
    if (percentage >= 50) return "text-orange-600 bg-orange-100";
    if (percentage > 0) return "text-yellow-600 bg-yellow-100";
    return "text-gray-400 bg-gray-100";
  };

  const getPercentageIcon = (percentage: number) => {
    if (percentage >= 100) return <Check className="h-4 w-4" />;
    if (percentage === 0) return <X className="h-4 w-4" />;
    return <span className="text-xs font-bold">{percentage}%</span>;
  };

  const countries = Array.from(new Set(leagues.map(league => league.country)));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Streaming-Anbieter im Vergleich
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finden Sie den perfekten Anbieter für Ihre Lieblings-Ligen. 
            Alle Preise und Abdeckungen transparent im Überblick.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Country Filter */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Länder/Regionen</Label>
                  <div className="space-y-2">
                    {countries.map(country => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox
                          id={`country-${country}`}
                          checked={selectedCountries.includes(country)}
                          onCheckedChange={(checked) => {
                            setSelectedCountries(prev => 
                              checked 
                                ? [...prev, country]
                                : prev.filter(c => c !== country)
                            );
                          }}
                        />
                        <Label htmlFor={`country-${country}`} className="text-sm">{country}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* League Filter */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Wettbewerbe</Label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredLeagues.map(league => (
                      <div key={league.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`league-${league.key}`}
                          checked={selectedLeagues.includes(league.key)}
                          onCheckedChange={(checked) => {
                            setSelectedLeagues(prev => 
                              checked 
                                ? [...prev, league.key]
                                : prev.filter(l => l !== league.key)
                            );
                          }}
                        />
                        <Label htmlFor={`league-${league.key}`} className="text-sm flex items-center gap-1">
                          <span>{league.icon}</span>
                          {league.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature Filter */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Features</Label>
                  <div className="space-y-2">
                    {Object.entries(featureLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${key}`}
                          checked={selectedFeatures.includes(key)}
                          onCheckedChange={(checked) => {
                            setSelectedFeatures(prev => 
                              checked 
                                ? [...prev, key]
                                : prev.filter(f => f !== key)
                            );
                          }}
                        />
                        <Label htmlFor={`feature-${key}`} className="text-sm">{label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedLeagues([]);
                    setSelectedFeatures([]);
                    setSelectedCountries(["Deutschland", "International"]);
                  }}
                  className="w-full"
                >
                  Filter zurücksetzen
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Anbieter-Übersicht</CardTitle>
                <CardDescription>
                  Vergleichen Sie Preise, Liga-Abdeckung und Features der wichtigsten Streaming-Dienste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-2 font-medium text-gray-900">Anbieter</th>
                        <th className="text-center py-4 px-2 font-medium text-gray-900">Preis</th>
                        {(selectedLeagues.length > 0 ? filteredLeagues.filter(league => selectedLeagues.includes(league.key)) : filteredLeagues.slice(0, 5)).map(league => (
                          <th key={league.key} className="text-center py-4 px-2 font-medium text-gray-900 min-w-24">
                            <div className="flex flex-col items-center">
                              <span className="text-xl mb-1">{league.icon}</span>
                              <span className="text-xs">{league.name}</span>
                            </div>
                          </th>
                        ))}
                        <th className="text-center py-4 px-2 font-medium text-gray-900">Bewertung</th>
                        <th className="text-center py-4 px-2 font-medium text-gray-900">Aktion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((provider, index) => {
                        // Filter providers based on selected features
                        if (selectedFeatures.length > 0) {
                          const hasAllFeatures = selectedFeatures.every(feature => 
                            provider.features[feature as keyof typeof provider.features]
                          );
                          if (!hasAllFeatures) return null;
                        }

                        const displayLeagues = selectedLeagues.length > 0 
                          ? filteredLeagues.filter(league => selectedLeagues.includes(league.key))
                          : filteredLeagues.slice(0, 5);

                        return (
                          <tr key={provider.name} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{provider.logo}</span>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900">{provider.name}</span>
                                    {provider.popular && (
                                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                        <Star className="h-3 w-3 mr-1" />
                                        Beliebt
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {Object.entries(provider.features)
                                      .filter(([_, value]) => value)
                                      .slice(0, 2)
                                      .map(([key]) => featureLabels[key as keyof typeof featureLabels])
                                      .join(", ")}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <div>
                                <div className="font-bold text-gray-900">€{provider.monthlyPrice}</div>
                                <div className="text-xs text-gray-500">pro Monat</div>
                                <div className="text-xs text-green-600">
                                  €{(provider.yearlyPrice / 12).toFixed(2)} mit Jahresabo
                                </div>
                              </div>
                            </td>
                            {displayLeagues.map(league => (
                              <td key={league.key} className="py-4 px-2 text-center">
                                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                  getPercentageColor(provider[league.key as keyof typeof provider] as number)
                                }`}>
                                  {getPercentageIcon(provider[league.key as keyof typeof provider] as number)}
                                </div>
                              </td>
                            ))}
                            <td className="py-4 px-2 text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="font-medium">{provider.rating}</span>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <Button 
                                size="sm" 
                                className={index === 0 ? "bg-green-600 hover:bg-green-700" : ""}
                                variant={index === 0 ? "default" : "outline"}
                              >
                                Zum Anbieter
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* League-specific Comparisons */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🇩🇪</span>
                    <span>Bundesliga Streaming</span>
                  </CardTitle>
                  <CardDescription>
                    Wo Sie alle Bundesliga-Spiele sehen können
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🔵</span>
                        <div>
                          <div className="font-medium">Sky Sport</div>
                          <div className="text-sm text-gray-600">Alle Spiele live</div>
                        </div>
                      </div>
                      <Badge className="bg-green-600">100%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🟣</span>
                        <div>
                          <div className="font-medium">WOW</div>
                          <div className="text-sm text-gray-600">Alle Spiele live</div>
                        </div>
                      </div>
                      <Badge className="bg-green-600">100%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🥉</span>
                    <span>Conference League</span>
                  </CardTitle>
                  <CardDescription>
                    Der neue europäische Wettbewerb
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🔺</span>
                        <div>
                          <div className="font-medium">RTL+</div>
                          <div className="text-sm text-gray-600">Alle Spiele exklusiv</div>
                        </div>
                      </div>
                      <Badge className="bg-red-600">100%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendation Boxes */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Beste Gesamtlösung</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔵 + 🟡</div>
                    <div className="font-bold text-lg mb-1">Sky + DAZN</div>
                    <div className="text-sm text-gray-600 mb-3">
                      95% aller Top-Liga Spiele
                    </div>
                    <div className="text-lg font-bold text-green-600">€74.98/Monat</div>
                    <Button className="w-full mt-3 bg-green-600 hover:bg-green-700">
                      Kombination ansehen
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Nur Bundesliga</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🟣</div>
                    <div className="font-bold text-lg mb-1">WOW</div>
                    <div className="text-sm text-gray-600 mb-3">
                      100% Bundesliga + Champions League
                    </div>
                    <div className="text-lg font-bold text-blue-600">€24.99/Monat</div>
                    <Button variant="outline" className="w-full mt-3 border-blue-600 text-blue-600">
                      Jetzt abonnieren
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800">Budget-Option</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔶</div>
                    <div className="font-bold text-lg mb-1">Amazon Prime</div>
                    <div className="text-sm text-gray-600 mb-3">
                      Champions League Highlights + Prime
                    </div>
                    <div className="text-lg font-bold text-orange-600">€8.99/Monat</div>
                    <Button variant="outline" className="w-full mt-3 border-orange-600 text-orange-600">
                      Jetzt testen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
