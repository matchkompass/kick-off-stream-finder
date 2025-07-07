import { useState, useCallback } from 'react';
import { StreamingOptimizer } from '@/lib/StreamingOptimizer';
import { supabase } from '@/integrations/supabase/client';

export function useStreamingOptimizer() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimize = useCallback(async (
    clubIds: number[], 
    ownedProviders: number[] = [],
    targetCoverages: number[] = [100, 90, 66]
  ) => {
    if (clubIds.length === 0) {
      setError('Bitte wählen Sie mindestens einen Verein aus');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const optimizer = new StreamingOptimizer(supabase);
      const optimizationResults = await optimizer.optimizeForClubs({
        clubIds,
        ownedProviders,
        targetCoverage: Math.min(...targetCoverages)
      });

      setResults(optimizationResults);
    } catch (err) {
      console.error('Optimization error:', err);
      setError('Fehler bei der Optimierung. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    optimize,
    results,
    loading,
    error,
    clearResults
  };
}