
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Resident } from "@/hooks/useResidents";

interface MedicalTabProps {
  resident: Resident;
}

const MedicalTab = ({ resident }: MedicalTabProps) => {
  return (
    <div className="space-y-6">
      {/* Diagnoses */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnoses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {resident.diagnosis_primary && (
              <div>
                <p className="text-sm text-gray-600">Primary Diagnosis</p>
                <p className="font-medium">{resident.diagnosis_primary}</p>
              </div>
            )}
            {resident.diagnosis_secondary && resident.diagnosis_secondary.length > 0 && (
              <div>
                <p className="text-sm text-gray-600">Secondary Diagnoses</p>
                <ul className="list-disc list-inside space-y-1">
                  {resident.diagnosis_secondary.map((diagnosis, index) => (
                    <li key={index} className="font-medium">{diagnosis}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Physicians */}
      <Card>
        <CardHeader>
          <CardTitle>Care Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {resident.physician_attending && (
              <div>
                <p className="text-sm text-gray-600">Attending Physician</p>
                <p className="font-medium">{resident.physician_attending}</p>
              </div>
            )}
            {resident.physician_primary_care && (
              <div>
                <p className="text-sm text-gray-600">Primary Care Physician</p>
                <p className="font-medium">{resident.physician_primary_care}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Allergies */}
      {resident.allergies && resident.allergies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Allergies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resident.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive">
                  {allergy}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicalTab;
