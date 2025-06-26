
// Transform database data to match existing component expectations

export const transformClubData = (club: any) => ({
  id: club.id,
  name: club.name,
  logo: club.logo_url || "🔴", // Fallback to emoji if no logo URL
  league: club.country === "Germany" ? 
    (club.bundesliga ? "Bundesliga" : club.second_bundesliga ? "2. Bundesliga" : "Other") :
    club.country,
  competitions: [
    ...(club.bundesliga ? ["bundesliga"] : []),
    ...(club.second_bundesliga ? ["2-bundesliga"] : []),
    ...(club.champions_league ? ["champions-league"] : []),
    ...(club.europa_league ? ["europa-league"] : []),
    ...(club.conference_league ? ["conference-league"] : []),
    ...(club.premier_league ? ["premier-league"] : []),
    ...(club.la_liga ? ["la-liga"] : []),
    ...(club.dfb_pokal ? ["dfb-pokal"] : []),
    ...(club.fa_cup ? ["fa-cup"] : []),
    ...(club.copa_del_rey ? ["copa-del-rey"] : [])
  ]
});

export const transformLeagueData = (league: any) => ({
  key: league.league_slug || league.league?.toLowerCase().replace(/ /g, '-'),
  name: league.league,
  description: `${league.league} - ${league["country code"]}`,
  country: league["country code"] || "International",
  icon: getLeagueIcon(league.league)
});

export const transformStreamingData = (provider: any) => ({
  name: provider.name || provider.provider_name, // Use 'name' first, fallback to 'provider_name'
  logo: provider.logo_url || "🔵", // Fallback to emoji
  monthlyPrice: parseFloat(provider.monthly_price) || 0,
  yearlyPrice: parseFloat(provider.yearly_price) || 0,
  affiliateLink: provider.affiliate_url || "#",
  features: provider.features || {
    fourK: true,
    multiDevice: true,
    liveReplay: true,
    conference: false,
    catchUp: true,
    noAds: true,
    offline: false
  },
  competitions: {
    "bundesliga": provider.bundesliga || 0,
    "2-bundesliga": provider.second_bundesliga || 0,
    "champions-league": provider.champions_league || 0,
    "europa-league": provider.europa_league || 0,
    "conference-league": provider.conference_league || 0,
    "premier-league": provider.premier_league || 0,
    "la-liga": provider.la_liga || 0,
    "serie-a": provider.serie_a || 0,
    "ligue-1": provider.ligue_1 || 0,
    "dfb-pokal": provider.dfb_pokal || 0,
    "fa-cup": provider.fa_cup || 0,
    "copa-del-rey": provider.copa_del_rey || 0,
    "nationalteam": 50 // Default value
  },
  rating: 4.0, // Default rating
  popular: false
});

const getLeagueIcon = (leagueName: string): string => {
  const icons: { [key: string]: string } = {
    "Bundesliga": "🇩🇪",
    "2. Bundesliga": "🇩🇪", 
    "Champions League": "🏆",
    "Europa League": "🥈",
    "Conference League": "🥉",
    "Premier League": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "La Liga": "🇪🇸",
    "Serie A": "🇮🇹",
    "Ligue 1": "🇫🇷",
    "DFB-Pokal": "🏆",
    "FA Cup": "🏆",
    "Copa del Rey": "🏆"
  };
  return icons[leagueName] || "⚽";
};
