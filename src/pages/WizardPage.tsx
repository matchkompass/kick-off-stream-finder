
import { Header } from "@/components/Header";
import { StreamingWizard } from "@/components/StreamingWizard";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const WizardPage = () => {
  const faqData = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StreamingWizard />
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

export default WizardPage;
