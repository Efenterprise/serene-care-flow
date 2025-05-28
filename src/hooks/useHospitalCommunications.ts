
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type HospitalCommunication = Database["public"]["Tables"]["hospital_communications"]["Row"];
type HospitalCommunicationInsert = Database["public"]["Tables"]["hospital_communications"]["Insert"];

export const useHospitalCommunications = () => {
  return useQuery({
    queryKey: ["hospital-communications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hospital_communications")
        .select(`
          *,
          patient_tracking(patient_mrn),
          platform:referral_platforms(name)
        `)
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateHospitalCommunication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (communication: HospitalCommunicationInsert) => {
      const { data, error } = await supabase
        .from("hospital_communications")
        .insert(communication)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-communications"] });
    },
  });
};

export const useProcessCommunication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, errorMessage }: { id: string; status: string; errorMessage?: string }) => {
      const { data, error } = await supabase
        .from("hospital_communications")
        .update({ 
          status,
          processed_at: new Date().toISOString(),
          error_message: errorMessage || null
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-communications"] });
    },
  });
};
