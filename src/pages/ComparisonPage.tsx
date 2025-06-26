
import { Header } from "@/components/Header";
import { ProviderComparison } from "@/components/ProviderComparison";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const ComparisonPage = () => {
  const faqData = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProviderComparison />
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

export default ComparisonPage;
