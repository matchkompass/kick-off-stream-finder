
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { LeaguePage as LeaguePageComponent } from "@/components/LeaguePage";
import { Footer } from "@/components/Footer";

const LeaguePage = () => {
  const { league } = useParams<{ league: string }>();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <LeaguePageComponent leagueName={league || ""} onBack={() => window.history.back()} />
      <Footer />
    </div>
  );
};

export default LeaguePage;
