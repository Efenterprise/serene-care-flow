
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  MapPin, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  Clock,
  Heart
} from "lucide-react";
import { usePatientTracking } from "@/hooks/usePatientTracking";

const PatientLifecycleTracker = () => {
  const { data: patients, isLoading } = usePatientTracking();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'admitted':
        return 'bg-green-100 text-green-800';
      case 'discharged':
        return 'bg-blue-100 text-blue-800';
      case 'readmitted':
        return 'bg-orange-100 text-orange-800';
      case 'transferred':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number | null) => {
    if (!score) return 'bg-gray-100 text-gray-800';
    if (score >= 80) return 'bg-red-100 text-red-800';
    if (score >= 60) return 'bg-orange-100 text-orange-800';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return <div>Loading patient tracking data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Lifecycle Tracker</h2>
          <p className="text-gray-600">Monitor patient journey from admission to discharge</p>
        </div>
      </div>

      <div className="grid gap-6">
        {patients?.map((patient) => (
          <Card key={patient.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      MRN: {patient.patient_mrn}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {patient.referral?.patient_name} • {patient.referral?.diagnosis}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(patient.current_status)}>
                    {patient.current_status}
                  </Badge>
                  {patient.readmission_risk_score && (
                    <Badge className={getRiskColor(patient.readmission_risk_score)}>
                      Risk: {patient.readmission_risk_score}%
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{patient.location || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Admission</p>
                    <p className="font-medium">{formatDate(patient.admission_date)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Last Contact</p>
                    <p className="font-medium">{formatDate(patient.last_hospital_contact)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Facility</p>
                    <p className="font-medium">{patient.facility?.name || 'Not assigned'}</p>
                  </div>
                </div>
              </div>

              {patient.risk_factors && patient.risk_factors.length > 0 && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Risk Factors</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {patient.risk_factors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-4 space-x-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Update Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientLifecycleTracker;
