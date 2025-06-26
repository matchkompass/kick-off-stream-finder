
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStreamingProviders = () => {
  return useQuery({
    queryKey: ['streaming-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('streaming')
        .select('*')
        .order('streamer_id');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useStreamingProvider = (slug: string) => {
  return useQuery({
    queryKey: ['streaming-provider', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('streaming')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};
