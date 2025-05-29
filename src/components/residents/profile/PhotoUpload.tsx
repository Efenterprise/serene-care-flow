
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, Trash2, AlertCircle } from "lucide-react";
import { useResidentPhotos } from "@/hooks/useResidentPhotos";
import { Resident } from "@/hooks/useResidents";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PhotoUploadProps {
  resident: Resident;
}

const PhotoUpload = ({ resident }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { uploadPhoto, deletePhoto, isUploading, isDeleting } = useResidentPhotos();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadError(null);
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }
      
      uploadPhoto({ 
        residentId: resident.id, 
        file,
        onError: (error: string) => setUploadError(error)
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleDeletePhoto = () => {
    if (resident.photo_url && window.confirm('Are you sure you want to delete this photo?')) {
      setUploadError(null);
      deletePhoto({ 
        residentId: resident.id, 
        photoUrl: resident.photo_url,
        onError: (error: string) => setUploadError(error)
      });
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
          <AvatarImage src={resident.photo_url || undefined} />
          <AvatarFallback className="bg-gray-100 text-gray-600 text-lg sm:text-2xl">
            {resident.photo_url ? (
              <Camera className="w-8 h-8 sm:w-12 sm:h-12" />
            ) : (
              getInitials(resident.first_name, resident.last_name)
            )}
          </AvatarFallback>
        </Avatar>
        
        {!resident.photo_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-full border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 hidden sm:block">Insert photo here</span>
            </div>
          </div>
        )}
      </div>

      {uploadError && (
        <Alert variant="destructive" className="w-full max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{uploadError}</AlertDescription>
        </Alert>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button
          size="sm"
          variant="outline"
          onClick={handleUploadClick}
          disabled={isUploading}
          className="w-full sm:w-auto"
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : resident.photo_url ? 'Change Photo' : 'Upload Photo'}
        </Button>

        {/* Mobile camera button */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleCameraClick}
          disabled={isUploading}
          className="w-full sm:w-auto sm:hidden"
        >
          <Camera className="w-4 h-4 mr-2" />
          Take Photo
        </Button>

        {resident.photo_url && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleDeletePhoto}
            disabled={isDeleting}
            className="w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
