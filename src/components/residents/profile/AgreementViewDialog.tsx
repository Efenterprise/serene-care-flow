
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAgreementSignatures } from "@/hooks/useAdmissionsAgreements";
import { CheckCircle, Clock, FileText } from "lucide-react";

interface AgreementViewDialogProps {
  agreementId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AgreementViewDialog = ({ agreementId, open, onOpenChange }: AgreementViewDialogProps) => {
  const { data: agreement, isLoading } = useQuery({
    queryKey: ['agreement', agreementId],
    queryFn: async () => {
      if (!agreementId) return null;
      
      const { data, error } = await supabase
        .from('admissions_agreements')
        .select('*')
        .eq('id', agreementId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!agreementId && open,
  });

  const { signatures } = useAgreementSignatures(agreementId || "");

  if (!agreementId || !open) return null;

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl">
          <div className="text-center py-8">Loading agreement...</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!agreement) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl">
          <div className="text-center py-8">Agreement not found</div>
        </DialogContent>
      </Dialog>
    );
  }

  const content = agreement.agreement_content as any;
  const signatureRequirements = content?.signature_requirements || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{content?.title || 'Admissions Agreement'}</span>
            <Badge>Version {agreement.template_version}</Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[70vh]">
          <div className="space-y-6 pr-4">
            {/* Agreement Content */}
            <div className="space-y-4">
              {content?.sections?.map((section: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  {section.required && (
                    <Badge variant="secondary" className="mt-2">Required Section</Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Signature Requirements */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Signature Requirements
              </h3>
              <div className="grid gap-3">
                {signatureRequirements.map((req: any, index: number) => {
                  const signature = signatures.find(s => s.signer_type === req.type);
                  const isSigned = !!signature;
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        isSigned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isSigned ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="font-medium">{req.label}</span>
                        {req.required && (
                          <Badge variant="outline">Required</Badge>
                        )}
                      </div>
                      
                      {isSigned && signature && (
                        <div className="text-sm text-gray-600">
                          Signed by {signature.signer_name} on{' '}
                          {new Date(signature.signed_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Agreement Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Agreement Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Created:</span> {new Date(agreement.created_at).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {agreement.status.replace('_', ' ').toUpperCase()}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {agreement.agreement_type.replace('_', ' ').toUpperCase()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> {new Date(agreement.updated_at).toLocaleString()}
                </div>
              </div>
              {agreement.notes && (
                <div className="mt-4">
                  <span className="font-medium">Notes:</span>
                  <p className="text-gray-700 mt-1">{agreement.notes}</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgreementViewDialog;
