
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Clinical Configurations
export const useClinicalConfigurations = () => {
  return useQuery({
    queryKey: ['clinicalConfigurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clinical_configurations')
        .select('*')
        .order('configuration_type, display_order');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateClinicalConfiguration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (config: any) => {
      const { data, error } = await supabase
        .from('clinical_configurations')
        .insert(config)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinicalConfigurations'] });
    },
  });
};
