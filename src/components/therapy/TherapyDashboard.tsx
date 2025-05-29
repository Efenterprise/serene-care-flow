import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Video
} from "lucide-react";
import { useFacilityStore } from "@/stores/facilityStore";
import { useEffect } from "react";
import TherapyMetricsCards from "./TherapyMetricsCards";
import TherapyPriorityActions from "./TherapyPriorityActions";
import TherapistProductivity from "./TherapistProductivity";
import TherapyOutcomes from "./TherapyOutcomes";
import TherapyQualityMetrics from "./TherapyQualityMetrics";

const TherapyDashboard = () => {
  const { fetchTherapyStats } = useFacilityStore();

  // Call fetchTherapyStats once on mount only
  useEffect(() => {
    console.log('TherapyDashboard: Fetching therapy stats...');
    fetchTherapyStats();
  }, []); // Empty dependency array to prevent infinite loops

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Therapy Dashboard</h2>
          <p className="text-gray-600">Complete therapy management - The Rehab Optima killer!</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-green-600 hover:bg-green-700">
            <Video className="w-4 h-4 mr-2" />
            Start Telehealth
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Session
          </Button>
        </div>
      </div>

      <TherapyMetricsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TherapyPriorityActions />
        <TherapistProductivity />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TherapyOutcomes />
        <TherapyQualityMetrics />
      </div>
    </div>
  );
};

export default TherapyDashboard;
