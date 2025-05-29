
import { useState } from "react";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useResidents } from "@/hooks/useResidents";
import { AssessmentType } from "@/types/mds";

interface ResidentSelectorProps {
  onResidentSelect: (resident: any, assessmentType: AssessmentType) => void;
  onCancel: () => void;
}

const ResidentSelector = ({ onResidentSelect, onCancel }: ResidentSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<AssessmentType>("admission");
  
  const { data: residents = [] } = useResidents("current");

  const filteredResidents = residents.filter(resident =>
    `${resident.first_name} ${resident.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const assessmentTypes = [
    { value: "admission" as AssessmentType, label: "Admission Assessment" },
    { value: "annual" as AssessmentType, label: "Annual Assessment" },
    { value: "quarterly" as AssessmentType, label: "Quarterly Review" },
    { value: "significant_change" as AssessmentType, label: "Significant Change" },
    { value: "discharge" as AssessmentType, label: "Discharge Assessment" }
  ];

  const handleResidentSelect = (resident: any) => {
    onResidentSelect(resident, selectedAssessmentType);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Resident and Assessment Type</h3>
        
        {/* Assessment Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Assessment Type</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedAssessmentType}
            onChange={(e) => setSelectedAssessmentType(e.target.value as AssessmentType)}
          >
            {assessmentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Resident Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search residents by name or MRN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Residents List */}
      <div className="max-h-96 overflow-y-auto space-y-2">
        {filteredResidents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <User className="mx-auto h-12 w-12 mb-2" />
            <p>No residents found</p>
          </div>
        ) : (
          filteredResidents.map((resident) => (
            <Card key={resident.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4" onClick={() => handleResidentSelect(resident)}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{resident.first_name} {resident.last_name}</h4>
                    <p className="text-sm text-gray-600">MRN: {resident.mrn}</p>
                    <p className="text-sm text-gray-600">
                      Room: {resident.room_number || 'Not assigned'} | 
                      DOB: {new Date(resident.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{resident.care_level || 'Standard'}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{resident.unit || 'No unit'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ResidentSelector;
