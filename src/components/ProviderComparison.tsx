import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, Star, TrendingUp, Filter, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useStreamingProviders } from "@/hooks/useStreamingProviders";
import { transformStreamingData } from "@/utils/dataTransformers";

const leagues = [
  { key: "bundesliga", name: "Bundesliga", icon: "🇩🇪" },
  { key: "2-bundesliga", name: "2. Bundesliga", icon: "🇩🇪" },
  { key: "champions-league", name: "Champions League", icon: "🏆" },
  { key: "europa-league", name: "Europa League", icon: "🥈" },
  { key: "conference-league", name: "Conference League", icon: "🥉" },
  { key: "premier-league", name: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { key: "la-liga", name: "La Liga", icon: "🇪🇸" },
  { key: "serie-a", name: "Serie A", icon: "🇮🇹" },
  { key: "ligue-1", name: "Ligue 1", icon: "🇫🇷" },
  { key: "dfb-pokal", name: "DFB-Pokal", icon: "🏆" },
  { key: "nationalteam", name: "Nationalmannschaft", icon: "🇩🇪" }
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
  const { data: streamingData, isLoading } = useStreamingProviders();
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [expandedProviders, setExpandedProviders] = useState<string[]>([]);
  const [priceType, setPriceType] = useState<"monthly" | "yearly">("monthly");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Streaming-Anbieter...</p>
        </div>
      </div>
    );
  }

  const providers = streamingData?.map(transformStreamingData) || [];

  const toggleExpandProvider = (providerName: string) => {
    setExpandedProviders(prev => 
      prev.includes(providerName) 
        ? prev.filter(name => name !== providerName)
        : [...prev, providerName]
    );
  };

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

  const getCurrentPrice = (provider: any) => {
    return priceType === "monthly" ? provider.monthlyPrice : (provider.yearlyPrice / 12);
  };

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
                {/* Price Type Filter */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Preistyp</Label>
                  <Select value={priceType} onValueChange={(value: "monthly" | "yearly") => setPriceType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monatlich</SelectItem>
                      <SelectItem value="yearly">Jährlich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Competition Filter */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Wettbewerbe</Label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {leagues.map(league => (
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
                  }}
                  className="w-full"
                >
                  Filter zurücksetzen
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {providers.map((provider) => {
              // Filter based on selected features
              if (selectedFeatures.length > 0) {
                const hasAllFeatures = selectedFeatures.every(feature => 
                  provider.features[feature as keyof typeof provider.features]
                );
                if (!hasAllFeatures) return null;
              }

              const isExpanded = expandedProviders.includes(provider.name);
              const displayLeagues = selectedLeagues.length > 0 
                ? leagues.filter(league => selectedLeagues.includes(league.key))
                : leagues;

              const currentPrice = getCurrentPrice(provider);

              return (
                <Card key={provider.name} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{provider.logo}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-xl">{provider.name}</CardTitle>
                            {provider.popular && (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                <Star className="h-3 w-3 mr-1" />
                                Beliebt
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="text-lg font-bold text-green-600">
                              €{currentPrice.toFixed(2)}/{priceType === "monthly" ? "Monat" : "Monat*"}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{provider.rating}</span>
                            </div>
                          </div>
                          {priceType === "yearly" && (
                            <div className="text-xs text-gray-500">*Bei Jahresabo</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => window.open(provider.affiliateLink, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Zum Anbieter
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpandProvider(provider.name)}
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Quick overview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(provider.features)
                        .filter(([_, value]) => value)
                        .slice(0, 4)
                        .map(([key]) => (
                          <Badge key={key} variant="secondary" className="text-xs">
                            {featureLabels[key as keyof typeof featureLabels]}
                          </Badge>
                        ))}
                    </div>

                    {/* League coverage overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                      {displayLeagues.slice(0, 8).map(league => (
                        <div key={league.key} className="flex items-center space-x-2">
                          <span className="text-sm">{league.icon}</span>
                          <span className="text-xs text-gray-600 flex-1">{league.name}</span>
                          <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                            getPercentageColor(provider.competitions[league.key as keyof typeof provider.competitions] as number)
                          }`}>
                            {getPercentageIcon(provider.competitions[league.key as keyof typeof provider.competitions] as number)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="border-t pt-4 space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Alle Features:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(provider.features).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between text-sm">
                                <span>{featureLabels[key as keyof typeof featureLabels]}</span>
                                {value ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Vollständige Liga-Abdeckung:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {leagues.map(league => (
                              <div key={league.key} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <span>{league.icon}</span>
                                  <span>{league.name}</span>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${
                                  getPercentageColor(provider.competitions[league.key as keyof typeof provider.competitions] as number)
                                }`}>
                                  {provider.competitions[league.key as keyof typeof provider.competitions]}%
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold">€{provider.monthlyPrice}</div>
                              <div className="text-xs text-gray-500">Monatlich</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-green-600">€{(provider.yearlyPrice / 12).toFixed(2)}</div>
                              <div className="text-xs text-gray-500">Mit Jahresabo</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
