
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useResidentPhotos = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const uploadPhoto = useMutation({
    mutationFn: async ({ 
      residentId, 
      file, 
      onError 
    }: { 
      residentId: string; 
      file: File; 
      onError?: (error: string) => void;
    }) => {
      setUploading(true);
      
      try {
        // Create unique filename
        const fileExt = file.name.split('.').pop();
        const timestamp = Date.now();
        const fileName = `${residentId}-${timestamp}.${fileExt}`;
        const filePath = `${residentId}/${fileName}`;

        console.log('Uploading file:', fileName, 'Size:', file.size, 'Type:', file.type);

        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from('resident-photos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('resident-photos')
          .getPublicUrl(filePath);

        console.log('Generated public URL:', publicUrl);

        // Update resident record with photo URL
        const { error: updateError } = await supabase
          .from('residents')
          .update({ photo_url: publicUrl })
          .eq('id', residentId);

        if (updateError) {
          console.error('Database update error:', updateError);
          // Try to clean up uploaded file
          await supabase.storage
            .from('resident-photos')
            .remove([filePath]);
          throw new Error(`Database update failed: ${updateError.message}`);
        }

        return { publicUrl, filePath };
      } catch (error: any) {
        console.error('Upload process error:', error);
        if (onError) {
          onError(error.message || 'Upload failed');
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Photo Uploaded",
        description: "Photo has been uploaded successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['residents'] });
    },
    onError: (error: any) => {
      console.error('Upload mutation error:', error);
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
    mutationFn: async ({ 
      residentId, 
      photoUrl, 
      onError 
    }: { 
      residentId: string; 
      photoUrl: string; 
      onError?: (error: string) => void;
    }) => {
      try {
        // Extract file path from URL
        const urlParts = photoUrl.split('/');
        const filePath = urlParts.slice(-2).join('/');

        console.log('Deleting file:', filePath);

        // Delete from storage
        const { error: deleteError } = await supabase.storage
          .from('resident-photos')
          .remove([filePath]);

        if (deleteError) {
          console.error('Storage delete error:', deleteError);
          // Continue anyway to clear the database reference
        }

        // Update resident record to remove photo URL
        const { error: updateError } = await supabase
          .from('residents')
          .update({ photo_url: null })
          .eq('id', residentId);

        if (updateError) {
          console.error('Database update error:', updateError);
          throw new Error(`Failed to update database: ${updateError.message}`);
        }
      } catch (error: any) {
        console.error('Delete process error:', error);
        if (onError) {
          onError(error.message || 'Delete failed');
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Photo Deleted",
        description: "Photo has been removed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['residents'] });
    },
    onError: (error: any) => {
      console.error('Delete mutation error:', error);
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
