
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

// Role Configurations
export const useRoleConfigurations = () => {
  return useQuery({
    queryKey: ['roleConfigurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('role_configurations')
        .select('*')
        .order('role_name');
      
      if (error) throw error;
      return data;
    },
  });
};
