
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, TrendingDown, Euro } from "lucide-react";

const streamingServices = [
  { id: "sky", name: "Sky Sport", price: 29.99, logo: "🔵" },
  { id: "dazn", name: "DAZN", price: 44.99, logo: "🟡" },
  { id: "amazon", name: "Amazon Prime Video", price: 8.99, logo: "🔶" },
  { id: "magenta", name: "MagentaTV", price: 19.99, logo: "🔴" },
  { id: "rtl", name: "RTL+", price: 6.99, logo: "🔺" },
  { id: "wow", name: "WOW", price: 24.99, logo: "🟣" },
  { id: "netflix", name: "Netflix", price: 12.99, logo: "🔴" },
  { id: "disney", name: "Disney+", price: 8.99, logo: "🔵" }
];

interface SavingsCalculatorProps {
  embedded?: boolean;
}

export const SavingsCalculator = ({ embedded = false }: SavingsCalculatorProps) => {
  const [currentServices, setCurrentServices] = useState<string[]>([]);
  const [desiredCoverage, setDesiredCoverage] = useState(80);
  const [showResults, setShowResults] = useState(false);

  const toggleService = (serviceId: string) => {
    setCurrentServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateSavings = () => {
    const currentCost = currentServices.reduce((total, serviceId) => {
      const service = streamingServices.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);

    // Simplified optimization logic
    let optimizedServices: string[] = [];
    let optimizedCost = 0;

    if (desiredCoverage >= 90) {
      optimizedServices = ["sky", "dazn"];
      optimizedCost = 74.98;
    } else if (desiredCoverage >= 70) {
      optimizedServices = ["sky"];
      optimizedCost = 29.99;
    } else {
      optimizedServices = ["amazon"];
      optimizedCost = 8.99;
    }

    return {
      currentCost,
      optimizedCost,
      savings: Math.max(0, currentCost - optimizedCost),
      optimizedServices,
      coverage: Math.min(desiredCoverage + 10, 98)
    };
  };

  const results = showResults ? calculateSavings() : null;

  return (
    <div className={embedded ? "" : "min-h-screen bg-gray-50 py-8"}>
      <div className={embedded ? "" : "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"}>
        {!embedded && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              <Calculator className="inline-block mr-3 h-8 w-8 text-green-600" />
              Sparpotential berechnen
            </h1>
            <p className="text-xl text-gray-600">
              Prüfen Sie, wie viel Sie bei Ihren aktuellen Streaming-Abos sparen können
            </p>
          </div>
        )}

        {!showResults ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ihre aktuellen Streaming-Abos</CardTitle>
                <CardDescription>
                  Wählen Sie alle Dienste aus, die Sie derzeit abonniert haben
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {streamingServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        currentServices.includes(service.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{service.logo}</span>
                          <div>
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">€{service.price}/Monat</div>
                          </div>
                        </div>
                        {currentServices.includes(service.id) && (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {currentServices.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Aktuelle monatliche Kosten:</span>
                      <span className="text-xl font-bold text-gray-900">
                        €{currentServices.reduce((total, serviceId) => {
                          const service = streamingServices.find(s => s.id === serviceId);
                          return total + (service?.price || 0);
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gewünschte Fußball-Abdeckung</CardTitle>
                <CardDescription>
                  Wie viel Prozent Ihrer Lieblingsspiele möchten Sie sehen?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={desiredCoverage}
                      onChange={(e) => setDesiredCoverage(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>50%</span>
                      <span className="font-medium text-lg text-gray-900">{desiredCoverage}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {[
                      { range: "50-70%", desc: "Hauptspiele", color: "bg-yellow-100 text-yellow-800" },
                      { range: "70-90%", desc: "Meiste Spiele", color: "bg-blue-100 text-blue-800" },
                      { range: "90-100%", desc: "Alle Spiele", color: "bg-green-100 text-green-800" }
                    ].map((option, index) => (
                      <div key={index} className={`p-3 rounded-lg text-center ${option.color}`}>
                        <div className="font-medium">{option.range}</div>
                        <div className="text-sm">{option.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => setShowResults(true)}
                disabled={currentServices.length === 0}
                className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Sparpotential berechnen
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Ihr Sparpotential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-1">
                      €{results!.currentCost.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Aktuelle Kosten/Monat</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      €{results!.optimizedCost.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Optimierte Kosten/Monat</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      €{results!.savings.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Ersparnis/Monat</div>
                  </div>
                </div>

                {results!.savings > 0 && (
                  <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-900 mb-2">
                        Jährliche Ersparnis: €{(results!.savings * 12).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Bei {results!.coverage}% Fußball-Abdeckung
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empfohlene Optimierung</CardTitle>
                <CardDescription>
                  Diese Anbieter-Kombination ist optimal für Ihre Bedürfnisse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results!.optimizedServices.map((serviceId) => {
                    const service = streamingServices.find(s => s.id === serviceId);
                    if (!service) return null;

                    return (
                      <div key={serviceId} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{service.logo}</span>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500">€{service.price}/Monat</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Zum Anbieter
                        </Button>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 text-blue-800">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">
                      {results!.coverage}% Abdeckung Ihrer Lieblings-Fußballspiele
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowResults(false)}
              >
                Neue Berechnung
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Angebote vergleichen
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
