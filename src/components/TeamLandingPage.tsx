import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Trophy, Tv, Euro, Clock } from "lucide-react";

interface TeamLandingPageProps {
  teamName: string;
  onBack: () => void;
}

const teamData: Record<string, any> = {
  "Bayern München": {
    logo: "🔴",
    league: "Bundesliga",
    competitions: ["Bundesliga", "Champions League", "DFB-Pokal", "FIFA Club WM"],
    nextMatches: [
      { date: "2024-01-20", opponent: "Borussia Dortmund", competition: "Bundesliga", time: "18:30" },
      { date: "2024-01-24", opponent: "Real Madrid", competition: "Champions League", time: "21:00" },
      { date: "2024-01-28", opponent: "RB Leipzig", competition: "Bundesliga", time: "15:30" }
    ],
    streaming: {
      coverage: 95,
      cost: 29.99,
      providers: ["Sky Sport", "WOW"]
    },
    description: "Der deutsche Rekordmeister FC Bayern München spielt in der Bundesliga und regelmäßig in der Champions League."
  },
  "Borussia Dortmund": {
    logo: "🟡",
    league: "Bundesliga",
    competitions: ["Bundesliga", "Champions League", "DFB-Pokal"],
    nextMatches: [
      { date: "2024-01-20", opponent: "Bayern München", competition: "Bundesliga", time: "18:30" },
      { date: "2024-01-25", opponent: "PSG", competition: "Champions League", time: "21:00" },
      { date: "2024-01-29", opponent: "Bayer Leverkusen", competition: "Bundesliga", time: "15:30" }
    ],
    streaming: {
      coverage: 95,
      cost: 29.99,
      providers: ["Sky Sport", "WOW"]
    },
    description: "Borussia Dortmund ist einer der erfolgreichsten deutschen Fußballvereine und spielt regelmäßig international."
  },
  "Real Madrid": {
    logo: "⚪",
    league: "La Liga",
    competitions: ["La Liga", "Champions League", "Copa del Rey", "FIFA Club WM"],
    nextMatches: [
      { date: "2024-01-21", opponent: "FC Barcelona", competition: "La Liga", time: "21:00" },
      { date: "2024-01-24", opponent: "Bayern München", competition: "Champions League", time: "21:00" },
      { date: "2024-01-28", opponent: "Atletico Madrid", competition: "La Liga", time: "16:15" }
    ],
    streaming: {
      coverage: 88,
      cost: 44.99,
      providers: ["DAZN"]
    },
    description: "Real Madrid ist der erfolgreichste Verein in der Champions League Geschichte und spielt in der spanischen La Liga."
  }
};

export const TeamLandingPage = ({ teamName, onBack }: TeamLandingPageProps) => {
  const team = teamData[teamName] || {
    logo: "⚽",
    league: "Unbekannt",
    competitions: [],
    nextMatches: [],
    streaming: { coverage: 0, cost: 0, providers: [] },
    description: `Informationen zu ${teamName} werden geladen...`
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Button>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-6xl" style={{ color: '#2563eb' }}>{team.logo}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{teamName}</h1>
              <p className="text-xl text-gray-600">{team.league}</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl">{team.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Competitions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Aktuelle Wettbewerbe
                </CardTitle>
                <CardDescription>
                  In diesen Wettbewerben ist {teamName} aktiv
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {team.competitions.map((competition: string) => (
                    <div key={competition} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🏆</div>
                        <div className="font-medium text-gray-900">{competition}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Nächste Spiele
                </CardTitle>
                <CardDescription>
                  Kommende Termine von {teamName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {team.nextMatches.map((match: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-medium text-gray-900">{new Date(match.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</div>
                          <div className="text-sm text-gray-500">{match.time}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{teamName} vs {match.opponent}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {match.competition}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Tv className="mr-2 h-4 w-4" />
                        Wo läuft's?
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Season Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Saison-Statistiken</CardTitle>
                <CardDescription>
                  Aktuelle Leistung von {teamName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-gray-600">Spiele</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">18</div>
                    <div className="text-sm text-gray-600">Siege</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-gray-600">Unentschieden</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-gray-600">Niederlagen</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streaming Info */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Tv className="h-5 w-5" />
                  Streaming-Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {team.streaming.coverage}%
                    </div>
                    <div className="text-sm text-gray-600">Spielabdeckung</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      €{team.streaming.cost}
                    </div>
                    <div className="text-sm text-gray-600">Ab pro Monat</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Empfohlene Anbieter:</div>
                    <div className="space-y-2">
                      {team.streaming.providers.map((provider: string) => (
                        <Badge key={provider} variant="secondary" className="w-full justify-center">
                          {provider}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Tv className="mr-2 h-4 w-4" />
                    Streaming optimieren
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Schnelle Fakten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Liga:</span>
                    <span className="font-medium">{team.league}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wettbewerbe:</span>
                    <span className="font-medium">{team.competitions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nächstes Spiel:</span>
                    <span className="font-medium">
                      {team.nextMatches[0] ? new Date(team.nextMatches[0].date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }) : '-'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Teams */}
            <Card>
              <CardHeader>
                <CardTitle>Ähnliche Vereine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "Borussia Dortmund", logo: "🟡" },
                    { name: "RB Leipzig", logo: "🔴" },
                    { name: "Bayer Leverkusen", logo: "🔴" }
                  ].map(relatedTeam => (
                    <div key={relatedTeam.name} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <span className="text-xl">{relatedTeam.logo}</span>
                      <span className="text-sm">{relatedTeam.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
