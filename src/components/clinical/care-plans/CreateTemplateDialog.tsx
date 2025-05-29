
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { X, Plus, Target, TrendingUp, Save } from 'lucide-react';

interface CreateTemplateDialogProps {
  onClose: () => void;
}

const CreateTemplateDialog = ({ onClose }: CreateTemplateDialogProps) => {
  const { toast } = useToast();
  const [template, setTemplate] = useState({
    name: '',
    category: '',
    description: '',
    difficulty: '',
    estimatedDuration: '',
    problems: [''],
    interventions: [''],
    outcomes: ['']
  });

  const categories = [
    { value: 'mobility', label: 'Mobility & Rehabilitation' },
    { value: 'safety', label: 'Safety & Fall Prevention' },
    { value: 'nutrition', label: 'Nutrition & Hydration' },
    { value: 'pain', label: 'Pain Management' },
    { value: 'cognitive', label: 'Cognitive Support' },
    { value: 'social', label: 'Social & Emotional' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const addItem = (field: 'problems' | 'interventions' | 'outcomes') => {
    setTemplate(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateItem = (field: 'problems' | 'interventions' | 'outcomes', index: number, value: string) => {
    setTemplate(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeItem = (field: 'problems' | 'interventions' | 'outcomes', index: number) => {
    setTemplate(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty strings
    const cleanedTemplate = {
      ...template,
      problems: template.problems.filter(p => p.trim() !== ''),
      interventions: template.interventions.filter(i => i.trim() !== ''),
      outcomes: template.outcomes.filter(o => o.trim() !== '')
    };

    console.log('Creating template:', cleanedTemplate);
    
    toast({
      title: "Template Created",
      description: "Care plan template has been created successfully.",
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Create Care Plan Template</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      value={template.name}
                      onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                      placeholder="e.g., Fall Risk Prevention"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={template.category} onValueChange={(value) => setTemplate({ ...template, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={template.description}
                    onChange={(e) => setTemplate({ ...template, description: e.target.value })}
                    placeholder="Brief description of the care plan template"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={template.difficulty} onValueChange={(value) => setTemplate({ ...template, difficulty: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty.value} value={difficulty.value}>
                            {difficulty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Estimated Duration</Label>
                    <Input
                      id="duration"
                      value={template.estimatedDuration}
                      onChange={(e) => setTemplate({ ...template, estimatedDuration: e.target.value })}
                      placeholder="e.g., 4-6 weeks, Ongoing"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Target Problems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {template.problems.map((problem, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={problem}
                      onChange={(e) => updateItem('problems', index, e.target.value)}
                      placeholder="e.g., Risk for Falls"
                    />
                    {template.problems.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeItem('problems', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => addItem('problems')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Problem
                </Button>
              </CardContent>
            </Card>

            {/* Interventions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interventions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {template.interventions.map((intervention, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Textarea
                      value={intervention}
                      onChange={(e) => updateItem('interventions', index, e.target.value)}
                      placeholder="e.g., Maintain bed in low position with side rails up"
                      rows={2}
                    />
                    {template.interventions.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeItem('interventions', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => addItem('interventions')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Intervention
                </Button>
              </CardContent>
            </Card>

            {/* Expected Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Expected Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {template.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={outcome}
                      onChange={(e) => updateItem('outcomes', index, e.target.value)}
                      placeholder="e.g., Zero falls in 90 days"
                    />
                    {template.outcomes.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeItem('outcomes', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => addItem('outcomes')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Outcome
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>

        <div className="flex justify-end space-x-2 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplateDialog;
