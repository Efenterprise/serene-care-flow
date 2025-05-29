
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MedicalProfessional {
  id: string;
  resident_id: string;
  name: string;
  profession: string;
  relation?: string;
  office_phone?: string;
  mobile_phone?: string;
  email?: string;
  npi_number?: string;
  license_number?: string;
  address?: any;
  notes?: string;
  is_primary: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useMedicalProfessionals = (residentId: string) => {
  return useQuery({
    queryKey: ['medicalProfessionals', residentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resident_medical_professionals')
        .select('*')
        .eq('resident_id', residentId)
        .eq('is_active', true)
        .order('is_primary', { ascending: false })
        .order('name');
      
      if (error) throw error;
      return data as MedicalProfessional[];
    },
  });
};

export const useCreateMedicalProfessional = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (professional: Omit<MedicalProfessional, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('resident_medical_professionals')
        .insert(professional)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['medicalProfessionals', data.resident_id] });
    },
  });
};

export const useUpdateMedicalProfessional = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MedicalProfessional> }) => {
      const { data, error } = await supabase
        .from('resident_medical_professionals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['medicalProfessionals', data.resident_id] });
    },
  });
};

export const useDeleteMedicalProfessional = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('resident_medical_professionals')
        .update({ is_active: false })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['medicalProfessionals', data.resident_id] });
    },
  });
};
