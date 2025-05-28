
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Referral = Database["public"]["Tables"]["referrals"]["Row"];
type ReferralInsert = Database["public"]["Tables"]["referrals"]["Insert"];

export const useReferrals = () => {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referrals")
        .select(`
          *,
          platform:referral_platforms(name, platform_type)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateReferral = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (referral: ReferralInsert) => {
      const { data, error } = await supabase
        .from("referrals")
        .insert(referral)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
    },
  });
};

export const useUpdateReferralStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Database["public"]["Enums"]["referral_status"] }) => {
      const { data, error } = await supabase
        .from("referrals")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
    },
  });
};
