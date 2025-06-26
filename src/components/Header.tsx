
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import { useClubs } from "@/hooks/useClubs";
import { useLeagues } from "@/hooks/useLeagues";
import { useStreamingProviders } from "@/hooks/useStreamingProviders";
import { transformClubData, transformLeagueData, transformStreamingData } from "@/utils/dataTransformers";

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const { data: clubsData } = useClubs();
  const { data: leaguesData } = useLeagues();
  const { data: streamingData } = useStreamingProviders();

  const clubs = clubsData?.map(transformClubData) || [];
  const leagues = leaguesData?.map(transformLeagueData) || [];
  const providers = streamingData?.map(transformStreamingData) || [];

  const searchResults = searchTerm.length >= 2 ? [
    ...clubs.filter(club => 
      club.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(club => ({ 
      type: "club" as const, 
      name: club.name, 
      logo: club.logo,
      slug: club.slug || club.name.toLowerCase().replace(/\s+/g, '')
    })),
    ...leagues.filter(league => 
      league.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(league => ({ 
      type: "league" as const, 
      name: league.name, 
      logo: league.icon,
      slug: league.key
    })),
    ...providers.filter(provider => 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(provider => ({ 
      type: "provider" as const, 
      name: provider.name, 
      logo: provider.logo,
      slug: provider.slug || provider.name.toLowerCase().replace(/\s+/g, '')
    }))
  ].slice(0, 8) : [];

  const handleItemSelect = (type: "club" | "league" | "provider", slug: string) => {
    if (type === "club") {
      navigate(`/club/${slug}`);
    } else if (type === "league") {
      navigate(`/league/${slug}`);
    } else {
      navigate(`/streaming/${slug}`);
    }
    setSearchTerm("");
    setIsSearchFocused(false);
  };

  const navItems = [
    { key: "/wizard", label: "Wizard" },
    { key: "/comparison", label: "Vergleich" },
    { key: "/news-deals", label: "News & Deals" }
  ];

  const getActiveTab = () => {
    if (location.pathname === "/") return "home";
    return location.pathname;
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/")}
              className="text-xl font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              MatchKompass
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  getActiveTab() === item.key
                    ? "bg-green-100 text-green-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="relative flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Verein, Liga oder Anbieter suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="pl-10 w-full"
              />
            </div>

            {/* Search Results */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemSelect(result.type, result.slug)}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-lg">{result.logo}</span>
                    <div>
                      <div className="font-medium text-gray-900">{result.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{result.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => {
                    navigate(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    getActiveTab() === item.key
                      ? "bg-green-100 text-green-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
