
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type EmrConnection = Database["public"]["Tables"]["emr_connections"]["Row"];
type EmrConnectionInsert = Database["public"]["Tables"]["emr_connections"]["Insert"];

export const useEmrConnections = () => {
  return useQuery({
    queryKey: ["emr-connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emr_connections")
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

export const useCreateEmrConnection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (connection: EmrConnectionInsert) => {
      const { data, error } = await supabase
        .from("emr_connections")
        .insert(connection)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emr-connections"] });
    },
  });
};

export const useTestEmrConnection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (connectionId: string) => {
      // Mock connection test - in reality this would make actual API calls
      const { data, error } = await supabase
        .from("emr_connections")
        .update({ 
          last_successful_connection: new Date().toISOString(),
          connection_errors: null,
          updated_at: new Date().toISOString()
        })
        .eq("id", connectionId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emr-connections"] });
    },
  });
};
