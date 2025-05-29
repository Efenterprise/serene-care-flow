
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Facility Settings
export const useFacilitySettings = () => {
  return useQuery({
    queryKey: ['facilitySettings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('facility_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateFacilitySettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settings: any) => {
      const { data, error } = await supabase
        .from('facility_settings')
        .upsert(settings)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilitySettings'] });
    },
  });
};
