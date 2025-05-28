
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface IntegrationProvider {
  id: string;
  name: string;
  website: string;
  description: string;
  category: string;
  contact_email?: string;
  integration_benefits: string[];
}

interface IntegrationRequestDialogProps {
  provider: IntegrationProvider | null;
  isOpen: boolean;
  onClose: () => void;
}

const IntegrationRequestDialog = ({ provider, isOpen, onClose }: IntegrationRequestDialogProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    facilityName: 'Healthcare Pro Facility',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    customNotes: ''
  });

  const generateMessage = () => {
    if (!provider) return '';

    return `Subject: Integration Partnership Inquiry - Healthcare Pro

Dear ${provider.name} Team,

I hope this message finds you well. My name is ${formData.contactName}, and I am reaching out on behalf of ${formData.facilityName}, where we use Healthcare Pro as our comprehensive healthcare management platform.

We have been impressed by ${provider.name}'s capabilities in ${provider.category.toLowerCase()}, particularly:
${provider.integration_benefits.map(benefit => `• ${benefit}`).join('\n')}

Healthcare Pro serves as our central hub for patient care management, clinical operations, and administrative workflows. We believe that integrating ${provider.name} with our Healthcare Pro system would significantly enhance our facility's operational efficiency and patient care quality.

About Our Facility:
- Healthcare management platform: Healthcare Pro
- Primary focus: Comprehensive patient care and operational excellence
- Integration goals: Streamlined workflows and enhanced data sharing

We would be very interested in exploring the possibility of developing an integration between ${provider.name} and Healthcare Pro. This partnership would benefit both our organizations by:

1. Providing our facility with enhanced ${provider.category.toLowerCase()} capabilities
2. Expanding ${provider.name}'s market reach through Healthcare Pro's user base
3. Creating a seamless workflow for healthcare professionals

${formData.customNotes ? `\nAdditional Notes:\n${formData.customNotes}` : ''}

We would welcome the opportunity to discuss this integration possibility further. Please let us know if you would be interested in scheduling a call to explore how we might work together.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,

${formData.contactName}
${formData.facilityName}
Email: ${formData.contactEmail}
${formData.contactPhone ? `Phone: ${formData.contactPhone}` : ''}

Healthcare Pro Integration Marketplace
https://healthcarepro.lovable.app`;
  };

  const handleSubmit = async () => {
    if (!provider || !user) return;

    setIsSubmitting(true);
    try {
      const message = generateMessage();
      
      const { error } = await supabase
        .from('integration_requests')
        .insert({
          provider_id: provider.id,
          requested_by: user.id,
          facility_name: formData.facilityName,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          message_content: message,
          custom_notes: formData.customNotes,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Integration Request Submitted",
        description: `Your request to integrate with ${provider.name} has been recorded. You can copy the generated message and send it to their team.`,
      });

      onClose();
    } catch (error) {
      console.error('Error submitting integration request:', error);
      toast({
        title: "Error",
        description: "Failed to submit integration request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    const message = generateMessage();
    navigator.clipboard.writeText(message);
    toast({
      title: "Message Copied",
      description: "The integration request message has been copied to your clipboard.",
    });
  };

  if (!provider) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Integration with {provider.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="facilityName">Facility Name</Label>
              <Input
                id="facilityName"
                value={formData.facilityName}
                onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="contactName">Your Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="contactEmail">Your Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="contactPhone">Phone Number (Optional)</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="customNotes">Additional Notes (Optional)</Label>
              <Textarea
                id="customNotes"
                value={formData.customNotes}
                onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                placeholder="Any specific integration requirements or additional information..."
                rows={3}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <div>
              <Label>Generated Message Preview</Label>
              <Card>
                <CardContent className="p-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono text-gray-700 max-h-96 overflow-y-auto">
                    {generateMessage()}
                  </pre>
                </CardContent>
              </Card>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Message
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.contactName || !formData.contactEmail}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>

            {provider.contact_email && (
              <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded-lg">
                <strong>Tip:</strong> After copying the message, you can send it directly to{' '}
                <a 
                  href={`mailto:${provider.contact_email}`}
                  className="text-blue-600 hover:underline"
                >
                  {provider.contact_email}
                </a>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationRequestDialog;
