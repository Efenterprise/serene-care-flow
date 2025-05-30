
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Eye, 
  PenTool,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Send,
  ExternalLink
} from "lucide-react";
import { useAdmissionsAgreements } from "@/hooks/useAdmissionsAgreements";
import { Resident } from "@/hooks/useResidents";
import CreatePandaDocAgreementDialog from "./CreatePandaDocAgreementDialog";
import AgreementViewDialog from "./AgreementViewDialog";
import SignAgreementDialog from "./SignAgreementDialog";
import { usePandaDocSendDocument } from "@/hooks/admissions/usePandaDocIntegration";

interface AdmissionsAgreementsProps {
  resident: Resident;
}

const AdmissionsAgreements = ({ resident }: AdmissionsAgreementsProps) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialog, setViewDialog] = useState<{ open: boolean; agreementId?: string }>({
    open: false
  });
  const [signDialog, setSignDialog] = useState<{ open: boolean; agreementId?: string }>({
    open: false
  });

  const { 
    agreements, 
    isLoading, 
    updateAgreementStatus 
  } = useAdmissionsAgreements(resident.id);

  const sendDocument = usePandaDocSendDocument();

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

  const handleSendForSignature = (agreement: any) => {
    if (agreement.pandadoc_document_id) {
      // Send via electronic signature platform
      sendDocument.mutate({ 
        documentId: agreement.pandadoc_document_id,
        message: `Please review and sign the admission agreement for ${resident.first_name} ${resident.last_name}.`
      });
    } else {
      // Legacy workflow
      updateAgreementStatus({ agreementId: agreement.id, status: 'pending_signatures' });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading agreements...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Admissions Agreements</h3>
          <p className="text-sm text-gray-600">Electronic agreements and signature management</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Agreement
        </Button>
      </div>

      {agreements.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Agreements</h4>
            <p className="text-gray-500 mb-4">
              Create an admission agreement for {resident.first_name} {resident.last_name}.
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Agreement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {agreements.map((agreement) => (
            <Card key={agreement.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(agreement.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{agreement.agreement_type.replace('_', ' ').toUpperCase()}</h4>
                        {agreement.pandadoc_document_id && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            Electronic
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
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
                      {agreement.pandadoc_status && (
                        <p className="text-xs text-blue-600 mt-1">
                          Status: {agreement.pandadoc_status.replace('document.', '')}
                        </p>
                      )}
                      {agreement.notes && (
                        <p className="text-sm text-gray-600 mt-1">{agreement.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {getStatusBadge(agreement.status)}
                    
                    {agreement.pandadoc_view_url && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(agreement.pandadoc_view_url, '_blank')}
                        title="View Agreement"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewDialog({ open: true, agreementId: agreement.id })}
                      title="View Agreement"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    {!agreement.pandadoc_document_id && (agreement.status === 'draft' || agreement.status === 'pending_signatures' || agreement.status === 'partially_signed') && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSignDialog({ open: true, agreementId: agreement.id })}
                        title="Sign Agreement"
                      >
                        <PenTool className="w-4 h-4" />
                      </Button>
                    )}

                    {((agreement.pandadoc_document_id && agreement.pandadoc_status === 'document.draft') || 
                      (!agreement.pandadoc_document_id && agreement.status === 'draft')) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendForSignature(agreement)}
                        title="Send for Signature"
                        disabled={sendDocument.isPending}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send for Signature
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreatePandaDocAgreementDialog
        residentId={resident.id}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <AgreementViewDialog
        agreementId={viewDialog.agreementId}
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ open })}
      />

      <SignAgreementDialog
        agreementId={signDialog.agreementId}
        resident={resident}
        open={signDialog.open}
        onOpenChange={(open) => setSignDialog({ open })}
      />
    </div>
  );
};

export default AdmissionsAgreements;
