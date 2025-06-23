
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, TrendingUp, Gift, Percent, ArrowRight } from "lucide-react";

const currentDeals = [
  {
    provider: "Sky Sport",
    logo: "🔵",
    title: "Neukunden-Aktion",
    description: "Erstes Jahr für nur €19.99/Monat statt €29.99",
    originalPrice: 29.99,
    dealPrice: 19.99,
    savings: 120,
    validUntil: "31.12.2024",
    highlight: true,
    features: ["Bundesliga komplett", "Champions League", "Premier League"],
    cashback: false
  },
  {
    provider: "DAZN",
    logo: "🟡", 
    title: "Black Friday Special",
    description: "50% Rabatt auf das Jahresabo + 1 Monat gratis",
    originalPrice: 44.99,
    dealPrice: 22.49,
    savings: 270,
    validUntil: "30.11.2024",
    highlight: true,
    features: ["La Liga", "Serie A", "Champions League Highlights"],
    cashback: true,
    cashbackAmount: 25
  },
  {
    provider: "Amazon Prime Video",
    logo: "🔶",
    title: "Prime Sport Paket",
    description: "Champions League + Prime Mitgliedschaft",
    originalPrice: 12.99,
    dealPrice: 8.99,
    savings: 48,
    validUntil: "15.12.2024",
    highlight: false,
    features: ["Champions League Highlights", "Prime Video", "Prime Versand"],
    cashback: false
  },
  {
    provider: "MagentaTV",
    logo: "🔴",
    title: "Telekom Kunden Special",
    description: "3 Monate kostenlos bei Neuabschluss",
    originalPrice: 19.99,
    dealPrice: 0,
    savings: 60,
    validUntil: "31.01.2025",
    highlight: false,
    features: ["Bundesliga ausgewählte Spiele", "3. Liga komplett"],
    cashback: false,
    condition: "Nur für Telekom Mobilfunk-Kunden"
  }
];

const comboDeals = [
  {
    title: "Ultimate Football Package",
    providers: ["Sky Sport", "DAZN"],
    description: "Perfekte Kombination für 95% aller Top-Liga Spiele",
    originalPrice: 74.98,
    dealPrice: 59.99,
    monthlySavings: 14.99,
    yearlySavings: 179.88,
    coverage: 95,
    popular: true
  },
  {
    title: "Budget Champions",
    providers: ["Amazon Prime", "MagentaTV"],
    description: "Günstige Lösung für Gelegenheits-Fans",
    originalPrice: 32.98,
    dealPrice: 24.99,
    monthlySavings: 7.99,
    yearlySavings: 95.88,
    coverage: 45,
    popular: false
  }
];

const limitedOffers = [
  {
    title: "Early Bird Champions League",
    description: "Jetzt buchen für die Rückrunde",
    discount: "30%",
    timeLeft: "3 Tage",
    urgent: true
  },
  {
    title: "Weihnachts-Special",
    description: "Geschenk-Abos mit Gratis-Merchandising",
    discount: "25%", 
    timeLeft: "2 Wochen",
    urgent: false
  }
];

export const DealsSection = () => {
  const formatTimeLeft = (validUntil: string) => {
    const date = new Date(validUntil);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return `${diffDays} Tage`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} Wochen`;
    return `${Math.ceil(diffDays / 30)} Monate`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Aktuelle Deals & Angebote
          </h1>
          <p className="text-xl text-gray-600">
            Sparen Sie bis zu €270 pro Jahr mit unseren exklusiven Streaming-Deals
          </p>
        </div>

        {/* Limited Time Offers Banner */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <Gift className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-bold">Begrenzte Angebote</h3>
                    <p className="text-orange-100">Nur noch wenige Tage verfügbar!</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  {limitedOffers.map((offer, index) => (
                    <div key={index} className="text-center bg-white/20 rounded-lg p-3">
                      <div className="text-2xl font-bold">{offer.discount}</div>
                      <div className="text-sm">{offer.timeLeft}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Deals Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {currentDeals.map((deal, index) => (
            <Card key={index} className={`relative ${deal.highlight ? 'ring-2 ring-green-500 shadow-lg' : ''}`}>
              {deal.highlight && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-green-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Top Deal
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{deal.logo}</span>
                    <div>
                      <CardTitle className="text-lg">{deal.provider}</CardTitle>
                      <CardDescription>{deal.title}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-red-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {formatTimeLeft(deal.validUntil)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{deal.description}</p>
                
                {deal.condition && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Bedingung:</strong> {deal.condition}
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      €{deal.dealPrice === 0 ? 'Kostenlos' : deal.dealPrice}
                    </span>
                    {deal.dealPrice > 0 && <span className="text-sm text-gray-500">/Monat</span>}
                    {deal.originalPrice > deal.dealPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        €{deal.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      €{deal.savings} Ersparnis/Jahr
                    </Badge>
                    {deal.cashback && (
                      <Badge className="bg-orange-500">
                        €{deal.cashbackAmount} Cashback
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Inklusive:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {deal.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full ${deal.highlight ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  variant={deal.highlight ? 'default' : 'outline'}
                >
                  Deal sichern
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Combo Deals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Percent className="h-5 w-5 text-orange-600" />
              <span>Kombinations-Angebote</span>
            </CardTitle>
            <CardDescription>
              Sparen Sie noch mehr mit cleveren Anbieter-Kombinationen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {comboDeals.map((combo, index) => (
                <div key={index} className={`p-6 border rounded-lg ${combo.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                  {combo.popular && (
                    <Badge className="mb-3 bg-blue-600">
                      <Star className="h-3 w-3 mr-1" />
                      Meist gewählt
                    </Badge>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{combo.title}</h3>
                  <p className="text-gray-600 mb-4">{combo.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    {combo.providers.map((provider, idx) => (
                      <span key={idx} className="text-2xl">
                        {provider === 'Sky Sport' ? '🔵' : 
                         provider === 'DAZN' ? '🟡' :
                         provider === 'Amazon Prime' ? '🔶' : '🔴'}
                      </span>
                    ))}
                    <span className="text-sm text-gray-600">
                      {combo.providers.join(' + ')}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Regulärer Preis:</span>
                      <span className="line-through text-gray-400">€{combo.originalPrice}/Monat</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Kombi-Preis:</span>
                      <span className="text-2xl font-bold text-green-600">€{combo.dealPrice}/Monat</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Spielabdeckung:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {combo.coverage}%
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Jährliche Ersparnis</div>
                      <div className="text-xl font-bold text-orange-600">€{combo.yearlySavings}</div>
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${combo.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={combo.popular ? 'default' : 'outline'}
                  >
                    Kombination wählen
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Newsletter Signup for Deals */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
          <CardContent className="py-8 text-center">
            <Gift className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Verpassen Sie keine Deals mehr!</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Erhalten Sie exklusive Angebote und Frühzugang zu neuen Deals direkt in Ihr Postfach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0"
              />
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3">
                Deal-Alert aktivieren
              </Button>
            </div>
            <p className="text-sm text-green-100 mt-3">
              Kostenlos • Jederzeit abbestellbar • Kein Spam
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
