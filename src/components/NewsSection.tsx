
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Tv, TrendingUp, Calendar } from "lucide-react";

const todaysGames = [
  {
    time: "18:30",
    homeTeam: "Bayern München",
    awayTeam: "Borussia Dortmund",
    competition: "Bundesliga",
    provider: "Sky Sport",
    logo: "🔵"
  },
  {
    time: "20:45",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona", 
    competition: "La Liga",
    provider: "DAZN",
    logo: "🟡"
  },
  {
    time: "21:00",
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    competition: "Premier League",
    provider: "Sky Sport",
    logo: "🔵"
  }
];

const newsItems = [
  {
    title: "Sky erhöht Preise ab März 2024",
    description: "Der Streaming-Dienst Sky Sport wird ab März seine monatlichen Preise um 3€ erhöhen. Bestandskunden können noch bis Ende Februar zum alten Preis verlängern.",
    category: "Preisänderung",
    time: "vor 2 Stunden",
    important: true
  },
  {
    title: "DAZN sichert sich weitere La Liga Rechte",
    description: "DAZN hat die Übertragungsrechte für die spanische La Liga bis 2027 verlängert. Alle Spiele bleiben weiterhin exklusiv auf der Plattform verfügbar.",
    category: "Übertragungsrechte",
    time: "vor 4 Stunden",
    important: false
  },
  {
    title: "Amazon Prime Video zeigt Champions League Finale",
    description: "Das Champions League Finale 2024 wird erstmals auch bei Amazon Prime Video übertragen. Sky behält aber die Exklusivrechte für alle anderen Spiele.",
    category: "Übertragungsrechte", 
    time: "vor 1 Tag",
    important: true
  },
  {
    title: "Neue MagentaTV Sport-Pakete verfügbar",
    description: "Die Telekom erweitert ihr MagentaTV Angebot um neue Sport-Pakete. Kunden können jetzt flexibler zwischen verschiedenen Liga-Paketen wählen.",
    category: "Neue Angebote",
    time: "vor 2 Tagen",
    important: false
  }
];

const upcomingHighlights = [
  {
    date: "Sa, 25.11",
    event: "Bayern vs. Dortmund",
    competition: "Bundesliga",
    provider: "Sky Sport"
  },
  {
    date: "Di, 28.11", 
    event: "Champions League Achtelfinale",
    competition: "Champions League",
    provider: "Sky Sport"
  },
  {
    date: "Sa, 02.12",
    event: "El Clásico",
    competition: "La Liga", 
    provider: "DAZN"
  }
];

export const NewsSection = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            News & Spiele
          </h1>
          <p className="text-xl text-gray-600">
            Aktuelle Nachrichten und Übertragungsinfos aus der Streaming-Welt
          </p>
        </div>

        {/* Today's Games */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Tv className="h-5 w-5 text-blue-600" />
              <span>Heute im TV & Stream</span>
            </CardTitle>
            <CardDescription>
              Alle wichtigen Spiele des heutigen Tages und wo Sie sie sehen können
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysGames.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="text-center min-w-16">
                      <div className="font-bold text-lg text-gray-900">{game.time}</div>
                      <div className="text-xs text-gray-500">Uhr</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {game.homeTeam} vs {game.awayTeam}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {game.competition}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{game.provider}</div>
                      <div className="text-xs text-gray-500">Live & kostenlos</div>
                    </div>
                    <span className="text-2xl">{game.logo}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Vollständiger Spielplan
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* News Feed */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Aktuelle Nachrichten</span>
                </CardTitle>
                <CardDescription>
                  Die neuesten Entwicklungen bei Streaming-Anbietern und Übertragungsrechten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {newsItems.map((item, index) => (
                    <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={item.important ? "default" : "secondary"}
                            className={item.important ? "bg-orange-500" : ""}
                          >
                            {item.category}
                          </Badge>
                          {item.important && (
                            <Badge variant="destructive" className="text-xs">
                              Wichtig
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.time}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <Button variant="ghost" size="sm" className="mt-2 text-blue-600 hover:text-blue-700">
                        Mehr erfahren →
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kommende Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center min-w-16">
                        <div className="text-xs font-medium text-blue-600">{highlight.date}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">{highlight.event}</div>
                        <div className="text-xs text-gray-500">{highlight.competition}</div>
                        <div className="text-xs text-blue-600">{highlight.provider}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schnellzugriff</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Tv className="mr-2 h-4 w-4" />
                  TV-Programm heute
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Preisvergleich starten
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Spielplan abonnieren
                </Button>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Newsletter</CardTitle>
                <CardDescription className="text-blue-700">
                  Verpassen Sie keine wichtigen Streaming-News mehr
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Ihre E-Mail-Adresse"
                    className="w-full px-3 py-2 border border-blue-200 rounded-md text-sm"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Kostenlos abonnieren
                  </Button>
                  <p className="text-xs text-blue-600 text-center">
                    Wöchentlich, jederzeit abbestellbar
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
