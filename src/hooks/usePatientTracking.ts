
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type PatientTracking = Database["public"]["Tables"]["patient_tracking"]["Row"];
type PatientTrackingInsert = Database["public"]["Tables"]["patient_tracking"]["Insert"];

export const usePatientTracking = () => {
  return useQuery({
    queryKey: ["patient-tracking"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patient_tracking")
        .select(`
          *,
          referral:referrals(patient_name, diagnosis),
          facility:referral_platforms(name)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreatePatientTracking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tracking: PatientTrackingInsert) => {
      const { data, error } = await supabase
        .from("patient_tracking")
        .insert(tracking)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-tracking"] });
    },
  });
};

export const useUpdatePatientStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, location }: { id: string; status: string; location?: string }) => {
      const { data, error } = await supabase
        .from("patient_tracking")
        .update({ 
          current_status: status, 
          location,
          updated_at: new Date().toISOString() 
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-tracking"] });
    },
  });
};
