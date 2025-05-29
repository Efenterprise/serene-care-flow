
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Filter,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  PenTool
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdmissionsAgreement } from "@/types/admissions";
import AgreementViewDialog from "../residents/profile/AgreementViewDialog";

const AdmissionsAgreementsPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewDialog, setViewDialog] = useState<{ open: boolean; agreementId?: string }>({
    open: false
  });

  const { data: agreements = [], isLoading } = useQuery({
    queryKey: ['all-admissions-agreements'],
    queryFn: async (): Promise<(AdmissionsAgreement & { resident_name?: string })[]> => {
      const { data, error } = await supabase
        .from('admissions_agreements')
        .select(`
          *,
          residents!inner(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map(agreement => ({
        ...agreement,
        resident_name: `${agreement.residents.first_name} ${agreement.residents.last_name}`
      }));
    },
  });

  const { data: templates = [] } = useQuery({
    queryKey: ['agreement-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agreement_templates')
        .select('*')
        .eq('is_active', true)
        .order('template_name');

      if (error) throw error;
      return data || [];
    },
  });

  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = !searchTerm || 
      agreement.resident_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.agreement_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || agreement.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fully_signed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'partially_signed':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'pending_signatures':
        return <PenTool className="w-4 h-4 text-blue-600" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'fully_signed':
        return <Badge className="bg-green-100 text-green-800">Fully Signed</Badge>;
      case 'partially_signed':
        return <Badge className="bg-yellow-100 text-yellow-800">Partially Signed</Badge>;
      case 'pending_signatures':
        return <Badge className="bg-blue-100 text-blue-800">Pending Signatures</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const statusCounts = agreements.reduce((acc, agreement) => {
    acc[agreement.status] = (acc[agreement.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return <div className="text-center py-8">Loading agreements...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admissions Agreements</h1>
          <p className="text-gray-600">Manage electronic agreements and signatures for all residents</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Agreements</p>
                <p className="text-2xl font-bold text-blue-600">{agreements.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Signatures</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(statusCounts['pending_signatures'] || 0) + (statusCounts['partially_signed'] || 0)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <PenTool className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fully Signed</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts['fully_signed'] || 0}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-purple-600">{templates.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by resident name or agreement type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending_signatures">Pending Signatures</option>
                <option value="partially_signed">Partially Signed</option>
                <option value="fully_signed">Fully Signed</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agreements List */}
      <Card>
        <CardHeader>
          <CardTitle>All Agreements ({filteredAgreements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAgreements.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Agreements Found</h4>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all" 
                  ? "No agreements match your current filters." 
                  : "No agreements have been created yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAgreements.map((agreement) => (
                <div key={agreement.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(agreement.status)}
                      <div>
                        <h4 className="font-medium">{agreement.resident_name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{agreement.agreement_type.replace('_', ' ').toUpperCase()}</span>
                          <span>•</span>
                          <span>Version {agreement.template_version}</span>
                          <span>•</span>
                          <span>{new Date(agreement.created_at).toLocaleDateString()}</span>
                          {agreement.expires_at && (
                            <>
                              <span>•</span>
                              <span>Expires {new Date(agreement.expires_at).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                        {agreement.notes && (
                          <p className="text-sm text-gray-600 mt-1">{agreement.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {getStatusBadge(agreement.status)}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setViewDialog({ open: true, agreementId: agreement.id })}
                        title="View Agreement"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AgreementViewDialog
        agreementId={viewDialog.agreementId}
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ open })}
      />
    </div>
  );
};

export default AdmissionsAgreementsPortal;
