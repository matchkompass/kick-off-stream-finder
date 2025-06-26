
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { TeamPage } from "@/components/TeamPage";
import { Footer } from "@/components/Footer";

const ClubPage = () => {
  const { club } = useParams<{ club: string }>();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TeamPage teamName={club || ""} onBack={() => window.history.back()} />
      <Footer />
    </div>
  );
};

export default ClubPage;
