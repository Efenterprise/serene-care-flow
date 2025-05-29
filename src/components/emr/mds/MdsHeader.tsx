
import { Button } from "@/components/ui/button";
import { Plus, Brain } from "lucide-react";

interface MdsHeaderProps {
  onNewAssessment: () => void;
}

const MdsHeader = ({ onNewAssessment }: MdsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">MDS 3.0 & CAA Management</h2>
        <p className="text-gray-600">Comprehensive MDS assessments with automated CAA trigger analysis</p>
      </div>
      <div className="flex space-x-3">
        <Button 
          onClick={onNewAssessment}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
        <Button variant="outline">
          <Brain className="w-4 h-4 mr-2" />
          CAA Analysis
        </Button>
      </div>
    </div>
  );
};

export default MdsHeader;
