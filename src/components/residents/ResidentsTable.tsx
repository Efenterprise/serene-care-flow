
import { useState } from "react";
import { Table } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Resident } from "@/hooks/useResidents";
import ResidentProfile from "./ResidentProfile";
import ResidentEditForm from "./ResidentEditForm";
import ResidentsTableHeader from "./table/ResidentsTableHeader";
import ResidentsTableContent from "./table/ResidentsTableContent";

interface ResidentsTableProps {
  residents: Resident[];
}

const ResidentsTable = ({ residents }: ResidentsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
          <ResidentsTableHeader />
          <ResidentsTableContent
            residents={residents}
            expandedRows={expandedRows}
            onToggleRow={toggleRow}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
          />
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
