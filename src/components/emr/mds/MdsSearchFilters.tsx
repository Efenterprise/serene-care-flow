
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

interface MdsSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MdsSearchFilters = ({ searchTerm, onSearchChange }: MdsSearchFiltersProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search by patient name or MRN..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant="outline">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </Button>
      <Button variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
    </div>
  );
};

export default MdsSearchFilters;
