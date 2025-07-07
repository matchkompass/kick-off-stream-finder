-- Create streaming_leagues table if it doesn't exist with proper structure
CREATE TABLE IF NOT EXISTS public.streaming_leagues (
  id SERIAL PRIMARY KEY,
  streamer_id INTEGER REFERENCES public.streaming(streamer_id),
  league_id INTEGER REFERENCES public.leagues(league_id),
  coverage_percentage INTEGER NOT NULL DEFAULT 100,
  CHECK (coverage_percentage >= 0 AND coverage_percentage <= 100)
);

-- Create club_leagues table if it doesn't exist with proper structure  
CREATE TABLE IF NOT EXISTS public.club_leagues (
  id SERIAL PRIMARY KEY,
  club_id INTEGER REFERENCES public.clubs(club_id),
  league_id INTEGER REFERENCES public.leagues(league_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_streaming_leagues_streamer ON streaming_leagues(streamer_id);
CREATE INDEX IF NOT EXISTS idx_streaming_leagues_league ON streaming_leagues(league_id);
CREATE INDEX IF NOT EXISTS idx_club_leagues_club ON club_leagues(club_id);
CREATE INDEX IF NOT EXISTS idx_club_leagues_league ON club_leagues(league_id);

-- Ensure proper data structure in existing tables
ALTER TABLE public.clubs 
ADD COLUMN IF NOT EXISTS popularity_score INTEGER DEFAULT 0;

-- Add country_code to leagues if not exists
ALTER TABLE public.leagues 
ADD COLUMN IF NOT EXISTS country_code TEXT DEFAULT 'INT';

-- Update country codes for existing leagues
UPDATE public.leagues SET country_code = 'DE' WHERE league IN ('Bundesliga', '2. Bundesliga', 'DFB-Pokal');
UPDATE public.leagues SET country_code = 'GB' WHERE league = 'Premier League';  
UPDATE public.leagues SET country_code = 'ES' WHERE league IN ('La Liga', 'Copa del Rey');
UPDATE public.leagues SET country_code = 'IT' WHERE league IN ('Serie A', 'Coppa Italia');
UPDATE public.leagues SET country_code = 'FR' WHERE league IN ('Ligue 1', 'Coupe de France');
UPDATE public.leagues SET country_code = 'INT' WHERE league IN ('Champions League', 'Europa League', 'Conference League');

-- Insert club-league relationships from existing boolean columns
INSERT INTO club_leagues (club_id, league_id) 
SELECT c.club_id, l.league_id 
FROM clubs c, leagues l 
WHERE 
  (c.bundesliga = true AND l.league = 'Bundesliga') OR
  (c.second_bundesliga = true AND l.league = '2. Bundesliga') OR
  (c.champions_league = true AND l.league = 'Champions League') OR
  (c.europa_league = true AND l.league = 'Europa League') OR
  (c.conference_league = true AND l.league = 'Conference League') OR
  (c.dfb_pokal = true AND l.league = 'DFB-Pokal') OR
  (c.premier_league = true AND l.league = 'Premier League') OR
  (c.la_liga = true AND l.league = 'La Liga') OR
  (c.serie_a = true AND l.league = 'Serie A') OR
  (c.ligue_1 = true AND l.league = 'Ligue 1') OR
  (c.copa_del_rey = true AND l.league = 'Copa del Rey') OR
  (c.fa_cup = true AND l.league = 'FA Cup') OR
  (c.coppa_italia = true AND l.league = 'Coppa Italia') OR
  (c.coupe_de_france = true AND l.league = 'Coupe de France')
ON CONFLICT DO NOTHING;

-- Insert streaming-league relationships with proper coverage values (capped at 100)
INSERT INTO streaming_leagues (streamer_id, league_id, coverage_percentage)
SELECT s.streamer_id, l.league_id,
  LEAST(100, CASE 
    WHEN l.league = 'Bundesliga' THEN COALESCE(s.bundesliga, 0)
    WHEN l.league = '2. Bundesliga' THEN COALESCE(s.second_bundesliga, 0)
    WHEN l.league = 'Champions League' THEN COALESCE(s.champions_league, 0)
    WHEN l.league = 'Europa League' THEN COALESCE(s.europa_league, 0)
    WHEN l.league = 'Conference League' THEN COALESCE(s.conference_league, 0)
    WHEN l.league = 'DFB-Pokal' THEN COALESCE(s.dfb_pokal, 0)
    WHEN l.league = 'Premier League' THEN COALESCE(s.premier_league, 0)
    WHEN l.league = 'La Liga' THEN COALESCE(s.la_liga, 0)
    WHEN l.league = 'Serie A' THEN COALESCE(s.serie_a, 0)
    WHEN l.league = 'Ligue 1' THEN COALESCE(s.ligue_1, 0)
    WHEN l.league = 'Copa del Rey' THEN COALESCE(s.copa_del_rey, 0)
    WHEN l.league = 'FA Cup' THEN COALESCE(s.fa_cup, 0)
    WHEN l.league = 'Coppa Italia' THEN COALESCE(s.coppa_italia, 0)
    WHEN l.league = 'Coupe de France' THEN COALESCE(s.coupe_de_france, 0)
    ELSE 0
  END)
FROM streaming s, leagues l
WHERE 
  (l.league = 'Bundesliga' AND s.bundesliga > 0) OR
  (l.league = '2. Bundesliga' AND s.second_bundesliga > 0) OR
  (l.league = 'Champions League' AND s.champions_league > 0) OR
  (l.league = 'Europa League' AND s.europa_league > 0) OR
  (l.league = 'Conference League' AND s.conference_league > 0) OR
  (l.league = 'DFB-Pokal' AND s.dfb_pokal > 0) OR
  (l.league = 'Premier League' AND s.premier_league > 0) OR
  (l.league = 'La Liga' AND s.la_liga > 0) OR
  (l.league = 'Serie A' AND s.serie_a > 0) OR
  (l.league = 'Ligue 1' AND s.ligue_1 > 0) OR
  (l.league = 'Copa del Rey' AND s.copa_del_rey > 0) OR
  (l.league = 'FA Cup' AND s.fa_cup > 0) OR
  (l.league = 'Coppa Italia' AND s.coppa_italia > 0) OR
  (l.league = 'Coupe de France' AND s.coupe_de_france > 0)
ON CONFLICT DO NOTHING;