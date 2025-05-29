
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AdmissionsAgreement {
  id: string;
  resident_id: string;
  agreement_type: string;
  template_version: string;
  agreement_content: any;
  status: 'draft' | 'pending_signatures' | 'partially_signed' | 'fully_signed' | 'expired';
  created_by?: string;
  created_at: string;
  updated_at: string;
  expires_at?: string;
  notes?: string;
}

export interface AgreementSignature {
  id: string;
  agreement_id: string;
  signer_type: 'resident' | 'responsible_party' | 'witness' | 'facility_representative';
  signer_name: string;
  signer_contact_id?: string;
  signature_data: string;
  ip_address?: string;
  user_agent?: string;
  signed_at: string;
  signature_method: 'electronic' | 'wet_signature' | 'verbal_consent';
}

export interface AgreementTemplate {
  id: string;
  template_name: string;
  template_type: string;
  version: string;
  content: any;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const useAdmissionsAgreements = (residentId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const templatesQuery = useQuery({
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

  const createAgreement = useMutation({
    mutationFn: async ({ templateId, notes }: { templateId: string; notes?: string }) => {
      const { data: template } = await supabase
        .from('agreement_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (!template) throw new Error('Template not found');

      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('admissions_agreements')
        .insert({
          resident_id: residentId,
          agreement_type: template.template_type,
          template_version: template.version,
          agreement_content: template.content,
          status: 'draft',
          created_by: user?.id,
          notes,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Agreement Created",
        description: "Admissions agreement has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['admissions-agreements', residentId] });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create agreement. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateAgreementStatus = useMutation({
    mutationFn: async ({ agreementId, status }: { agreementId: string; status: string }) => {
      const { error } = await supabase
        .from('admissions_agreements')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', agreementId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admissions-agreements', residentId] });
    },
  });

  return {
    agreements: agreementsQuery.data || [],
    templates: templatesQuery.data || [],
    isLoading: agreementsQuery.isLoading,
    createAgreement: createAgreement.mutate,
    updateAgreementStatus: updateAgreementStatus.mutate,
    isCreating: createAgreement.isPending,
  };
};

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
