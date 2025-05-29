
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: string;
  category: string;
  status: string;
  created_at: string;
  requested_by: string;
  assigned_to?: string;
  completed_at?: string;
  user_profiles?: {
    first_name: string;
    last_name: string;
  };
}

export const useMaintenanceRequests = () => {
  return useQuery({
    queryKey: ['maintenance-requests'],
    queryFn: async (): Promise<MaintenanceRequest[]> => {
      console.log('Fetching maintenance requests...');
      
      const { data, error } = await (supabase as any)
        .from('maintenance_requests')
        .select(`
          *,
          user_profiles!maintenance_requests_requested_by_fkey (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching maintenance requests:', error);
        throw error;
      }

      console.log('Fetched maintenance requests:', data);
      return data || [];
    },
  });
};

export const useCreateMaintenanceRequest = () => {
  const queryClient = useQueryClient();
  
  return {
    mutate: async (requestData: Partial<MaintenanceRequest>) => {
      const { error } = await (supabase as any)
        .from('maintenance_requests')
        .insert(requestData);

      if (error) throw error;

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['maintenance-requests'] });
    }
  };
};
