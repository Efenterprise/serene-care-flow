
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Clock } from "lucide-react";

interface CreateIncidentDialogProps {
  onClose: () => void;
}

const CreateIncidentDialog = ({ onClose }: CreateIncidentDialogProps) => {
  const [formData, setFormData] = useState({
    type: '',
    severity: '',
    residentName: '',
    roomNumber: '',
    location: '',
    description: '',
    immediateActions: [] as string[],
    followUpRequired: false
  });

  const incidentTypes = [
    { value: 'fall', label: 'Fall' },
    { value: 'medication_error', label: 'Medication Error' },
    { value: 'behavioral', label: 'Behavioral Incident' },
    { value: 'injury', label: 'Injury' },
    { value: 'elopement', label: 'Elopement' },
    { value: 'other', label: 'Other' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const commonActions = [
    'Vitals assessed',
    'Physician notified',
    'Family contacted',
    'Incident report filed',
    'First aid administered',
    'Area secured',
    'Supervisor notified',
    'Resident comforted'
  ];

  const residents = [
    'Anderson, Patricia (Room 105)',
    'Thompson, James (Room 203)',
    'Wilson, Margaret (Room 308)',
    'Garcia, Carlos (Room 112)',
    'Johnson, Mary (Room 205)',
    'Smith, Robert (Room 110)'
  ];

  const handleActionToggle = (action: string) => {
    setFormData(prev => ({
      ...prev,
      immediateActions: prev.immediateActions.includes(action)
        ? prev.immediateActions.filter(a => a !== action)
        : [...prev.immediateActions, action]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating incident:', formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Report New Incident</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Incident Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level</Label>
              <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resident">Resident</Label>
              <Select value={formData.residentName} onValueChange={(value) => setFormData({...formData, residentName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resident" />
                </SelectTrigger>
                <SelectContent>
                  {residents.map((resident) => (
                    <SelectItem key={resident} value={resident}>
                      {resident}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Bathroom, Dining Room, Hallway"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Incident Description</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of what happened..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
            />
          </div>

          <div className="space-y-3">
            <Label>Immediate Actions Taken</Label>
            <div className="grid grid-cols-2 gap-2">
              {commonActions.map((action) => (
                <div key={action} className="flex items-center space-x-2">
                  <Checkbox
                    id={action}
                    checked={formData.immediateActions.includes(action)}
                    onCheckedChange={() => handleActionToggle(action)}
                  />
                  <Label htmlFor={action} className="text-sm">{action}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUp"
              checked={formData.followUpRequired}
              onCheckedChange={(checked) => setFormData({...formData, followUpRequired: !!checked})}
            />
            <Label htmlFor="followUp">Follow-up required</Label>
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Clock className="w-4 h-4 mr-2" />
              Report Incident
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIncidentDialog;
