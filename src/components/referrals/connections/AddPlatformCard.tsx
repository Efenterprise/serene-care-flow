
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddPlatformCard = () => {
  return (
    <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
      <CardContent className="flex items-center justify-center p-6">
        <Button variant="ghost" className="text-gray-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Platform Integration
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddPlatformCard;
