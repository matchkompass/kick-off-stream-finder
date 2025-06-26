import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface Club {
  club_id: number;
  name: string;
  country: string;
  logo_url?: string;
  league: string;
  popularity_score: number;
}

const LEAGUE_ORDER = [
  'Bundesliga',
  'Champions League',
  '2. Bundesliga',
  'Premier League',
  'La Liga',
  'Serie A',
];

export function useClubSelection() {
  const supabase = useSupabaseClient();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClubs, setSelectedClubs] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [leagueFilter, setLeagueFilter] = useState<string>('');

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('club_id, name, country, logo_url, league, popularity_score')
        .order('popularity_score', { ascending: false });

      if (error) throw error;
      setClubs(data || []);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique leagues for dropdown
  const availableLeagues = Array.from(new Set(clubs.map(club => club.league))).filter(Boolean);

  // Sort clubs by league order and popularity
  const sortedClubs = [...clubs].sort((a, b) => {
    const leagueA = LEAGUE_ORDER.indexOf(a.league);
    const leagueB = LEAGUE_ORDER.indexOf(b.league);
    if (leagueA !== leagueB) {
      if (leagueA === -1) return 1;
      if (leagueB === -1) return -1;
      return leagueA - leagueB;
    }
    // If same league, sort by popularity
    return (b.popularity_score || 0) - (a.popularity_score || 0);
  });

  // Filter by search and league
  const filteredClubs = sortedClubs.filter(club =>
    (searchTerm === '' || club.name.toLowerCase().includes(searchTerm.toLowerCase()) || club.country.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (leagueFilter === '' || club.league === leagueFilter)
  );

  const toggleClub = (clubId: number) => {
    setSelectedClubs(prev =>
      prev.includes(clubId)
        ? prev.filter(id => id !== clubId)
        : [...prev, clubId]
    );
  };

  const clearSelection = () => {
    setSelectedClubs([]);
  };

  const getSelectedClubNames = () => {
    return clubs
      .filter(club => selectedClubs.includes(club.club_id))
      .map(club => club.name);
  };

  return {
    clubs: filteredClubs,
    selectedClubs,
    loading,
    searchTerm,
    setSearchTerm,
    toggleClub,
    clearSelection,
    getSelectedClubNames,
    leagueFilter,
    setLeagueFilter,
    availableLeagues
  };
}
