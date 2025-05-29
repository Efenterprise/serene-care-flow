
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddPlatformCardProps {
  onAddCareport?: () => void;
  onAddProfility?: () => void;
}

const AddPlatformCard = ({ onAddCareport, onAddProfility }: AddPlatformCardProps) => {
  return (
    <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Add New Platform</h3>
        
        <div className="flex flex-col space-y-2 w-full">
          {onAddCareport && (
            <Button 
              variant="outline" 
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={onAddCareport}
            >
              <Plus className="w-4 h-4 mr-2" />
              Connect WellSky Careport
            </Button>
          )}
          
          {onAddProfility && (
            <Button 
              variant="outline" 
              className="text-green-600 border-green-200 hover:bg-green-50"
              onClick={onAddProfility}
            >
              <Plus className="w-4 h-4 mr-2" />
              Connect Profility
            </Button>
          )}
          
          <Button variant="ghost" className="text-gray-600">
            <Plus className="w-4 h-4 mr-2" />
            Request New Integration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddPlatformCard;
