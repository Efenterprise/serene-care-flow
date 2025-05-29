
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Provider Configurations
export const useProviderConfigurations = () => {
  return useQuery({
    queryKey: ['providerConfigurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_configurations')
        .select('*')
        .order('provider_name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateProviderConfiguration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (provider: any) => {
      const { data, error } = await supabase
        .from('provider_configurations')
        .insert(provider)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providerConfigurations'] });
    },
  });
};
