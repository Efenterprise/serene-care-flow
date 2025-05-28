
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ResidentsTableHeader = () => {
  return (
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
  );
};

export default ResidentsTableHeader;
