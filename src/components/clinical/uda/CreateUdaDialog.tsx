
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, Clock, User } from "lucide-react";
import { format } from "date-fns";

interface CreateUdaDialogProps {
  onClose: () => void;
  selectedFacility: string;
}

const CreateUdaDialog = ({ onClose, selectedFacility }: CreateUdaDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    residentName: '',
    assessmentType: '',
    assignedTo: '',
    priority: '',
    notes: ''
  });

  // Mock residents based on selected facility
  const getResidents = () => {
    if (selectedFacility === 'all') {
      return [
        'Anderson, Patricia (Room 105)',
        'Thompson, James (Room 203)', 
        'Wilson, Margaret (Room 308)',
        'Garcia, Carlos (Room 112)',
        'Johnson, Mary (Room 205)',
        'Smith, Robert (Room 110)',
        'Davis, Helen (Room 308)'
      ];
    } else {
      // Return residents for specific facility
      return [
        'Anderson, Patricia (Room 105)',
        'Thompson, James (Room 203)',
        'Johnson, Mary (Room 205)',
        'Smith, Robert (Room 110)'
      ];
    }
  };

  const assessmentTypes = [
    'MDS 3.0 Quarterly Assessment',
    'MDS 3.0 Annual Assessment',
    'Care Area Assessment - Falls',
    'Care Area Assessment - ADL',
    'Skin Observation Assessment',
    'Nutrition Evaluation',
    'Fall Risk Assessment',
    'Cognitive Assessment',
    'Pain Assessment'
  ];

  const assignedStaff = [
    'Sarah Wilson, RN',
    'Mike Chen, LPN',
    'Lisa Rodriguez, RD',
    'Jennifer Park, RN',
    'David Thompson, RN',
    'Maria Santos, LPN'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating UDA assessment:', {
      ...formData,
      scheduledDate: selectedDate,
      facility: selectedFacility
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Schedule New UDA Assessment</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resident">Resident</Label>
              <Select value={formData.residentName} onValueChange={(value) => setFormData({...formData, residentName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resident" />
                </SelectTrigger>
                <SelectContent>
                  {getResidents().map((resident) => (
                    <SelectItem key={resident} value={resident}>
                      {resident}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assessmentType">Assessment Type</Label>
              <Select value={formData.assessmentType} onValueChange={(value) => setFormData({...formData, assessmentType: value})}>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select value={formData.assignedTo} onValueChange={(value) => setFormData({...formData, assignedTo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {assignedStaff.map((staff) => (
                    <SelectItem key={staff} value={staff}>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{staff}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Scheduled Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any special instructions or notes..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
            />
          </div>

          {selectedFacility !== 'all' && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Facility:</strong> {selectedFacility === 'facility-1' ? 'Sunnydale Care Center' : 
                                           selectedFacility === 'facility-2' ? 'Riverside Manor' : 
                                           'Selected Facility'}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Clock className="w-4 h-4 mr-2" />
              Schedule Assessment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUdaDialog;
