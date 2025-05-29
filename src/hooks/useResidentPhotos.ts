
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useResidentPhotos = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const uploadPhoto = useMutation({
    mutationFn: async ({ residentId, file }: { residentId: string; file: File }) => {
      setUploading(true);
      
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${residentId}-${Date.now()}.${fileExt}`;
      const filePath = `${residentId}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('resident-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resident-photos')
        .getPublicUrl(filePath);

      // Update resident record with photo URL
      const { error: updateError } = await supabase
        .from('residents')
        .update({ photo_url: publicUrl })
        .eq('id', residentId);

      if (updateError) throw updateError;

      return { publicUrl, filePath };
    },
    onSuccess: () => {
      toast({
        title: "Photo Uploaded",
        description: "Resident photo has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['residents'] });
    },
    onError: (error: any) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async ({ residentId, photoUrl }: { residentId: string; photoUrl: string }) => {
      // Extract file path from URL
      const urlParts = photoUrl.split('/');
      const filePath = urlParts.slice(-2).join('/');

      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('resident-photos')
        .remove([filePath]);

      if (deleteError) throw deleteError;

      // Update resident record to remove photo URL
      const { error: updateError } = await supabase
        .from('residents')
        .update({ photo_url: null })
        .eq('id', residentId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      toast({
        title: "Photo Deleted",
        description: "Resident photo has been removed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['residents'] });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    uploadPhoto: uploadPhoto.mutate,
    deletePhoto: deletePhoto.mutate,
    isUploading: uploading || uploadPhoto.isPending,
    isDeleting: deletePhoto.isPending,
  };
};
