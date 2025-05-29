
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PandaDocTemplate {
  id: string;
  template_name: string;
  pandadoc_template_id: string;
  agreement_type: string;
  description?: string;
  is_active: boolean;
}

interface CreateDocumentParams {
  agreementId: string;
  templateId: string;
  signers: Array<{
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  }>;
}

export const usePandaDocTemplates = () => {
  return useQuery({
    queryKey: ['pandadoc-templates'],
    queryFn: async (): Promise<PandaDocTemplate[]> => {
      const { data, error } = await supabase
        .from('pandadoc_templates')
        .select('*')
        .eq('is_active', true)
        .order('template_name');

      if (error) throw error;
      return data || [];
    },
  });
};

export const usePandaDocCreateDocument = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateDocumentParams) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await supabase.functions.invoke('pandadoc-create-document', {
        body: params,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Document Created",
        description: "PandaDoc document has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['all-admissions-agreements'] });
      queryClient.invalidateQueries({ queryKey: ['admissions-agreements'] });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create PandaDoc document. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const usePandaDocSendDocument = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ documentId, message }: { documentId: string; message?: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await supabase.functions.invoke('pandadoc-send-document', {
        body: { documentId, message },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Document Sent",
        description: "Document has been sent for signature.",
      });
      queryClient.invalidateQueries({ queryKey: ['all-admissions-agreements'] });
      queryClient.invalidateQueries({ queryKey: ['admissions-agreements'] });
    },
    onError: (error: any) => {
      toast({
        title: "Send Failed",
        description: error.message || "Failed to send document. Please try again.",
        variant: "destructive",
      });
    },
  });
};
