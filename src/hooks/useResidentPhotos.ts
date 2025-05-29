
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
        console.log('Starting photo upload for resident:', residentId);
        console.log('File details:', { name: file.name, size: file.size, type: file.type });

        // Create unique filename with timestamp
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const timestamp = Date.now();
        const fileName = `photo-${timestamp}.${fileExt}`;
        const filePath = `${residentId}/${fileName}`;

        console.log('Upload path:', filePath);

        // Upload file to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resident-photos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        console.log('Upload successful:', uploadData);

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('resident-photos')
          .getPublicUrl(filePath);

        console.log('Generated public URL:', publicUrl);

        // Add timestamp to URL to prevent caching issues
        const timestampedUrl = `${publicUrl}?t=${timestamp}`;
        console.log('Timestamped URL:', timestampedUrl);

        // Update resident record with photo URL
        const { data: updateData, error: updateError } = await supabase
          .from('residents')
          .update({ photo_url: timestampedUrl })
          .eq('id', residentId)
          .select();

        if (updateError) {
          console.error('Database update error:', updateError);
          // Try to clean up uploaded file
          await supabase.storage
            .from('resident-photos')
            .remove([filePath]);
          throw new Error(`Database update failed: ${updateError.message}`);
        }

        console.log('Database updated successfully:', updateData);

        return { publicUrl: timestampedUrl, filePath };
      } catch (error: any) {
        console.error('Upload process error:', error);
        if (onError) {
          onError(error.message || 'Upload failed');
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Upload mutation successful, invalidating queries');
      toast({
        title: "Photo Uploaded",
        description: "Photo has been uploaded successfully.",
      });
      // Force refresh of residents data
      queryClient.invalidateQueries({ queryKey: ['residents'] });
      // Also refetch immediately to ensure UI updates
      queryClient.refetchQueries({ queryKey: ['residents'] });
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
        console.log('Starting photo deletion for resident:', residentId);
        console.log('Photo URL to delete:', photoUrl);

        // Extract file path from URL (remove query params first)
        const cleanUrl = photoUrl.split('?')[0];
        const urlParts = cleanUrl.split('/');
        const filePath = urlParts.slice(-2).join('/');

        console.log('Deleting file at path:', filePath);

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

        console.log('Photo deletion completed successfully');
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
      queryClient.refetchQueries({ queryKey: ['residents'] });
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
