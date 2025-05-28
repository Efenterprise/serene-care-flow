
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Bed = Database["public"]["Tables"]["beds"]["Row"];

export const useBeds = () => {
  return useQuery({
    queryKey: ["beds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("beds")
        .select("*")
        .order("bed_number");
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateBedAvailability = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, is_available }: { id: string; is_available: boolean }) => {
      const { data, error } = await supabase
        .from("beds")
        .update({ is_available, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beds"] });
    },
  });
};
