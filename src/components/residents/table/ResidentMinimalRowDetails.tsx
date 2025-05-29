
import { TableCell, TableRow } from "@/components/ui/table";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Eye, 
  Phone,
  Heart,
  AlertTriangle,
  Clock,
  Pill
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentMinimalRowDetailsProps {
  resident: Resident;
  onViewDetails: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
}

const ResidentMinimalRowDetails = ({ resident, onViewDetails, onEdit }: ResidentMinimalRowDetailsProps) => {
  // Mock recent vitals and alerts for demo
  const recentVitals = {
    temperature: "98.6°F",
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    lastChecked: "08:00 AM"
  };

  const activeAlerts = [
    "Fall Risk Assessment Due",
    "Medication Review Needed"
  ];

  const nextMedications = [
    { name: "Metformin", time: "12:00 PM", dosage: "500mg" },
    { name: "Lisinopril", time: "06:00 PM", dosage: "10mg" }
  ];

  return (
    <CollapsibleContent asChild>
      <TableRow>
        <TableCell colSpan={8} className="p-0">
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 border-t border-gray-200">
            <div className="p-4">
              {/* Compact Summary Row */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                
                {/* Quick Vitals */}
                <div className="bg-white rounded-lg p-3 border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-sm">Latest Vitals</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>BP:</span>
                      <span className="font-medium">{recentVitals.bloodPressure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HR:</span>
                      <span className="font-medium">{recentVitals.heartRate}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last: {recentVitals.lastChecked}
                    </div>
                  </div>
                </div>

                {/* Active Alerts */}
                <div className="bg-white rounded-lg p-3 border">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-sm">Active Alerts</span>
                  </div>
                  <div className="space-y-1">
                    {activeAlerts.length > 0 ? (
                      activeAlerts.slice(0, 2).map((alert, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                          {alert}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">No active alerts</span>
                    )}
                  </div>
                </div>

                {/* Next Medications */}
                <div className="bg-white rounded-lg p-3 border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Pill className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm">Upcoming Meds</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    {nextMedications.slice(0, 2).map((med, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-xs">{med.name}</span>
                        <span className="text-xs font-medium">{med.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-white rounded-lg p-3 border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm">Emergency Contact</span>
                  </div>
                  <div className="text-sm">
                    {resident.emergency_contact_name ? (
                      <>
                        <p className="font-medium">{resident.emergency_contact_name}</p>
                        <p className="text-xs text-gray-600">{resident.emergency_contact_relationship}</p>
                        <p className="text-xs text-blue-600">{resident.emergency_contact_phone}</p>
                      </>
                    ) : (
                      <span className="text-xs text-gray-500">No emergency contact</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Quick Tasks
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  >
                    <Pill className="w-4 h-4 mr-2" />
                    Medications
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(resident);
                    }}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Profile
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(resident);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </CollapsibleContent>
  );
};

export default ResidentMinimalRowDetails;
