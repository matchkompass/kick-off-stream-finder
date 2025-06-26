
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProviderPage } from "@/components/ProviderPage";
import { Footer } from "@/components/Footer";

const StreamingProviderPage = () => {
  const { provider } = useParams<{ provider: string }>();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProviderPage providerName={provider || ""} onBack={() => window.history.back()} />
      <Footer />
    </div>
  );
};

export default StreamingProviderPage;
