
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  Search, 
  Calendar,
  MapPin,
  FileText
} from "lucide-react";
import { useResidents, useResidentStats } from "@/hooks/useResidents";
import ResidentsTable from "./ResidentsTable";
import ResidentFilters from "./ResidentFilters";

const ResidentsManagement = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    floor: "all",
    unit: "all",
    payor: "all",
    careLevel: "all",
    physician: "all"
  });

  const { data: residents, isLoading } = useResidents(activeTab);
  const { data: stats } = useResidentStats();

  const filteredResidents = residents?.filter(resident => {
    const matchesSearch = 
      `${resident.first_name} ${resident.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.room_number?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.floor === "all" || resident.floor === filters.floor) &&
      (filters.unit === "all" || resident.unit === filters.unit) &&
      (filters.payor === "all" || resident.payor_primary === filters.payor) &&
      (filters.careLevel === "all" || resident.care_level === filters.careLevel) &&
      (filters.physician === "all" || resident.physician_attending === filters.physician);

    return matchesSearch && matchesFilters;
  }) || [];

  if (isLoading) {
    return <div>Loading residents...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resident Management</h1>
          <p className="text-gray-600">Manage current and discharged residents</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Resident
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Residents</p>
                <p className="text-2xl font-bold text-green-600">{stats?.current || 0}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Discharged</p>
                <p className="text-2xl font-bold text-blue-600">{stats?.discharged || 0}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Admission</p>
                <p className="text-2xl font-bold text-orange-600">{stats?.pending_admission || 0}</p>
              </div>
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-purple-600">{stats?.total || 0}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, MRN, or room number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <ResidentFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Status Tabs with Counts */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current" className="flex items-center space-x-2">
            <span>Current</span>
            <Badge variant="secondary">{stats?.current || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="discharged" className="flex items-center space-x-2">
            <span>Discharged</span>
            <Badge variant="secondary">{stats?.discharged || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending_admission" className="flex items-center space-x-2">
            <span>Pending</span>
            <Badge variant="secondary">{stats?.pending_admission || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <span>All</span>
            <Badge variant="secondary">{stats?.total || 0}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <ResidentsTable residents={filteredResidents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResidentsManagement;
