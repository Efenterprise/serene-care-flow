
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useReferralPlatforms = () => {
  return useQuery({
    queryKey: ["referral-platforms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referral_platforms")
        .select("*")
        .eq("is_active", true)
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });
};
