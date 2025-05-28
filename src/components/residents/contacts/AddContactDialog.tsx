
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateContact, ContactType } from "@/hooks/useContacts";
import { Resident } from "@/hooks/useResidents";
import { toast } from "sonner";

interface AddContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resident: Resident;
  contactTypes: ContactType[];
}

const AddContactDialog = ({ isOpen, onClose, resident, contactTypes }: AddContactDialogProps) => {
  const [formData, setFormData] = useState({
    contact_type_id: "",
    first_name: "",
    last_name: "",
    relationship: "",
    priority_level: 1,
    phone_primary: "",
    phone_secondary: "",
    email: "",
    preferred_contact_method: "phone",
    preferred_contact_time: "",
    is_emergency_contact: false,
    is_authorized_to_receive_info: false,
    notes: "",
  });

  const createContact = useCreateContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createContact.mutateAsync({
        ...formData,
        resident_id: resident.id,
        is_active: true,
      });
      
      toast.success("Contact added successfully");
      onClose();
      setFormData({
        contact_type_id: "",
        first_name: "",
        last_name: "",
        relationship: "",
        priority_level: 1,
        phone_primary: "",
        phone_secondary: "",
        email: "",
        preferred_contact_method: "phone",
        preferred_contact_time: "",
        is_emergency_contact: false,
        is_authorized_to_receive_info: false,
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to add contact");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Contact for {resident.first_name} {resident.last_name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_type">Contact Type *</Label>
              <Select
                value={formData.contact_type_id}
                onValueChange={(value) => setFormData({ ...formData, contact_type_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact type" />
                </SelectTrigger>
                <SelectContent>
                  {contactTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} ({type.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority_level">Priority Level</Label>
              <Select
                value={formData.priority_level.toString()}
                onValueChange={(value) => setFormData({ ...formData, priority_level: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Primary (1)</SelectItem>
                  <SelectItem value="2">Secondary (2)</SelectItem>
                  <SelectItem value="3">Tertiary (3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="relationship">Relationship</Label>
            <Input
              id="relationship"
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              placeholder="e.g., Son, Daughter, Attorney, etc."
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone_primary">Primary Phone</Label>
              <Input
                id="phone_primary"
                type="tel"
                value={formData.phone_primary}
                onChange={(e) => setFormData({ ...formData, phone_primary: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="phone_secondary">Secondary Phone</Label>
              <Input
                id="phone_secondary"
                type="tel"
                value={formData.phone_secondary}
                onChange={(e) => setFormData({ ...formData, phone_secondary: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@example.com"
            />
          </div>

          {/* Communication Preferences */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferred_contact_method">Preferred Contact Method</Label>
              <Select
                value={formData.preferred_contact_method}
                onValueChange={(value) => setFormData({ ...formData, preferred_contact_method: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS/Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="preferred_contact_time">Preferred Contact Time</Label>
              <Select
                value={formData.preferred_contact_time}
                onValueChange={(value) => setFormData({ ...formData, preferred_contact_time: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                  <SelectItem value="anytime">Anytime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_emergency_contact"
                checked={formData.is_emergency_contact}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, is_emergency_contact: checked as boolean })
                }
              />
              <Label htmlFor="is_emergency_contact">Emergency Contact</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_authorized_to_receive_info"
                checked={formData.is_authorized_to_receive_info}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, is_authorized_to_receive_info: checked as boolean })
                }
              />
              <Label htmlFor="is_authorized_to_receive_info">Authorized to Receive Information</Label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes about this contact..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createContact.isPending}>
              {createContact.isPending ? "Adding..." : "Add Contact"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;
