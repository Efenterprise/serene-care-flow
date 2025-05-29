
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
