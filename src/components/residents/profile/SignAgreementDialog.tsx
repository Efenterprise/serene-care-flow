
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAgreementSignatures } from "@/hooks/useAdmissionsAgreements";
import { useResidentContacts } from "@/hooks/useContacts";
import { Resident } from "@/hooks/useResidents";

interface SignAgreementDialogProps {
  agreementId?: string;
  resident: Resident;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignAgreementDialog = ({ agreementId, resident, open, onOpenChange }: SignAgreementDialogProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signerType, setSignerType] = useState("");
  const [signerName, setSignerName] = useState("");
  const [selectedContactId, setSelectedContactId] = useState("");
  
  const { addSignature, isAdding } = useAgreementSignatures(agreementId || "");
  const { data: contacts } = useResidentContacts(resident.id);

  const { data: agreement } = useQuery({
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

  useEffect(() => {
    if (signerType === 'resident') {
      setSignerName(`${resident.first_name} ${resident.last_name}`);
      setSelectedContactId("");
    } else if (signerType === 'responsible_party' && selectedContactId) {
      const contact = contacts?.find(c => c.id === selectedContactId);
      if (contact) {
        setSignerName(`${contact.first_name} ${contact.last_name}`);
      }
    } else {
      setSignerName("");
    }
  }, [signerType, selectedContactId, resident, contacts]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementId || !signerType || !signerName) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const signatureData = canvas.toDataURL();
    
    addSignature({
      agreement_id: agreementId,
      signer_type: signerType as any,
      signer_name: signerName,
      signer_contact_id: selectedContactId || undefined,
      signature_data: signatureData,
      signature_method: 'electronic',
    }, {
      onSuccess: () => {
        setSignerType("");
        setSignerName("");
        setSelectedContactId("");
        clearSignature();
        onOpenChange(false);
      },
    });
  };

  const content = agreement?.agreement_content as any;
  const signatureRequirements = content?.signature_requirements || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Sign Agreement</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signerType">Signature Type</Label>
            <Select value={signerType} onValueChange={setSignerType}>
              <SelectTrigger>
                <SelectValue placeholder="Select signer type" />
              </SelectTrigger>
              <SelectContent>
                {signatureRequirements.map((req: any) => (
                  <SelectItem key={req.type} value={req.type}>
                    {req.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {signerType === 'responsible_party' && (
            <div className="space-y-2">
              <Label htmlFor="contact">Select Contact</Label>
              <Select value={selectedContactId} onValueChange={setSelectedContactId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select responsible party" />
                </SelectTrigger>
                <SelectContent>
                  {contacts?.filter(c => c.relationship && c.relationship.toLowerCase().includes('responsible')).map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.first_name} {contact.last_name} ({contact.relationship})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="signerName">Signer Name</Label>
            <Input
              id="signerName"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Enter signer name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Electronic Signature</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={400}
                height={150}
                className="border border-gray-200 rounded cursor-crosshair bg-white w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ touchAction: 'none' }}
              />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">Sign above</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!signerType || !signerName || isAdding}
            >
              {isAdding ? "Saving..." : "Save Signature"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignAgreementDialog;
