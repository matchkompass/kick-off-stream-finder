
import { useState } from "react";
import { Header } from "@/components/Header";
import { StreamingWizard } from "@/components/StreamingWizard";
import { ProviderComparison } from "@/components/ProviderComparison";
import { NewsDeals } from "@/components/NewsDeals";
import { FAQ } from "@/components/FAQ";
import { FooterLinks } from "@/components/FooterLinks";
import { TeamPage } from "@/components/TeamPage";
import { ProviderPage } from "@/components/ProviderPage";
import { LeaguePage } from "@/components/LeaguePage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "team" | "provider" | "league">("home");
  const [activeTab, setActiveTab] = useState("wizard");
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemSelect = (type: "club" | "league" | "provider", item: string) => {
    setSelectedItem(item);
    if (type === "club") {
      setCurrentPage("team");
    } else if (type === "league") {
      setCurrentPage("league");
    } else {
      setCurrentPage("provider");
    }
  };

  const handleTeamClick = (team: string) => {
    setSelectedItem(team);
    setCurrentPage("team");
  };

  const handleProviderClick = (provider: string) => {
    setSelectedItem(provider);
    setCurrentPage("provider");
  };

  const handleLeagueClick = (league: string) => {
    setSelectedItem(league);
    setCurrentPage("league");
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

  if (currentPage === "league") {
    return <LeaguePage leagueName={selectedItem} onBack={handleBack} />;
  }

  const faqData = {
    wizard: [
      {
        question: "Wie funktioniert der Streaming-Wizard?",
        answer: "Der Wizard führt Sie in 4-5 einfachen Schritten zu Ihrer optimalen Streaming-Lösung. Zuerst wählen Sie Ihre Lieblings-Vereine, dann die Wettbewerbe, gewünschte Features und bereits vorhandene Dienste."
      },
      {
        question: "Werden meine bereits vorhandenen Abos berücksichtigt?",
        answer: "Ja, im vierten Schritt können Sie angeben, welche Streaming-Dienste Sie bereits besitzen. Diese werden dann in der finalen Empfehlung berücksichtigt."
      },
      {
        question: "Wie genau sind die Abdeckungsangaben?",
        answer: "Die Abdeckung basiert auf aktuellen Übertragungsrechten und wird regelmäßig aktualisiert. Sie zeigt den Prozentsatz der verfügbaren Spiele pro Wettbewerb."
      }
    ],
    vergleich: [
      {
        question: "Kann ich monatliche und jährliche Preise vergleichen?",
        answer: "Ja, Sie können zwischen monatlicher und jährlicher Zahlungsweise wechseln, um die für Sie günstigste Option zu finden."
      },
      {
        question: "Sind die Affiliate-Links sicher?",
        answer: "Alle verlinkten Anbieter sind seriöse, etablierte Streaming-Dienste. Wir arbeiten nur mit vertrauenswürdigen Partnern zusammen."
      },
      {
        question: "Wie aktuell sind die Preise?",
        answer: "Preise werden regelmäßig aktualisiert. Bei Abschluss eines Abos sollten Sie die aktuellen Konditionen beim Anbieter prüfen."
      }
    ],
    news: [
      {
        question: "Woher stammen die Deals und Angebote?",
        answer: "Wir sammeln aktuelle Angebote direkt von den Streaming-Anbietern und prüfen diese regelmäßig auf Aktualität und Verfügbarkeit."
      },
      {
        question: "Sind die Angebote exklusiv?",
        answer: "Einige Deals sind exklusiv über unsere Partnerlinks verfügbar, andere sind allgemein verfügbare Aktionen der Anbieter."
      },
      {
        question: "Wie oft werden News und Deals aktualisiert?",
        answer: "News werden täglich aktualisiert, Deals werden mehrmals wöchentlich überprüft und aktualisiert."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onItemSelect={handleItemSelect}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "wizard" && <StreamingWizard />}
        {activeTab === "vergleich" && <ProviderComparison />}
        {activeTab === "news" && <NewsDeals />}
      </main>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ 
            title="Häufig gestellte Fragen"
            questions={faqData[activeTab as keyof typeof faqData] || faqData.wizard}
          />
        </div>
      </section>

      {/* Footer Links */}
      <FooterLinks 
        onTeamClick={handleTeamClick}
        onLeagueClick={handleLeagueClick}
        onProviderClick={handleProviderClick}
      />
    </div>
  );
};

export default Index;
