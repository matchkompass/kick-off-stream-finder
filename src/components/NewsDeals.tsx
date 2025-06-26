
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, TrendingUp } from "lucide-react";

export const NewsDeals = () => {
  const deals = [
    {
      id: 1,
      title: "Sky Sport komplett für nur €20/Monat",
      description: "Bundesliga, Champions League und mehr - 3 Monate zum Sonderpreis",
      originalPrice: 30,
      dealPrice: 20,
      savings: 30,
      validUntil: "31.12.2024",
      provider: "Sky",
      logo: "📺"
    },
    {
      id: 2,
      title: "DAZN Jahresabo - 2 Monate gratis",
      description: "Jetzt DAZN Unlimited sichern und die ersten 2 Monate kostenlos streamen",
      originalPrice: 34.99,
      dealPrice: 29.99,
      savings: 14,
      validUntil: "15.01.2025",
      provider: "DAZN",
      logo: "🥊"
    },
    {
      id: 3,
      title: "Amazon Prime Video Sport - Kostenlos testen",
      description: "Champions League und mehr - 30 Tage kostenlos testen",
      originalPrice: 8.99,
      dealPrice: 0,
      savings: 100,
      validUntil: "Immer verfügbar",
      provider: "Amazon Prime",
      logo: "📦"
    }
  ];

  const news = [
    {
      id: 1,
      title: "Neue Bundesliga-Saison: Wo läuft was?",
      summary: "Überblick über die Übertragungsrechte der neuen Saison 2024/25",
      date: "Vor 2 Tagen",
      category: "Bundesliga"
    },
    {
      id: 2,
      title: "Champions League: Neue Playoff-Runde ab 2024",
      summary: "UEFA führt zusätzliche Qualifikationsrunde ein - mehr Spiele für deutsche Teams",
      date: "Vor 1 Woche",
      category: "Champions League"
    },
    {
      id: 3,
      title: "Streaming-Preise 2024: Diese Anbieter werden teurer",
      summary: "Preiserhöhungen bei mehreren Anbietern angekündigt - so sparen Sie trotzdem",
      date: "Vor 2 Wochen",
      category: "Streaming"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Deals Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Aktuelle Deals & Angebote
          </h2>
          <p className="text-gray-600">
            Sparen Sie mit exklusiven Angeboten unserer Partner
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{deal.logo}</span>
                    <div>
                      <CardTitle className="text-lg">{deal.provider}</CardTitle>
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                        -{deal.savings}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{deal.title}</h3>
                  <p className="text-sm text-gray-600">{deal.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">
                        €{deal.dealPrice}
                      </span>
                      {deal.originalPrice > deal.dealPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          €{deal.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">pro Monat</div>
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Gültig bis: {deal.validUntil}
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Angebot sichern
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Aktuelle News
          </h2>
          <p className="text-gray-600">
            Bleiben Sie informiert über die neuesten Entwicklungen
          </p>
        </div>

        <div className="space-y-4">
          {news.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between space-y-3 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {article.summary}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="md:ml-4">
                    Lesen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline">
            Mehr News anzeigen
          </Button>
        </div>
      </section>
    </div>
  );
};
