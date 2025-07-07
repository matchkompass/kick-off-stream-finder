
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HomePage onStartWizard={() => {}} />
      <Footer />
    </div>
  );
};

export default Index;
