
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Target, Trophy, CheckCircle, Star, Users } from "lucide-react";

interface HomePageProps {
  onStartWizard: () => void;
}

export const HomePage = ({ onStartWizard }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Zap className="h-4 w-4 mr-2" />
              Kostenlos & Unverbindlich
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Finden Sie Ihr perfektes
              <span className="text-green-600 block">Streaming-Paket</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Entdecken Sie in nur 5 Minuten die optimale Kombination von Streaming-Diensten 
              für Ihre Lieblings-Vereine und -Ligen.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
              onClick={onStartWizard}
            >
              <Target className="mr-2 h-5 w-5" />
              Jetzt kostenlos starten
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Trophy className="mr-2 h-5 w-5" />
              Anbieter vergleichen
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Streaming-Anbieter</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Vereine abgedeckt</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Kostenlos</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              So einfach funktioniert's
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              In nur wenigen Schritten zu Ihrer individuellen Streaming-Empfehlung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Vereine wählen",
                description: "Wählen Sie Ihre Lieblings-Vereine aus unserer umfangreichen Datenbank",
                icon: <Users className="h-8 w-8" />
              },
              {
                step: "2", 
                title: "Ligen anpassen",
                description: "Passen Sie die Wettbewerbe an, die Sie verfolgen möchten",
                icon: <Trophy className="h-8 w-8" />
              },
              {
                step: "3",
                title: "Features auswählen",
                description: "Definieren Sie gewünschte Features wie 4K, Konferenz oder Downloads",
                icon: <Target className="h-8 w-8" />
              },
              {
                step: "4",
                title: "Empfehlung erhalten",
                description: "Erhalten Sie personalisierte Empfehlungen mit optimaler Abdeckung",
                icon: <CheckCircle className="h-8 w-8" />
              }
            ].map((item, index) => (
              <Card key={index} className="relative">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    {item.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum MatchKompass?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir helfen Ihnen dabei, den Überblick im Streaming-Dschungel zu behalten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personalisierte Empfehlungen",
                description: "Maßgeschneiderte Vorschläge basierend auf Ihren Lieblings-Vereinen und -Ligen",
                icon: <Target className="h-6 w-6 text-green-600" />
              },
              {
                title: "Kostenoptimierung",
                description: "Finden Sie die günstigste Kombination für maximale Spielabdeckung",
                icon: <Star className="h-6 w-6 text-green-600" />
              },
              {
                title: "Aktuelle Daten",
                description: "Immer up-to-date mit den neuesten Übertragungsrechten und Preisen",
                icon: <Zap className="h-6 w-6 text-green-600" />
              },
              {
                title: "Transparent & Unabhängig",
                description: "Ehrliche Vergleiche ohne versteckte Kosten oder Verpflichtungen",
                icon: <CheckCircle className="h-6 w-6 text-green-600" />
              },
              {
                title: "Einfache Bedienung",
                description: "Intuitive Benutzeroberfläche für schnelle und einfache Navigation",
                icon: <Users className="h-6 w-6 text-green-600" />
              },
              {
                title: "Umfassende Abdeckung",
                description: "Alle wichtigen Ligen und Streaming-Anbieter in einer Plattform",
                icon: <Trophy className="h-6 w-6 text-green-600" />
              }
            ].map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    {benefit.icon}
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit für Ihre perfekte Streaming-Lösung?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Starten Sie jetzt den kostenlosen Wizard und finden Sie in wenigen Minuten 
            Ihre optimale Streaming-Kombination.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-gray-100"
            onClick={onStartWizard}
          >
            <Zap className="mr-2 h-5 w-5" />
            Kostenlos starten
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};
