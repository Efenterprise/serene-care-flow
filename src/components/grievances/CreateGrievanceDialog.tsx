
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface CreateGrievanceDialogProps {
  onClose: () => void;
}

const CreateGrievanceDialog = ({ onClose }: CreateGrievanceDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    priority: 'medium',
    description: '',
    complainant_name: '',
    complainant_relationship: '',
    complainant_phone: '',
    complainant_email: '',
    is_anonymous: false,
    resident_id: '',
    date_occurred: '',
    location: '',
    witnesses: '',
    regulatory_reportable: false
  });

  const categories = [
    { value: 'Clinical Care', subcategories: ['Medication Management', 'Nursing Care', 'Medical Treatment', 'Care Planning'] },
    { value: 'Staff Conduct', subcategories: ['Unprofessional Behavior', 'Communication Issues', 'Neglect', 'Abuse'] },
    { value: 'Food Service', subcategories: ['Quality', 'Temperature', 'Special Diets', 'Service'] },
    { value: 'Facility Conditions', subcategories: ['Cleanliness', 'Safety', 'Maintenance', 'Environment'] },
    { value: 'Billing', subcategories: ['Charges', 'Insurance', 'Payment Issues', 'Billing Errors'] },
    { value: 'Administration', subcategories: ['Policies', 'Procedures', 'Communication', 'Access'] },
    { value: 'Other', subcategories: ['General Complaint', 'Suggestion', 'Compliment'] }
  ];

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would normally submit to Supabase
    console.log('Creating grievance:', formData);
    
    // Reset form and close dialog
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Report New Grievance
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              
              <div>
                <Label htmlFor="title">Grievance Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.value}</option>
                  ))}
                </select>
              </div>

              {selectedCategory && (
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <select
                    id="subcategory"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    value={formData.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  >
                    <option value="">Select Subcategory</option>
                    {selectedCategory.subcategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <Label htmlFor="priority">Priority Level *</Label>
                <select
                  id="priority"
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <Label htmlFor="date_occurred">Date Occurred</Label>
                <Input
                  id="date_occurred"
                  type="date"
                  value={formData.date_occurred}
                  onChange={(e) => handleInputChange('date_occurred', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Where did this occur?"
                />
              </div>
            </div>

            {/* Complainant Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Complainant Information</h3>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_anonymous"
                  checked={formData.is_anonymous}
                  onCheckedChange={(checked) => handleInputChange('is_anonymous', checked as boolean)}
                />
                <Label htmlFor="is_anonymous">Submit anonymously</Label>
              </div>

              {!formData.is_anonymous && (
                <>
                  <div>
                    <Label htmlFor="complainant_name">Name *</Label>
                    <Input
                      id="complainant_name"
                      value={formData.complainant_name}
                      onChange={(e) => handleInputChange('complainant_name', e.target.value)}
                      required={!formData.is_anonymous}
                    />
                  </div>

                  <div>
                    <Label htmlFor="complainant_relationship">Relationship to Resident</Label>
                    <select
                      id="complainant_relationship"
                      className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                      value={formData.complainant_relationship}
                      onChange={(e) => handleInputChange('complainant_relationship', e.target.value)}
                    >
                      <option value="">Select Relationship</option>
                      <option value="Resident">Resident</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Adult Child</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other Family">Other Family Member</option>
                      <option value="Friend">Friend</option>
                      <option value="Legal Representative">Legal Representative</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="complainant_phone">Phone Number</Label>
                    <Input
                      id="complainant_phone"
                      type="tel"
                      value={formData.complainant_phone}
                      onChange={(e) => handleInputChange('complainant_phone', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="complainant_email">Email Address</Label>
                    <Input
                      id="complainant_email"
                      type="email"
                      value={formData.complainant_email}
                      onChange={(e) => handleInputChange('complainant_email', e.target.value)}
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="resident_id">Related Resident</Label>
                <select
                  id="resident_id"
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                  value={formData.resident_id}
                  onChange={(e) => handleInputChange('resident_id', e.target.value)}
                >
                  <option value="">Select Resident (if applicable)</option>
                  <option value="1">Johnson, Mary - Room 105</option>
                  <option value="2">Smith, Robert - Room 203</option>
                  <option value="3">Davis, Helen - Room 308</option>
                </select>
              </div>

              <div>
                <Label htmlFor="witnesses">Witnesses</Label>
                <Textarea
                  id="witnesses"
                  value={formData.witnesses}
                  onChange={(e) => handleInputChange('witnesses', e.target.value)}
                  placeholder="Names of any witnesses to the incident"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="regulatory_reportable"
                  checked={formData.regulatory_reportable}
                  onCheckedChange={(checked) => handleInputChange('regulatory_reportable', checked as boolean)}
                />
                <Label htmlFor="regulatory_reportable">Requires regulatory reporting</Label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please provide a detailed description of the grievance, including what happened, when, and any other relevant information."
              rows={6}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Grievance
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGrievanceDialog;
