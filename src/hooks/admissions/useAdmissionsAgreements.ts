
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdmissionsAgreement } from "@/types/admissions";
import { useAgreementTemplates } from "./useAgreementTemplates";
import { useCreateAgreement, useUpdateAgreementStatus } from "./useAgreementMutations";

export const useAdmissionsAgreements = (residentId: string) => {
  const agreementsQuery = useQuery({
    queryKey: ['admissions-agreements', residentId],
    queryFn: async (): Promise<AdmissionsAgreement[]> => {
      const { data, error } = await supabase
        .from('admissions_agreements')
        .select('*')
        .eq('resident_id', residentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as AdmissionsAgreement[];
    },
  });

  const templatesQuery = useAgreementTemplates();
  const createAgreementMutation = useCreateAgreement(residentId);
  const updateStatusMutation = useUpdateAgreementStatus(residentId);

  return {
    agreements: agreementsQuery.data || [],
    templates: templatesQuery.data || [],
    isLoading: agreementsQuery.isLoading,
    createAgreement: createAgreementMutation.mutate,
    updateAgreementStatus: updateStatusMutation.mutate,
    isCreating: createAgreementMutation.isPending,
  };
};
