import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Search, Calculator, TrendingUp, Play, Shield, Clock, Users, Trophy, Target, Check, X } from "lucide-react";
import { StreamingWizard } from "@/components/StreamingWizard";
import { ProviderComparison } from "@/components/ProviderComparison";
import { NewsSection } from "@/components/NewsSection";
import { DealsSection } from "@/components/DealsSection";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { TeamLandingPage } from "@/components/TeamLandingPage";
import { TeamPage } from "@/components/TeamPage";
import { LeaguePage } from "@/components/LeaguePage";
import { ProviderPage } from "@/components/ProviderPage";
import { FAQ } from "@/components/FAQ";
import { FooterLinks } from "@/components/FooterLinks";

const popularCompetitions = [
  {
    name: "Bundesliga",
    icon: "🇩🇪",
    description: "Deutsche Meisterschaft",
    totalGames: 306,
    providers: [
      { name: "Sky Sport", logo: "🔵", coverage: 100, price: 29.99 },
      { name: "WOW", logo: "🟣", coverage: 100, price: 24.99 }
    ]
  },
  {
    name: "Champions League",
    icon: "🏆",
    description: "Europas Königsklasse",
    totalGames: 189,
    providers: [
      { name: "Sky Sport", logo: "🔵", coverage: 100, price: 29.99 },
      { name: "WOW", logo: "🟣", coverage: 100, price: 24.99 },
      { name: "DAZN", logo: "🟡", coverage: 85, price: 44.99 },
      { name: "Amazon Prime", logo: "🔶", coverage: 15, price: 8.99 }
    ]
  },
  {
    name: "Europa League",
    icon: "🥈",
    description: "Europäischer Zweitklassiger Wettbewerb",
    totalGames: 141,
    providers: [
      { name: "DAZN", logo: "🟡", coverage: 100, price: 44.99 },
      { name: "RTL+", logo: "🔺", coverage: 20, price: 6.99 }
    ]
  },
  {
    name: "Conference League",
    icon: "🥉",
    description: "UEFA Conference League",
    totalGames: 141,
    providers: [
      { name: "RTL+", logo: "🔺", coverage: 100, price: 6.99 },
      { name: "DAZN", logo: "🟡", coverage: 100, price: 44.99 }
    ]
  },
  {
    name: "Premier League",
    icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    description: "Englische Eliteklasse",
    totalGames: 380,
    providers: [
      { name: "Sky Sport", logo: "🔵", coverage: 100, price: 29.99 },
      { name: "WOW", logo: "🟣", coverage: 100, price: 24.99 }
    ]
  },
  {
    name: "La Liga",
    icon: "🇪🇸",
    description: "Spanische Liga",
    totalGames: 380,
    providers: [
      { name: "DAZN", logo: "🟡", coverage: 100, price: 44.99 }
    ]
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const homeFAQ = [
    {
      question: "Wie funktioniert die Streaming-Empfehlung?",
      answer: "Unsere Empfehlung basiert auf Ihren ausgewählten Vereinen und gewünschten Wettbewerben. Wir berechnen die optimale Anbieter-Kombination für maximale Spielabdeckung."
    },
    {
      question: "Sind die Preise aktuell?",
      answer: "Ja, wir aktualisieren alle Preise täglich und prüfen regelmäßig die Verfügbarkeit der Streaming-Angebote."
    },
    {
      question: "Kann ich mehrere Vereine auswählen?",
      answer: "Selbstverständlich! Sie können beliebig viele Vereine auswählen. Unsere Empfehlung berücksichtigt alle Ihre Favoriten."
    },
    {
      question: "Gibt es versteckte Kosten?",
      answer: "Nein, unsere Plattform ist komplett kostenlos. Alle angezeigten Preise sind die offiziellen Anbieterpreise ohne Aufschläge."
    }
  ];

  if (selectedTeam) {
    return <TeamPage teamName={selectedTeam} onBack={() => setSelectedTeam(null)} />;
  }

  if (selectedLeague) {
    return <LeaguePage leagueName={selectedLeague} onBack={() => setSelectedLeague(null)} />;
  }

  if (selectedProvider) {
    return <ProviderPage providerName={selectedProvider} onBack={() => setSelectedProvider(null)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveSection("home")}>
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StreamFußball</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => setActiveSection("vergleiche")} className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Vergleich
              </button>
              <button onClick={() => setActiveSection("news")} className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                News & Spiele
              </button>
              <button onClick={() => setActiveSection("deals")} className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Deals
              </button>
            </div>

            <Button onClick={() => setActiveSection("wizard")} className="bg-green-600 hover:bg-green-700 text-white">
              Jetzt optimieren
            </Button>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      {activeSection === "home" && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Nie wieder ein <span className="text-green-600">Fußballspiel</span> verpassen
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Finden Sie in 3 einfachen Schritten die perfekte Streaming-Kombination für Ihre Lieblingsvereine. 
                Transparent, unabhängig und immer aktuell.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button onClick={() => setActiveSection("wizard")} size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Personalisierte Empfehlung starten
                </Button>
                <Button onClick={() => setActiveSection("vergleiche")} variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
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
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Über 50.000 zufriedene Nutzer</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">800+</div>
                  <div className="text-gray-600">Europäische Vereine</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">18+</div>
                  <div className="text-gray-600">Streaming-Anbieter</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">92%</div>
                  <div className="text-gray-600">Durchschnittliche Abdeckung</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">€147</div>
                  <div className="text-gray-600">Durchschnittliche Ersparnis/Jahr</div>
                </div>
              </div>
            </div>
          </section>

          {/* Beliebte Wettbewerbe */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Beliebte Wettbewerbe & Abdeckung
                </h2>
                <p className="text-xl text-gray-600">
                  Entdecken Sie, wo Ihre Lieblings-Wettbewerbe übertragen werden
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularCompetitions.map((competition) => (
                  <Card key={competition.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{competition.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{competition.name}</CardTitle>
                          <CardDescription className="text-sm">{competition.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {competition.totalGames} Spiele pro Saison
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Verfügbar bei:</h4>
                        {competition.providers.map((provider) => (
                          <div key={provider.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{provider.logo}</span>
                              <span className="text-sm font-medium">{provider.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={provider.coverage === 100 ? "default" : provider.coverage >= 50 ? "secondary" : "outline"} className="text-xs">
                                {provider.coverage}%
                              </Badge>
                              <span className="text-xs text-gray-600">€{provider.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Streaming Wizard Integration */}
          <section className="py-8 md:py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ihre personalisierte Streaming-Empfehlung
                </h2>
                <p className="text-lg md:text-xl text-gray-600">
                  In nur 3 Schritten zur optimalen Lösung für Ihre Lieblingsvereine
                </p>
              </div>
              <StreamingWizard embedded={true} />
            </div>
          </section>

          {/* Popular Teams */}
          <section className="py-8 md:py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
                Beliebte Vereine
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                {[
                  { name: "Bayern München", league: "Bundesliga", logo: "🔴" },
                  { name: "Borussia Dortmund", league: "Bundesliga", logo: "🟡" },
                  { name: "Real Madrid", league: "La Liga", logo: "⚪" },
                  { name: "FC Barcelona", league: "La Liga", logo: "🔵" },
                  { name: "Manchester City", league: "Premier League", logo: "🔵" },
                  { name: "Liverpool FC", league: "Premier League", logo: "🔴" },
                  { name: "Juventus Turin", league: "Serie A", logo: "⚫" },
                  { name: "AC Mailand", league: "Serie A", logo: "🔴" },
                  { name: "Paris Saint-Germain", league: "Ligue 1", logo: "🔴" },
                  { name: "Ajax Amsterdam", league: "Eredivisie", logo: "🔴" },
                  { name: "FC Porto", league: "Primeira Liga", logo: "🔵" },
                  { name: "Celtic Glasgow", league: "Scottish Premiership", logo: "🟢" }
                ].map((team) => (
                  <Card 
                    key={team.name} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedTeam(team.name)}
                  >
                    <CardContent className="p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl mb-2">{team.logo}</div>
                      <div className="font-medium text-xs md:text-sm mb-1">{team.name}</div>
                      <div className="text-xs text-gray-500">{team.league}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Savings Calculator Integration */}
          <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  <Calculator className="inline-block mr-3 h-6 w-6 md:h-8 md:w-8 text-green-600" />
                  Sparpotential berechnen
                </h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Prüfen Sie, wie viel Sie bei Ihren aktuellen Streaming-Abos sparen können
                </p>
              </div>
              <SavingsCalculator embedded={true} />
            </div>
          </section>

          {/* Key Features */}
          <section className="py-16 bg-white">
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
                      Wählen Sie Ihre Lieblingsvereine aus über 800 europäischen Teams. 
                      Von Bayern München bis Real Madrid.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">2. Wettbewerbe definieren</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      Präferenzen für Streaming-Features und gewünschte Wettbewerbe festlegen. 
                      Alles vollständig personalisiert.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-orange-600" />
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

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Bereit für die perfekte Streaming-Lösung?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Starten Sie jetzt die kostenlose Analyse und verpassen Sie nie wieder ein wichtiges Spiel.
              </p>
              <Button onClick={() => setActiveSection("wizard")} size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Jetzt kostenlos starten
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        </>
      )}

      {activeSection === "wizard" && <StreamingWizard embedded={false} />}
      {activeSection === "vergleiche" && <ProviderComparison />}
      {activeSection === "news" && <NewsSection />}
      {activeSection === "deals" && <DealsSection />}
      {activeSection === "rechner" && <SavingsCalculator embedded={false} />}

      {/* FAQ Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ questions={homeFAQ} title="Häufig gestellte Fragen" />
        </div>
      </section>

      {/* Footer Links */}
      <FooterLinks 
        onTeamClick={setSelectedTeam}
        onLeagueClick={setSelectedLeague}
        onProviderClick={setSelectedProvider}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Play className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">StreamFußball</span>
              </div>
              <p className="text-gray-400 text-sm">
                Die unabhängige Plattform für optimale Fußball-Streaming-Lösungen.
              </p>
            </div>
            
            {/* ... keep existing code (footer columns) */}
          </div>
          
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
            <p>&copy; 2024 StreamFußball. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
