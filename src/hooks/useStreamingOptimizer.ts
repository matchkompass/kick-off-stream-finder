import { useState, useCallback } from 'react';
import { StreamingOptimizer } from '@/lib/StreamingOptimizer';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export function useStreamingOptimizer() {
  const supabase = useSupabaseClient();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimize = useCallback(async (clubIds: number[], targetCoverages: number[] = [100, 90, 66]) => {
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
        targetCoverage: Math.min(...targetCoverages)
      });

      setResults(optimizationResults);
    } catch (err) {
      console.error('Optimization error:', err);
      setError('Fehler bei der Optimierung. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

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