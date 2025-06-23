
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Search, Calculator, TrendingUp, Play, Shield, Clock } from "lucide-react";
import { StreamingWizard } from "@/components/StreamingWizard";
import { ProviderComparison } from "@/components/ProviderComparison";
import { NewsSection } from "@/components/NewsSection";
import { DealsSection } from "@/components/DealsSection";
import { SavingsCalculator } from "@/components/SavingsCalculator";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StreamFußball</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveSection("wizard")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Klickstrecke
              </button>
              <button 
                onClick={() => setActiveSection("vergleiche")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Vergleiche
              </button>
              <button 
                onClick={() => setActiveSection("news")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                News & Spiele
              </button>
              <button 
                onClick={() => setActiveSection("deals")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Deals
              </button>
              <button 
                onClick={() => setActiveSection("rechner")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Sparpotential
              </button>
            </div>

            <Button 
              onClick={() => setActiveSection("wizard")}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Jetzt optimieren
            </Button>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      {activeSection === "home" && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Nie wieder ein <span className="text-green-600">Fußballspiel</span> verpassen
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Finden Sie in 3 einfachen Schritten die perfekte Streaming-Kombination für Ihre Lieblingsvereine. 
                Transparent, unabhängig und immer aktuell.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  onClick={() => setActiveSection("wizard")}
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Personalisierte Empfehlung starten
                </Button>
                <Button 
                  onClick={() => setActiveSection("vergleiche")}
                  variant="outline" 
                  size="lg" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  Anbieter vergleichen
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>100% unabhängig</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span>Täglich aktualisiert</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Über 50.000 zufriedene Nutzer</span>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                So funktioniert StreamFußball
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">1. Vereine auswählen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      Wählen Sie Ihre Lieblingsvereine aus über 500 europäischen Teams. 
                      Von Bayern München bis Real Madrid.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">2. Präferenzen angeben</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      Budget festlegen, gewünschte Ligen auswählen und Ihre Prioritäten definieren. 
                      Alles vollständig personalisiert.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">3. Optimale Lösung erhalten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      Erhalten Sie die perfekte Anbieter-Kombination mit transparenter Abdeckung 
                      und Kostenaufschlüsselung.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-gray-600">Europäische Vereine</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-gray-600">Streaming-Anbieter</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
                  <div className="text-gray-600">Durchschnittliche Abdeckung</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">€127</div>
                  <div className="text-gray-600">Durchschnittliche Ersparnis/Jahr</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Bereit für die perfekte Streaming-Lösung?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Starten Sie jetzt die kostenlose Analyse und verpassen Sie nie wieder ein wichtiges Spiel.
              </p>
              <Button 
                onClick={() => setActiveSection("wizard")}
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Jetzt kostenlos starten
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        </>
      )}

      {activeSection === "wizard" && <StreamingWizard />}
      {activeSection === "vergleiche" && <ProviderComparison />}
      {activeSection === "news" && <NewsSection />}
      {activeSection === "deals" && <DealsSection />}
      {activeSection === "rechner" && <SavingsCalculator />}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Play className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">StreamFußball</span>
              </div>
              <p className="text-gray-400">
                Die unabhängige Plattform für optimale Fußball-Streaming-Lösungen.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Funktionen</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Personalisierte Empfehlungen</li>
                <li>Anbieter-Vergleiche</li>
                <li>Sparpotential-Rechner</li>
                <li>Aktuelle Deals</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ligen</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Bundesliga</li>
                <li>Champions League</li>
                <li>Premier League</li>
                <li>La Liga</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>FAQ</li>
                <li>Kontakt</li>
                <li>Datenschutz</li>
                <li>Impressum</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StreamFußball. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
