
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Stethoscope, 
  Phone, 
  Mail, 
  MapPin,
  Edit,
  Trash2,
  Star
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import { useMedicalProfessionals } from "@/hooks/useMedicalProfessionals";
import AddMedicalProfessionalDialog from "./AddMedicalProfessionalDialog";
import EditMedicalProfessionalDialog from "./EditMedicalProfessionalDialog";

interface MedicalProfessionalsTabProps {
  resident: Resident;
}

const MedicalProfessionalsTab = ({ resident }: MedicalProfessionalsTabProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState(null);
  const { data: professionals = [], isLoading } = useMedicalProfessionals(resident.id);

  const getProfessionColor = (profession: string) => {
    switch (profession.toLowerCase()) {
      case 'physician':
        return 'bg-blue-100 text-blue-800';
      case 'nurse practitioner':
        return 'bg-green-100 text-green-800';
      case 'physical therapist':
        return 'bg-purple-100 text-purple-800';
      case 'occupational therapist':
        return 'bg-orange-100 text-orange-800';
      case 'speech therapist':
        return 'bg-pink-100 text-pink-800';
      case 'social worker':
        return 'bg-teal-100 text-teal-800';
      case 'pharmacist':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading medical professionals...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Medical Professionals</h3>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Professional
        </Button>
      </div>

      {/* Medical Professionals List */}
      <div className="grid gap-4">
        {professionals.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Stethoscope className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Medical Professionals</h3>
              <p className="text-gray-600 text-center mb-4">
                Add the resident's medical team to keep track of all healthcare providers.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Professional
              </Button>
            </CardContent>
          </Card>
        ) : (
          professionals.map((professional) => (
            <Card key={professional.id} className="hover:bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{professional.name}</h4>
                        {professional.is_primary && (
                          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Primary
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <Badge className={getProfessionColor(professional.profession)}>
                          {professional.profession}
                        </Badge>
                        {professional.relation && (
                          <p className="text-sm text-gray-600">Relation: {professional.relation}</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-2 mt-3">
                        {professional.office_phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>Office: {professional.office_phone}</span>
                          </div>
                        )}
                        {professional.mobile_phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>Mobile: {professional.mobile_phone}</span>
                          </div>
                        )}
                        {professional.email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>{professional.email}</span>
                          </div>
                        )}
                        {professional.npi_number && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span>NPI: {professional.npi_number}</span>
                          </div>
                        )}
                      </div>

                      {professional.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-700">{professional.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setEditingProfessional(professional)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialogs */}
      <AddMedicalProfessionalDialog
        resident={resident}
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {editingProfessional && (
        <EditMedicalProfessionalDialog
          professional={editingProfessional}
          isOpen={!!editingProfessional}
          onClose={() => setEditingProfessional(null)}
        />
      )}
    </div>
  );
};

export default MedicalProfessionalsTab;
