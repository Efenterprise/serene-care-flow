
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, Trash2, AlertCircle, RefreshCw } from "lucide-react";
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
  const [imageKey, setImageKey] = useState(Date.now()); // Force image refresh
  const { uploadPhoto, deletePhoto, isUploading, isDeleting } = useResidentPhotos();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
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
      
      console.log('Starting upload for resident:', resident.id);
      uploadPhoto({ 
        residentId: resident.id, 
        file,
        onError: (error: string) => setUploadError(error)
      });
    }
    
    // Reset the input value so the same file can be selected again if needed
    event.target.value = '';
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

  const handleRefreshPhoto = () => {
    console.log('Refreshing photo display');
    setImageKey(Date.now());
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Create a cache-busted URL for the image
  const getImageUrl = () => {
    if (!resident.photo_url) return undefined;
    
    // If URL already has timestamp, use it as is
    if (resident.photo_url.includes('?t=')) {
      return resident.photo_url;
    }
    
    // Add cache-busting parameter
    return `${resident.photo_url}?v=${imageKey}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
          <AvatarImage 
            key={imageKey}
            src={getImageUrl()} 
            alt={`${resident.first_name} ${resident.last_name}`}
            onError={() => {
              console.log('Image failed to load:', getImageUrl());
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', getImageUrl());
            }}
          />
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
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefreshPhoto}
              className="w-full sm:w-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>

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
          </>
        )}
      </div>

      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && resident.photo_url && (
        <div className="text-xs text-gray-500 text-center max-w-sm">
          <p>Photo URL: {resident.photo_url}</p>
          <p>Cache key: {imageKey}</p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
