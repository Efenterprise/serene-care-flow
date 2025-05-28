
import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronRight, 
  Edit, 
  Eye, 
  MapPin, 
  Phone, 
  Heart, 
  FileText 
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";
import ResidentProfile from "./ResidentProfile";
import ResidentEditForm from "./ResidentEditForm";

interface ResidentsTableProps {
  residents: Resident[];
}

const ResidentsTable = ({ residents }: ResidentsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const calculateLengthOfStay = (resident: Resident) => {
    const admissionDate = new Date(resident.admission_date);
    const endDate = resident.discharge_date ? new Date(resident.discharge_date) : new Date();
    return differenceInDays(endDate, admissionDate);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'discharged':
        return 'bg-blue-100 text-blue-800';
      case 'pending_admission':
        return 'bg-orange-100 text-orange-800';
      case 'temporary_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleRow = (residentId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(residentId)) {
      newExpanded.delete(residentId);
    } else {
      newExpanded.add(residentId);
    }
    setExpandedRows(newExpanded);
  };

  const handleViewDetails = (resident: Resident) => {
    setSelectedResident(resident);
    setShowProfile(true);
  };

  const handleEdit = (resident: Resident) => {
    setSelectedResident(resident);
    setShowEdit(true);
  };

  if (residents.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">No residents found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>MRN</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Admission Date</TableHead>
              <TableHead>Length of Stay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {residents.map((resident) => (
              <Collapsible
                key={resident.id}
                open={expandedRows.has(resident.id)}
                onOpenChange={() => toggleRow(resident.id)}
                asChild
              >
                <>
                  <CollapsibleTrigger asChild>
                    <TableRow className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        {expandedRows.has(resident.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-blue-600 hover:text-blue-800">
                        {resident.first_name} {resident.last_name}
                      </TableCell>
                      <TableCell>{resident.mrn}</TableCell>
                      <TableCell>{resident.room_number || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(resident.status)}>
                          {resident.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{calculateAge(resident.date_of_birth)}</TableCell>
                      <TableCell>{formatDate(resident.admission_date)}</TableCell>
                      <TableCell>{calculateLengthOfStay(resident)} days</TableCell>
                    </TableRow>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent asChild>
                    <TableRow>
                      <TableCell colSpan={8} className="p-0">
                        <div className="bg-gray-50 p-4 border-t">
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {resident.floor && (
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600">Floor</p>
                                  <p className="font-medium">{resident.floor}</p>
                                </div>
                              </div>
                            )}

                            {resident.physician_attending && (
                              <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600">Attending</p>
                                  <p className="font-medium">{resident.physician_attending}</p>
                                </div>
                              </div>
                            )}

                            {resident.payor_primary && (
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600">Payor</p>
                                  <p className="font-medium">{resident.payor_primary}</p>
                                </div>
                              </div>
                            )}

                            {resident.emergency_contact_name && (
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600">Emergency Contact</p>
                                  <p className="font-medium">{resident.emergency_contact_name}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {resident.diagnosis_primary && (
                            <div className="mb-4 p-3 bg-white rounded border">
                              <p className="text-sm text-gray-600 mb-1">Primary Diagnosis</p>
                              <p className="font-medium">{resident.diagnosis_primary}</p>
                            </div>
                          )}

                          <div className="flex justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(resident);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(resident);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selectedResident && (
        <>
          <ResidentProfile
            resident={selectedResident}
            isOpen={showProfile}
            onClose={() => {
              setShowProfile(false);
              setSelectedResident(null);
            }}
          />
          
          <ResidentEditForm
            resident={selectedResident}
            isOpen={showEdit}
            onClose={() => {
              setShowEdit(false);
              setSelectedResident(null);
            }}
          />
        </>
      )}
    </>
  );
};

export default ResidentsTable;
