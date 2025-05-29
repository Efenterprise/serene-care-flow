
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';
import { useUpdateCarePlan, CarePlan, UpdateCarePlanData } from '@/hooks/useCarePlans';
import { toast } from 'sonner';

interface EditCarePlanDialogProps {
  carePlan: CarePlan;
  onClose: () => void;
}

const EditCarePlanDialog = ({ carePlan, onClose }: EditCarePlanDialogProps) => {
  const updateCarePlan = useUpdateCarePlan();

  const [formData, setFormData] = useState<UpdateCarePlanData>({
    id: carePlan.id,
    problem: carePlan.problem,
    goal: carePlan.goal,
    target_date: carePlan.target_date || '',
    priority: carePlan.priority,
    status: carePlan.status,
    progress: carePlan.progress,
    assigned_to: carePlan.assigned_to || '',
    notes: carePlan.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.problem || !formData.goal) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await updateCarePlan.mutateAsync(formData);
      toast.success('Care plan updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update care plan');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-600';
      case 'met':
        return 'text-green-600';
      case 'discontinued':
        return 'text-red-600';
      case 'on_hold':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Care Plan</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setFormData(prev => ({ ...prev, priority: value }))
                }
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

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'met' | 'discontinued' | 'on_hold') => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <span className={getStatusColor('active')}>Active</span>
                  </SelectItem>
                  <SelectItem value="met">
                    <span className={getStatusColor('met')}>Met</span>
                  </SelectItem>
                  <SelectItem value="on_hold">
                    <span className={getStatusColor('on_hold')}>On Hold</span>
                  </SelectItem>
                  <SelectItem value="discontinued">
                    <span className={getStatusColor('discontinued')}>Discontinued</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem">Problem/Focus Area *</Label>
            <Input
              id="problem"
              value={formData.problem}
              onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal *</Label>
            <Textarea
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress">Progress: {formData.progress}%</Label>
            <Slider
              value={[formData.progress || 0]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, progress: value[0] }))}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target_date">Target Date</Label>
              <Input
                id="target_date"
                type="date"
                value={formData.target_date}
                onChange={(e) => setFormData(prev => ({ ...prev, target_date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assigned_to">Assigned To</Label>
              <Input
                id="assigned_to"
                value={formData.assigned_to}
                onChange={(e) => setFormData(prev => ({ ...prev, assigned_to: e.target.value }))}
                placeholder="e.g., Lisa Chen, PT"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes or considerations"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateCarePlan.isPending}>
              {updateCarePlan.isPending ? 'Updating...' : 'Update Care Plan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarePlanDialog;
