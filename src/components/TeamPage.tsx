
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Trophy, ExternalLink } from "lucide-react";

interface TeamPageProps {
  teamName: string;
  onBack: () => void;
}

export const TeamPage = ({ teamName, onBack }: TeamPageProps) => {
  const teamData = {
    name: teamName,
    logo: "🔴",
    league: "Bundesliga",
    competitions: ["Bundesliga", "Champions League", "DFB-Pokal"],
    nextGames: [
      { date: "2024-01-15", opponent: "Borussia Dortmund", competition: "Bundesliga", time: "18:30" },
      { date: "2024-01-22", opponent: "Real Madrid", competition: "Champions League", time: "21:00" },
      { date: "2024-01-28", opponent: "SC Freiburg", competition: "Bundesliga", time: "15:30" }
    ],
    streamingOptions: [
      { provider: "Sky Sport", coverage: 100, price: 29.99, competitions: ["Bundesliga", "Champions League"] },
      { provider: "DAZN", coverage: 85, price: 44.99, competitions: ["Champions League"] }
    ]
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
          {/* Team Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <span className="text-4xl" style={{ color: '#2563eb' }}>{teamData.logo}</span>
                <div>
                  <CardTitle className="text-2xl md:text-3xl">{teamData.name}</CardTitle>
                  <CardDescription className="text-lg">{teamData.league}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="font-medium mb-2">Aktuelle Wettbewerbe:</h3>
                <div className="flex flex-wrap gap-2">
                  {teamData.competitions.map(comp => (
                    <Badge key={comp} variant="secondary">{comp}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Games */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Nächste Spiele
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamData.nextGames.map((game, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{teamData.name} vs {game.opponent}</div>
                      <div className="text-sm text-gray-600">{game.competition}</div>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <div className="font-medium">{game.date}</div>
                      <div className="text-sm text-gray-600">{game.time}</div>
                    </div>
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
                Streaming-Optionen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamData.streamingOptions.map((option, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{option.provider}</div>
                      <div className="text-sm text-gray-600">
                        {option.competitions.join(", ")}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                      <Badge variant={option.coverage === 100 ? "default" : "secondary"}>
                        {option.coverage}% Abdeckung
                      </Badge>
                      <div className="text-right">
                        <div className="font-bold">€{option.price}</div>
                        <div className="text-xs text-gray-500">pro Monat</div>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Abonnieren
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
