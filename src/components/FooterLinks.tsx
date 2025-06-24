
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FooterLinksProps {
  onTeamClick: (team: string) => void;
  onLeagueClick: (league: string) => void;
  onProviderClick: (provider: string) => void;
}

export const FooterLinks = ({ onTeamClick, onLeagueClick, onProviderClick }: FooterLinksProps) => {
  const popularTeams = [
    "Bayern München", "Borussia Dortmund", "Real Madrid", "FC Barcelona",
    "Manchester City", "Liverpool FC", "Juventus Turin", "AC Mailand"
  ];

  const popularLeagues = [
    "Bundesliga", "Champions League", "Premier League", "La Liga",
    "Serie A", "Europa League", "Conference League", "DFB-Pokal"
  ];

  const streamingProviders = [
    "Sky Sport", "DAZN", "WOW", "Amazon Prime", "RTL+", "MagentaTV"
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Beliebte Vereine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {popularTeams.map((team) => (
                  <Button
                    key={team}
                    variant="ghost"
                    size="sm"
                    onClick={() => onTeamClick(team)}
                    className="justify-start text-left h-auto py-2"
                  >
                    {team} Streaming-Guide
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ligen & Wettbewerbe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {popularLeagues.map((league) => (
                  <Button
                    key={league}
                    variant="ghost"
                    size="sm"
                    onClick={() => onLeagueClick(league)}
                    className="justify-start text-left h-auto py-2"
                  >
                    {league} schauen
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Streaming-Anbieter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {streamingProviders.map((provider) => (
                  <Button
                    key={provider}
                    variant="ghost"
                    size="sm"
                    onClick={() => onProviderClick(provider)}
                    className="justify-start text-left h-auto py-2"
                  >
                    {provider} Übersicht
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
