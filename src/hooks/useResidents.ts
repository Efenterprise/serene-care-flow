
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Resident {
  id: string;
  mrn: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  admission_date: string;
  discharge_date?: string;
  status: 'current' | 'discharged' | 'pending_admission' | 'temporary_leave';
  room_number?: string;
  floor?: string;
  unit?: string;
  payor_primary?: string;
  payor_secondary?: string;
  insurance_details?: any;
  diagnosis_primary?: string;
  diagnosis_secondary?: string[];
  physician_attending?: string;
  physician_primary_care?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  allergies?: string[];
  medications?: any;
  care_level?: 'skilled' | 'assisted' | 'memory_care' | 'respite';
  mobility_status?: string;
  diet_restrictions?: string[];
  special_needs?: string[];
  notes?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export const useResidents = (status?: string) => {
  return useQuery({
    queryKey: ['residents', status],
    queryFn: async () => {
      let query = supabase
        .from('residents')
        .select('*')
        .order('last_name', { ascending: true });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching residents:', error);
        throw error;
      }

      return data as Resident[];
    },
  });
};

export const useResidentStats = () => {
  return useQuery({
    queryKey: ['resident-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('residents')
        .select('status');

      if (error) {
        console.error('Error fetching resident stats:', error);
        throw error;
      }

      const stats = data.reduce((acc, resident) => {
        acc[resident.status] = (acc[resident.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        current: stats.current || 0,
        discharged: stats.discharged || 0,
        pending_admission: stats.pending_admission || 0,
        temporary_leave: stats.temporary_leave || 0,
        total: data.length
      };
    },
  });
};
