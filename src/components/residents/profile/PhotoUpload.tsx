
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, Trash2 } from "lucide-react";
import { useResidentPhotos } from "@/hooks/useResidentPhotos";
import { Resident } from "@/hooks/useResidents";

interface PhotoUploadProps {
  resident: Resident;
}

const PhotoUpload = ({ resident }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPhoto, deletePhoto, isUploading, isDeleting } = useResidentPhotos();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      uploadPhoto({ residentId: resident.id, file });
    }
  };

  const handleDeletePhoto = () => {
    if (resident.photo_url && window.confirm('Are you sure you want to delete this photo?')) {
      deletePhoto({ residentId: resident.id, photoUrl: resident.photo_url });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-32 h-32">
          <AvatarImage src={resident.photo_url || ""} />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-semibold">
            {resident.photo_url ? (
              <Camera className="w-8 h-8" />
            ) : (
              getInitials(resident.first_name, resident.last_name)
            )}
          </AvatarFallback>
        </Avatar>

        {!resident.photo_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <span className="text-xs text-gray-500">Insert Photo Here</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {resident.photo_url ? 'Change Photo' : 'Upload Photo'}
        </Button>

        {resident.photo_url && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleDeletePhoto}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {isUploading && (
        <p className="text-sm text-gray-500">Uploading photo...</p>
      )}
    </div>
  );
};

export default PhotoUpload;
