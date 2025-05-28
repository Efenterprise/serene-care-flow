
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, X } from "lucide-react";

interface Filters {
  floor: string;
  unit: string;
  payor: string;
  careLevel: string;
  physician: string;
}

interface ResidentFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const ResidentFilters = ({ filters, onFiltersChange }: ResidentFiltersProps) => {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      floor: "all",
      unit: "all",
      payor: "all",
      careLevel: "all",
      physician: "all"
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== "all");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Filter Residents</h4>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Floor</label>
              <Select value={filters.floor} onValueChange={(value) => handleFilterChange('floor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All floors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All floors</SelectItem>
                  <SelectItem value="1">Floor 1</SelectItem>
                  <SelectItem value="2">Floor 2</SelectItem>
                  <SelectItem value="3">Floor 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Unit</label>
              <Select value={filters.unit} onValueChange={(value) => handleFilterChange('unit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All units</SelectItem>
                  <SelectItem value="East Wing">East Wing</SelectItem>
                  <SelectItem value="West Wing">West Wing</SelectItem>
                  <SelectItem value="North Wing">North Wing</SelectItem>
                  <SelectItem value="South Wing">South Wing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Payor</label>
              <Select value={filters.payor} onValueChange={(value) => handleFilterChange('payor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All payors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All payors</SelectItem>
                  <SelectItem value="Medicare Part A">Medicare Part A</SelectItem>
                  <SelectItem value="Medicare Advantage">Medicare Advantage</SelectItem>
                  <SelectItem value="Medicaid">Medicaid</SelectItem>
                  <SelectItem value="Private Pay">Private Pay</SelectItem>
                  <SelectItem value="Private Insurance">Private Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Care Level</label>
              <Select value={filters.careLevel} onValueChange={(value) => handleFilterChange('careLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All care levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All care levels</SelectItem>
                  <SelectItem value="skilled">Skilled Nursing</SelectItem>
                  <SelectItem value="assisted">Assisted Living</SelectItem>
                  <SelectItem value="memory_care">Memory Care</SelectItem>
                  <SelectItem value="respite">Respite Care</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Physician</label>
              <Select value={filters.physician} onValueChange={(value) => handleFilterChange('physician', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All physicians" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All physicians</SelectItem>
                  <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                  <SelectItem value="Dr. Adams">Dr. Adams</SelectItem>
                  <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                  <SelectItem value="Dr. Lee">Dr. Lee</SelectItem>
                  <SelectItem value="Dr. Wilson">Dr. Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ResidentFilters;
