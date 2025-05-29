
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Payor Configurations
export const usePayorConfigurations = () => {
  return useQuery({
    queryKey: ['payorConfigurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payor_configurations')
        .select('*')
        .order('payor_name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreatePayorConfiguration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payor: any) => {
      const { data, error } = await supabase
        .from('payor_configurations')
        .insert(payor)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payorConfigurations'] });
    },
  });
};
