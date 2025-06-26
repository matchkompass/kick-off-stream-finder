
import { StreamingWizard } from "@/components/StreamingWizard";
import { ProviderComparison } from "@/components/ProviderComparison";
import { FAQ } from "@/components/FAQ";
import { FooterLinks } from "@/components/FooterLinks";
import { TeamPage } from "@/components/TeamPage";
import { ProviderPage } from "@/components/ProviderPage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, TrendingUp, Star, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useStreamingProviders } from "@/hooks/useStreamingProviders";
import { transformStreamingData } from "@/utils/dataTransformers";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "team" | "provider">("home");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const { data: streamingData } = useStreamingProviders();

  const providers = streamingData?.map(transformStreamingData) || [];

  const handleTeamClick = (team: string) => {
    setSelectedItem(team);
    setCurrentPage("team");
  };

  const handleProviderClick = (provider: string) => {
    setSelectedItem(provider);
    setCurrentPage("provider");
  };

  const handleBack = () => {
    setCurrentPage("home");
    setSelectedItem("");
  };

  if (currentPage === "team") {
    return <TeamPage teamName={selectedItem} onBack={handleBack} />;
  }

  if (currentPage === "provider") {
    return <ProviderPage providerName={selectedItem} onBack={handleBack} />;
  }

  const popularCompetitions = [
    { 
      name: "Bundesliga", 
      icon: "🇩🇪", 
      description: "Deutsche Meisterschaft",
      providers: providers.filter(p => (p.competitions.bundesliga || 0) > 0)
        .map(p => ({ name: p.name, coverage: p.competitions.bundesliga, logo: p.logo }))
        .sort((a, b) => (b.coverage || 0) - (a.coverage || 0))
    },
    { 
      name: "Champions League", 
      icon: "🏆", 
      description: "Europas Königsklasse",
      providers: providers.filter(p => (p.competitions["champions-league"] || 0) > 0)
        .map(p => ({ name: p.name, coverage: p.competitions["champions-league"], logo: p.logo }))
        .sort((a, b) => (b.coverage || 0) - (a.coverage || 0))
    },
    { 
      name: "Premier League", 
      icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 
      description: "Englische Liga",
      providers: providers.filter(p => (p.competitions["premier-league"] || 0) > 0)
        .map(p => ({ name: p.name, coverage: p.competitions["premier-league"], logo: p.logo }))
        .sort((a, b) => (b.coverage || 0) - (a.coverage || 0))
    },
    { 
      name: "La Liga", 
      icon: "🇪🇸", 
      description: "Spanische Liga",
      providers: providers.filter(p => (p.competitions["la-liga"] || 0) > 0)
        .map(p => ({ name: p.name, coverage: p.competitions["la-liga"], logo: p.logo }))
        .sort((a, b) => (b.coverage || 0) - (a.coverage || 0))
    }
  ];

  const faqData = [
    {
      question: "Wie finde ich den besten Streaming-Anbieter?",
      answer: "Nutzen Sie unseren personalisierten Wizard, um basierend auf Ihren Lieblingsvereinen und Präferenzen die optimale Streaming-Lösung zu finden."
    },
    {
      question: "Kann ich mehrere Anbieter kombinieren?",
      answer: "Ja, oft ist eine Kombination aus zwei Anbietern die beste Lösung für maximale Spielabdeckung. Unser Wizard zeigt Ihnen die besten Kombinationen."
    },
    {
      question: "Sind die Preise aktuell?",
      answer: "Wir aktualisieren die Preise regelmäßig. Die angezeigten Preise sind die aktuellen Monats- bzw. Jahrespreise der Anbieter."
    },
    {
      question: "Was bedeutet die Abdeckung in Prozent?",
      answer: "Die Abdeckung zeigt an, wie viele Spiele einer Liga oder eines Wettbewerbs bei dem jeweiligen Anbieter verfügbar sind."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fußball Streaming leicht gemacht
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Finden Sie den perfekten Streaming-Anbieter für Ihre Lieblingsspiele
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Wizard starten
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Anbieter vergleichen
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Competitions Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beliebte Wettbewerbe
            </h2>
            <p className="text-xl text-gray-600">
              Sehen Sie, wo Ihre Lieblings-Ligen verfügbar sind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {popularCompetitions.map((competition) => (
              <Card key={competition.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{competition.icon}</span>
                    <div>
                      <div className="text-xl">{competition.name}</div>
                      <CardDescription className="text-sm">{competition.description}</CardDescription>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {competition.providers.slice(0, 3).map((provider, index) => (
                      <div key={provider.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{provider.logo}</span>
                          <span className="font-medium text-sm">{provider.name}</span>
                        </div>
                        <Badge 
                          variant={(provider.coverage || 0) >= 100 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {provider.coverage}%
                        </Badge>
                      </div>
                    ))}
                    {competition.providers.length > 3 && (
                      <div className="text-center">
                        <Button variant="outline" size="sm">
                          +{competition.providers.length - 3} weitere anzeigen
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="wizard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="wizard" className="text-lg py-3">
                <Trophy className="h-5 w-5 mr-2" />
                Persönlicher Wizard
              </TabsTrigger>
              <TabsTrigger value="comparison" className="text-lg py-3">
                <TrendingUp className="h-5 w-5 mr-2" />
                Anbieter-Vergleich
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="wizard">
              <StreamingWizard embedded={true} />
            </TabsContent>
            
            <TabsContent value="comparison">
              <ProviderComparison />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ 
            title="Häufig gestellte Fragen"
            questions={faqData}
          />
        </div>
      </section>

      {/* Footer Links */}
      <FooterLinks 
        onTeamClick={handleTeamClick}
        onLeagueClick={(league) => console.log("League clicked:", league)}
        onProviderClick={handleProviderClick}
      />
    </div>
  );
};

export default Index;
