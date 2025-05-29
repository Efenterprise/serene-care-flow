
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Facility Units
export const useFacilityUnits = () => {
  return useQuery({
    queryKey: ['facilityUnits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('facility_units')
        .select('*')
        .order('unit_name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateFacilityUnit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (unit: any) => {
      const { data, error } = await supabase
        .from('facility_units')
        .insert(unit)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilityUnits'] });
    },
  });
};

export const useUpdateFacilityUnit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...unit }: any) => {
      const { data, error } = await supabase
        .from('facility_units')
        .update(unit)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilityUnits'] });
    },
  });
};
