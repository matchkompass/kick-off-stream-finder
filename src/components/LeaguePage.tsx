
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, ExternalLink, Users } from "lucide-react";

interface LeaguePageProps {
  leagueName: string;
  onBack: () => void;
}

export const LeaguePage = ({ leagueName, onBack }: LeaguePageProps) => {
  const leagueData = {
    name: leagueName,
    icon: "🇩🇪",
    description: "Deutsche Meisterschaft",
    totalGames: 306,
    teams: ["Bayern München", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen"],
    streamingProviders: [
      { name: "Sky Sport", logo: "🔵", coverage: 100, price: 29.99 },
      { name: "WOW", logo: "🟣", coverage: 100, price: 24.99 }
    ],
    season: "2024/25",
    matchdays: 34
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>

        <div className="space-y-6">
          {/* League Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{leagueData.icon}</span>
                <div>
                  <CardTitle className="text-2xl md:text-3xl">{leagueData.name}</CardTitle>
                  <CardDescription className="text-lg">{leagueData.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{leagueData.totalGames}</div>
                  <div className="text-sm text-gray-600">Spiele pro Saison</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{leagueData.matchdays}</div>
                  <div className="text-sm text-gray-600">Spieltage</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">18</div>
                  <div className="text-sm text-gray-600">Vereine</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{leagueData.season}</div>
                  <div className="text-sm text-gray-600">Aktuelle Saison</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Teams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Vereine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {leagueData.teams.map((team, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🔴</span>
                      <div className="font-medium">{team}</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Details ansehen
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Streaming Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Wo läuft die {leagueData.name}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leagueData.streamingProviders.map((provider, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{provider.logo}</span>
                      <div>
                        <div className="font-medium text-lg">{provider.name}</div>
                        <div className="text-sm text-gray-600">
                          Alle Spiele der {leagueData.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-3 md:mt-0">
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {provider.coverage}% Abdeckung
                      </Badge>
                      <div className="text-right">
                        <div className="text-xl font-bold">€{provider.price}</div>
                        <div className="text-sm text-gray-500">pro Monat</div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Jetzt abonnieren
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
