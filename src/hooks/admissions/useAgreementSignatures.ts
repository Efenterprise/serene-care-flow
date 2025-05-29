
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AgreementSignature } from "@/types/admissions";

export const useAgreementSignatures = (agreementId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const signaturesQuery = useQuery({
    queryKey: ['agreement-signatures', agreementId],
    queryFn: async (): Promise<AgreementSignature[]> => {
      if (!agreementId) return [];
      
      const { data, error } = await supabase
        .from('agreement_signatures')
        .select('*')
        .eq('agreement_id', agreementId)
        .order('signed_at', { ascending: false });

      if (error) throw error;
      return (data || []) as AgreementSignature[];
    },
    enabled: !!agreementId,
  });

  const addSignature = useMutation({
    mutationFn: async (signature: Omit<AgreementSignature, 'id' | 'signed_at'>) => {
      const { data, error } = await supabase
        .from('agreement_signatures')
        .insert({
          ...signature,
          ip_address: null, // Will be populated by the database if needed
          user_agent: navigator.userAgent,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Signature Added",
        description: "Signature has been recorded successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['agreement-signatures', agreementId] });
    },
    onError: (error: any) => {
      toast({
        title: "Signature Failed",
        description: error.message || "Failed to record signature. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    signatures: signaturesQuery.data || [],
    isLoading: signaturesQuery.isLoading,
    addSignature: addSignature.mutate,
    isAdding: addSignature.isPending,
  };
};
