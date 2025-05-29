
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AgreementTemplate } from "@/types/admissions";

export const useAgreementTemplates = () => {
  return useQuery({
    queryKey: ['agreement-templates'],
    queryFn: async (): Promise<AgreementTemplate[]> => {
      const { data, error } = await supabase
        .from('agreement_templates')
        .select('*')
        .eq('is_active', true)
        .order('template_name');

      if (error) throw error;
      return (data || []) as AgreementTemplate[];
    },
  });
};
