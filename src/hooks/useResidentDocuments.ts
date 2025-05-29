
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ResidentDocument {
  id: string;
  resident_id: string;
  file_name: string;
  original_file_name: string;
  file_size: number;
  mime_type: string;
  storage_path: string;
  document_type?: string;
  description?: string;
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
}

export const useResidentDocuments = (residentId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const documentsQuery = useQuery({
    queryKey: ['resident-documents', residentId],
    queryFn: async (): Promise<ResidentDocument[]> => {
      const { data, error } = await supabase
        .from('resident_documents')
        .select('*')
        .eq('resident_id', residentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const uploadDocument = useMutation({
    mutationFn: async ({ 
      file, 
      documentType, 
      description 
    }: { 
      file: File; 
      documentType?: string; 
      description?: string; 
    }) => {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const fileName = `${residentId}-${timestamp}.${fileExt}`;
      const filePath = `${residentId}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('resident-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Save document metadata
      const { data, error: insertError } = await supabase
        .from('resident_documents')
        .insert({
          resident_id: residentId,
          file_name: fileName,
          original_file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          storage_path: filePath,
          document_type: documentType,
          description,
          uploaded_by: user?.id,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Document Uploaded",
        description: "Document has been uploaded successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['resident-documents', residentId] });
    },
    onError: (error: any) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteDocument = useMutation({
    mutationFn: async (documentId: string) => {
      // Get document info first
      const { data: document, error: fetchError } = await supabase
        .from('resident_documents')
        .select('storage_path')
        .eq('id', documentId)
        .single();

      if (fetchError) throw fetchError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('resident-documents')
        .remove([document.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: deleteError } = await supabase
        .from('resident_documents')
        .delete()
        .eq('id', documentId);

      if (deleteError) throw deleteError;
    },
    onSuccess: () => {
      toast({
        title: "Document Deleted",
        description: "Document has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['resident-documents', residentId] });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete document. Please try again.",
        variant: "destructive",
      });
    },
  });

  const renameDocument = useMutation({
    mutationFn: async ({ documentId, newName }: { documentId: string; newName: string }) => {
      const { error } = await supabase
        .from('resident_documents')
        .update({ 
          file_name: newName,
          updated_at: new Date().toISOString()
        })
        .eq('id', documentId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Document Renamed",
        description: "Document has been renamed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['resident-documents', residentId] });
    },
    onError: (error: any) => {
      toast({
        title: "Rename Failed",
        description: error.message || "Failed to rename document. Please try again.",
        variant: "destructive",
      });
    },
  });

  const downloadDocument = async (document: ResidentDocument) => {
    try {
      const { data, error } = await supabase.storage
        .from('resident-documents')
        .download(document.storage_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = document.original_file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message || "Failed to download document. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    documents: documentsQuery.data || [],
    isLoading: documentsQuery.isLoading,
    uploadDocument: uploadDocument.mutate,
    deleteDocument: deleteDocument.mutate,
    renameDocument: renameDocument.mutate,
    downloadDocument,
    isUploading: uploadDocument.isPending,
    isDeleting: deleteDocument.isPending,
    isRenaming: renameDocument.isPending,
  };
};
