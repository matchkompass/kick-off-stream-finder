
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Calculator, TrendingUp, TrendingDown, ArrowRight, Lightbulb, PiggyBank } from "lucide-react";

const providers = [
  { id: "sky", name: "Sky Sport", price: 29.99, logo: "🔵" },
  { id: "dazn", name: "DAZN", price: 44.99, logo: "🟡" },
  { id: "amazon", name: "Amazon Prime Video", price: 8.99, logo: "🔶" },
  { id: "magenta", name: "MagentaTV Sport", price: 19.99, logo: "🔴" },
  { id: "paramount", name: "Paramount+", price: 7.99, logo: "🔵" },
  { id: "apple", name: "Apple TV+", price: 6.99, logo: "⚫" }
];

const recommendations = [
  {
    scenario: "Bundesliga Fan",
    current: ["sky", "dazn"],
    optimized: ["sky"],
    description: "Sky allein reicht für 100% Bundesliga-Abdeckung",
    savings: 44.99
  },
  {
    scenario: "Champions League Fan", 
    current: ["sky", "dazn", "amazon"],
    optimized: ["sky", "amazon"],
    description: "DAZN durch Amazon ersetzen spart Geld bei gleicher CL-Abdeckung",
    savings: 36.00
  },
  {
    scenario: "Multi-Liga Fan",
    current: ["sky", "dazn", "amazon", "magenta"],
    optimized: ["sky", "dazn"],
    description: "Fokus auf die beiden Hauptanbieter für beste Abdeckung",
    savings: 28.98
  }
];

export const SavingsCalculator = () => {
  const [currentSubscriptions, setCurrentSubscriptions] = useState<string[]>([]);
  const [desiredCoverage, setDesiredCoverage] = useState(80);
  const [flexibilityPreference, setFlexibilityPreference] = useState("monthly");
  const [budgetLimit, setBudgetLimit] = useState(50);

  const toggleSubscription = (providerId: string) => {
    setCurrentSubscriptions(prev => 
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const getCurrentMonthlyTotal = () => {
    return currentSubscriptions.reduce((total, id) => {
      const provider = providers.find(p => p.id === id);
      return total + (provider?.price || 0);
    }, 0);
  };

  const getOptimizedRecommendation = () => {
    const currentTotal = getCurrentMonthlyTotal();
    
    // Simplified optimization logic
    if (desiredCoverage >= 90) {
      return {
        providers: ["sky", "dazn"],
        cost: 74.98,
        coverage: 95,
        description: "Beste Gesamtabdeckung für Top-Ligen"
      };
    } else if (desiredCoverage >= 70) {
      return {
        providers: ["sky"],
        cost: 29.99,
        coverage: 75,
        description: "Fokus auf Bundesliga und Champions League"
      };
    } else {
      return {
        providers: ["amazon"],
        cost: 8.99,
        coverage: 45,
        description: "Budget-Option für gelegentliches Schauen"
      };
    }
  };

  const optimized = getOptimizedRecommendation();
  const currentTotal = getCurrentMonthlyTotal();
  const monthlySavings = Math.max(0, currentTotal - optimized.cost);
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sparpotential-Rechner
          </h1>
          <p className="text-xl text-gray-600">
            Finden Sie heraus, wie viel Sie bei Ihren Streaming-Abos sparen können
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Subscriptions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Ihre aktuellen Abos</span>
                </CardTitle>
                <CardDescription>
                  Wählen Sie alle Streaming-Dienste aus, die Sie derzeit abonniert haben
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {providers.map(provider => (
                    <div
                      key={provider.id}
                      onClick={() => toggleSubscription(provider.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        currentSubscriptions.includes(provider.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{provider.logo}</span>
                          <div>
                            <div className="font-medium">{provider.name}</div>
                            <div className="text-sm text-gray-500">€{provider.price}/Monat</div>
                          </div>
                        </div>
                        <Checkbox
                          checked={currentSubscriptions.includes(provider.id)}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {currentSubscriptions.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Aktuelle Gesamtkosten:</span>
                      <span className="text-2xl font-bold text-red-600">€{getCurrentMonthlyTotal().toFixed(2)}/Monat</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Das sind €{(getCurrentMonthlyTotal() * 12).toFixed(2)} pro Jahr
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Ihre Präferenzen</CardTitle>
                <CardDescription>
                  Definieren Sie Ihre Wünsche für die optimale Streaming-Lösung
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">
                    Gewünschte Spielabdeckung: {desiredCoverage}%
                  </Label>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={desiredCoverage}
                    onChange={(e) => setDesiredCoverage(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>30% (Gelegenheitsfan)</span>
                    <span>100% (Hardcore-Fan)</span>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">
                    Maximales Budget: €{budgetLimit}/Monat
                  </Label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>€10</span>
                    <span>€100</span>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Flexibilität</Label>
                  <div className="space-y-2">
                    {[
                      { value: "monthly", label: "Monatlich kündbar", desc: "Maximale Flexibilität" },
                      { value: "yearly", label: "Jahresabos bevorzugt", desc: "Bessere Preise akzeptieren" }
                    ].map(option => (
                      <div
                        key={option.value}
                        onClick={() => setFlexibilityPreference(option.value)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          flexibilityPreference === option.value
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-gray-500">{option.desc}</div>
                          </div>
                          <Checkbox
                            checked={flexibilityPreference === option.value}
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Savings Overview */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <PiggyBank className="h-5 w-5" />
                  <span>Ihr Sparpotential</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      €{monthlySavings.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">pro Monat</div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold text-green-700">
                      €{yearlySavings.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">pro Jahr</div>
                  </div>

                  {monthlySavings > 0 && (
                    <div className="flex items-center justify-center space-x-1 text-green-600">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {Math.round((monthlySavings / currentTotal) * 100)}% Ersparnis
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Optimized Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-orange-600" />
                  <span>Empfohlene Lösung</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      €{optimized.cost.toFixed(2)}/Monat
                    </div>
                    <div className="text-sm text-gray-600">{optimized.description}</div>
                  </div>

                  <div className="space-y-2">
                    {optimized.providers.map(providerId => {
                      const provider = providers.find(p => p.id === providerId);
                      return (
                        <div key={providerId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{provider?.logo}</span>
                            <span className="text-sm">{provider?.name}</span>
                          </div>
                          <span className="text-sm font-medium">€{provider?.price}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center">
                    <Progress value={optimized.coverage} className="mb-2" />
                    <div className="text-sm text-gray-600">
                      {optimized.coverage}% Spielabdeckung
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Optimierung umsetzen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Beliebte Szenarien</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm text-gray-900 mb-1">
                        {rec.scenario}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {rec.description}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          €{rec.savings}/Monat sparen
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-blue-600 text-xs">
                          Anwenden
                        </Button>
                      </div>
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
