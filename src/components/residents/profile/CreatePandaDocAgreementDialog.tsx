
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { usePandaDocTemplates, usePandaDocCreateDocument } from "@/hooks/admissions/usePandaDocIntegration";
import { useCreateAgreement } from "@/hooks/admissions/useAgreementMutations";

interface CreatePandaDocAgreementDialogProps {
  residentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Signer {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

const CreatePandaDocAgreementDialog = ({ residentId, open, onOpenChange }: CreatePandaDocAgreementDialogProps) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [notes, setNotes] = useState("");
  const [signers, setSigners] = useState<Signer[]>([
    { email: "", first_name: "", last_name: "", role: "resident" }
  ]);

  const { data: templates = [], isLoading: templatesLoading } = usePandaDocTemplates();
  const createAgreement = useCreateAgreement(residentId);
  const createPandaDocDocument = usePandaDocCreateDocument();

  const addSigner = () => {
    setSigners([...signers, { email: "", first_name: "", last_name: "", role: "responsible_party" }]);
  };

  const removeSigner = (index: number) => {
    setSigners(signers.filter((_, i) => i !== index));
  };

  const updateSigner = (index: number, field: keyof Signer, value: string) => {
    const updatedSigners = [...signers];
    updatedSigners[index][field] = value;
    setSigners(updatedSigners);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTemplateId) {
      return;
    }

    const selectedTemplate = templates.find(t => t.pandadoc_template_id === selectedTemplateId);
    if (!selectedTemplate) return;

    try {
      // First create the agreement record
      const agreementData = await new Promise<any>((resolve, reject) => {
        createAgreement.mutate(
          { 
            templateId: selectedTemplate.id, 
            notes 
          },
          {
            onSuccess: resolve,
            onError: reject
          }
        );
      });

      // Then create the PandaDoc document
      await createPandaDocDocument.mutateAsync({
        agreementId: agreementData.id,
        templateId: selectedTemplateId,
        signers: signers.filter(s => s.email && s.first_name && s.last_name)
      });

      onOpenChange(false);
      setSelectedTemplateId("");
      setNotes("");
      setSigners([{ email: "", first_name: "", last_name: "", role: "resident" }]);
    } catch (error) {
      console.error('Error creating PandaDoc agreement:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create PandaDoc Agreement</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="template">Agreement Template</Label>
            <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId} disabled={templatesLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.pandadoc_template_id}>
                    {template.template_name}
                    {template.description && (
                      <span className="text-sm text-gray-500 ml-2">
                        - {template.description}
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Signers
                <Button type="button" variant="outline" size="sm" onClick={addSigner}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Signer
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {signers.map((signer, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded">
                  <div>
                    <Label htmlFor={`signer-${index}-first-name`}>First Name</Label>
                    <Input
                      id={`signer-${index}-first-name`}
                      value={signer.first_name}
                      onChange={(e) => updateSigner(index, 'first_name', e.target.value)}
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`signer-${index}-last-name`}>Last Name</Label>
                    <Input
                      id={`signer-${index}-last-name`}
                      value={signer.last_name}
                      onChange={(e) => updateSigner(index, 'last_name', e.target.value)}
                      placeholder="Last name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`signer-${index}-email`}>Email</Label>
                    <Input
                      id={`signer-${index}-email`}
                      type="email"
                      value={signer.email}
                      onChange={(e) => updateSigner(index, 'email', e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`signer-${index}-role`}>Role</Label>
                      <Select value={signer.role} onValueChange={(value) => updateSigner(index, 'role', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resident">Resident</SelectItem>
                          <SelectItem value="responsible_party">Responsible Party</SelectItem>
                          <SelectItem value="witness">Witness</SelectItem>
                          <SelectItem value="facility_representative">Facility Representative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {signers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSigner(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this agreement..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!selectedTemplateId || createAgreement.isPending || createPandaDocDocument.isPending}
            >
              {createAgreement.isPending || createPandaDocDocument.isPending ? "Creating..." : "Create Agreement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePandaDocAgreementDialog;
