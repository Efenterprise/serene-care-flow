
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Trash2 } from 'lucide-react';
import { useCreateCarePlan, CreateCarePlanData } from '@/hooks/useCarePlans';
import { useResidents } from '@/hooks/useResidents';
import { toast } from 'sonner';

interface CreateCarePlanDialogProps {
  onClose: () => void;
  residentId?: string;
}

const CreateCarePlanDialog = ({ onClose, residentId }: CreateCarePlanDialogProps) => {
  const { data: residents } = useResidents();
  const createCarePlan = useCreateCarePlan();

  const [formData, setFormData] = useState<CreateCarePlanData>({
    resident_id: residentId || '',
    problem: '',
    goal: '',
    target_date: '',
    priority: 'medium',
    assigned_to: '',
    notes: '',
    interventions: [''],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resident_id || !formData.problem || !formData.goal) {
      toast.error('Please fill in all required fields');
      return;
    }

    const filteredInterventions = formData.interventions.filter(i => i.trim() !== '');

    try {
      await createCarePlan.mutateAsync({
        ...formData,
        interventions: filteredInterventions,
      });
      toast.success('Care plan created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create care plan');
    }
  };

  const addIntervention = () => {
    setFormData(prev => ({
      ...prev,
      interventions: [...prev.interventions, ''],
    }));
  };

  const removeIntervention = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interventions: prev.interventions.filter((_, i) => i !== index),
    }));
  };

  const updateIntervention = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      interventions: prev.interventions.map((intervention, i) => 
        i === index ? value : intervention
      ),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Create New Care Plan</h2>
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
                disabled={!!residentId}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem">Problem/Focus Area *</Label>
            <Input
              id="problem"
              value={formData.problem}
              onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
              placeholder="e.g., Impaired Physical Mobility"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal *</Label>
            <Textarea
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
              placeholder="e.g., Resident will ambulate 100 feet with minimal assistance within 30 days"
              required
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Interventions</Label>
              <Button type="button" variant="outline" size="sm" onClick={addIntervention}>
                <Plus className="w-4 h-4 mr-2" />
                Add Intervention
              </Button>
            </div>
            
            {formData.interventions.map((intervention, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={intervention}
                  onChange={(e) => updateIntervention(index, e.target.value)}
                  placeholder="e.g., Physical therapy 3x weekly"
                  className="flex-1"
                />
                {formData.interventions.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeIntervention(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
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
            <Button type="submit" disabled={createCarePlan.isPending}>
              {createCarePlan.isPending ? 'Creating...' : 'Create Care Plan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCarePlanDialog;
