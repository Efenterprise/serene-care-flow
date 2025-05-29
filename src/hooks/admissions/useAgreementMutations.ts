
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useCreateAgreement = (residentId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
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
};

export const useUpdateAgreementStatus = (residentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
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
};
