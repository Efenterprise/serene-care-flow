
import { TableBody } from "@/components/ui/table";
import { Resident } from "@/hooks/useResidents";
import ResidentTableRow from "./ResidentTableRow";

interface ResidentsTableContentProps {
  residents: Resident[];
  expandedRows: Set<string>;
  onToggleRow: (residentId: string) => void;
  onViewDetails: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
}

const ResidentsTableContent = ({
  residents,
  expandedRows,
  onToggleRow,
  onViewDetails,
  onEdit
}: ResidentsTableContentProps) => {
  return (
    <TableBody>
      {residents.map((resident) => (
        <ResidentTableRow
          key={resident.id}
          resident={resident}
          isExpanded={expandedRows.has(resident.id)}
          onToggle={() => onToggleRow(resident.id)}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
        />
      ))}
    </TableBody>
  );
};

export default ResidentsTableContent;
