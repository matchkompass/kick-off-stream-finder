
import { Header } from "@/components/Header";
import { NewsDeals } from "@/components/NewsDeals";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const NewsDealsPage = () => {
  const faqData = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewsDeals />
      </main>

      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ title="Häufig gestellte Fragen" questions={faqData} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsDealsPage;
