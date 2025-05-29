
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Calendar, User } from 'lucide-react';
import { useResidents } from '@/hooks/useResidents';
import { toast } from 'sonner';

interface CreateUdaDialogProps {
  onClose: () => void;
}

const CreateUdaDialog = ({ onClose }: CreateUdaDialogProps) => {
  const { data: residents } = useResidents();
  
  const [formData, setFormData] = useState({
    resident_id: '',
    assessment_type: '',
    schedule_type: '',
    priority: 'medium',
    due_date: '',
    assigned_to: '',
    notes: '',
    recurring: false,
    frequency: ''
  });

  const assessmentTypes = [
    'MDS 3.0 Quarterly Assessment',
    'MDS 3.0 Annual Assessment',
    'MDS 3.0 Significant Change',
    'MDS 3.0 Discharge Assessment',
    'Skin Observation Tool',
    'Nutrition Evaluation',
    'Fall Risk Assessment',
    'Care Area Assessment - ADL',
    'Care Area Assessment - Behavioral',
    'Care Area Assessment - Cognitive',
    'Braden Scale Assessment',
    'Pain Assessment',
    'Social Services Assessment'
  ];

  const scheduleTypes = [
    'Admission',
    'Quarterly',
    'Annual',
    'Significant Change',
    'Discharge',
    'Weekly',
    'Monthly',
    'As Needed'
  ];

  const staffMembers = [
    'Sarah Wilson, RN',
    'Mike Chen, LPN',
    'Lisa Rodriguez, RD',
    'Jennifer Park, RN',
    'David Martinez, MSW',
    'Amy Thompson, OTR'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resident_id || !formData.assessment_type || !formData.due_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your API
    console.log('Creating UDA schedule:', formData);
    toast.success('Assessment scheduled successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Schedule New Assessment</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resident">Resident *</Label>
              <Select
                value={formData.resident_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, resident_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resident" />
                </SelectTrigger>
                <SelectContent>
                  {residents?.map((resident) => (
                    <SelectItem key={resident.id} value={resident.id}>
                      {resident.first_name} {resident.last_name} - Room {resident.room_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessment_type">Assessment Type *</Label>
            <Select
              value={formData.assessment_type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, assessment_type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent>
                {assessmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schedule_type">Schedule Type</Label>
              <Select
                value={formData.schedule_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, schedule_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule type" />
                </SelectTrigger>
                <SelectContent>
                  {scheduleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date *</Label>
              <div className="relative">
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assigned_to">Assigned To</Label>
            <Select
              value={formData.assigned_to}
              onValueChange={(value) => setFormData(prev => ({ ...prev, assigned_to: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                {staffMembers.map((staff) => (
                  <SelectItem key={staff} value={staff}>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {staff}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes or special instructions"
              rows={3}
            />
          </div>

          {/* Recurring Options */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.recurring}
                onChange={(e) => setFormData(prev => ({ ...prev, recurring: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <Label htmlFor="recurring">Recurring Assessment</Label>
            </div>

            {formData.recurring && (
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Schedule Assessment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUdaDialog;
