
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ClinicalConfiguration {
  id: string;
  configuration_type: string;
  configuration_key: string;
  configuration_value: string;
  description?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Clinical Configurations
export const useClinicalConfigurations = (configurationType?: string) => {
  return useQuery({
    queryKey: ['clinicalConfigurations', configurationType],
    queryFn: async () => {
      let query = supabase
        .from('clinical_configurations')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (configurationType) {
        query = query.eq('configuration_type', configurationType);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as ClinicalConfiguration[];
    },
  });
};

export const useCreateClinicalConfiguration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (config: Omit<ClinicalConfiguration, 'id' | 'created_at' | 'updated_at'>) => {
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

export const useUpdateClinicalConfiguration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ClinicalConfiguration> }) => {
      const { data, error } = await supabase
        .from('clinical_configurations')
        .update(updates)
        .eq('id', id)
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

// Helper hooks for specific configuration types
export const useCarelevels = () => {
  return useClinicalConfigurations('care_levels');
};

export const useDiagnosisCategories = () => {
  return useClinicalConfigurations('diagnosis_categories');
};

export const useMobilityLevels = () => {
  return useClinicalConfigurations('mobility_levels');
};
