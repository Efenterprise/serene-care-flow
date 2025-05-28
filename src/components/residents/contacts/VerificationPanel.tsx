
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Upload,
  Eye,
  Calendar
} from "lucide-react";
import { ResidentContact } from "@/hooks/useContacts";
import { Resident } from "@/hooks/useResidents";
import { format } from "date-fns";

interface VerificationPanelProps {
  resident: Resident;
  contacts: ResidentContact[];
}

const VerificationPanel = ({ resident, contacts }: VerificationPanelProps) => {
  const contactsRequiringVerification = contacts.filter(
    contact => contact.contact_type?.requires_verification
  );

  const getVerificationStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <FileCheck className="w-5 h-5 text-gray-400" />;
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "border-green-200 bg-green-50";
      case "rejected":
        return "border-red-200 bg-red-50";
      case "pending":
        return "border-orange-200 bg-orange-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Verification Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {contactsRequiringVerification.filter(c => 
                  c.verification?.some(v => v.verification_status === "verified")
                ).length}
              </div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {contactsRequiringVerification.filter(c => 
                  c.verification?.some(v => v.verification_status === "pending") || 
                  !c.verification?.length
                ).length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {contactsRequiringVerification.filter(c => 
                  c.verification?.some(v => v.verification_status === "rejected")
                ).length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {contactsRequiringVerification.length}
              </div>
              <div className="text-sm text-gray-600">Total Required</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Requiring Verification */}
      <div className="space-y-4">
        {contactsRequiringVerification.map(contact => {
          const verification = contact.verification?.[0];
          const status = verification?.verification_status || "pending";
          const requiresDocuments = contact.contact_type?.verification_document_types || [];

          return (
            <Card key={contact.id} className={getVerificationStatusColor(status)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getVerificationStatusIcon(status)}
                    <div>
                      <CardTitle className="text-lg">
                        {contact.first_name} {contact.last_name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {contact.contact_type?.name} - {contact.relationship}
                      </p>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={status === "verified" ? "default" : 
                             status === "pending" ? "secondary" : "destructive"}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Required Documents */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Required Documents:</h4>
                  <div className="flex flex-wrap gap-2">
                    {requiresDocuments.map(docType => (
                      <Badge key={docType} variant="outline" className="text-xs">
                        {docType}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Verification Details */}
                {verification && (
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Verification Type</p>
                        <p className="font-medium">{verification.verification_type}</p>
                      </div>
                      
                      {verification.document_name && (
                        <div>
                          <p className="text-sm text-gray-600">Document</p>
                          <p className="font-medium">{verification.document_name}</p>
                        </div>
                      )}

                      {verification.verified_at && (
                        <div>
                          <p className="text-sm text-gray-600">Verified Date</p>
                          <p className="font-medium">
                            {format(new Date(verification.verified_at), "MMM dd, yyyy")}
                          </p>
                        </div>
                      )}

                      {verification.expiration_date && (
                        <div>
                          <p className="text-sm text-gray-600">Expires</p>
                          <p className="font-medium">
                            {format(new Date(verification.expiration_date), "MMM dd, yyyy")}
                          </p>
                        </div>
                      )}
                    </div>

                    {verification.notes && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">Notes</p>
                        <p className="text-sm">{verification.notes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-2 border-t">
                  {!verification && (
                    <Button size="sm" className="flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Documents
                    </Button>
                  )}
                  
                  {verification?.document_url && (
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      View Document
                    </Button>
                  )}

                  {status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" className="text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}

                  {verification?.expiration_date && (
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Update Expiration
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {contactsRequiringVerification.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No contacts require verification at this time.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerificationPanel;
