
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Star, 
  Copy, 
  Edit, 
  Trash2, 
  Eye,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

interface CarePlanTemplatesProps {
  searchTerm: string;
  selectedCategory: string;
  onViewTemplate: (template: any) => void;
}

const CarePlanTemplates = ({ searchTerm, selectedCategory, onViewTemplate }: CarePlanTemplatesProps) => {
  const [templates] = useState([
    {
      id: 1,
      name: "Fall Risk Prevention",
      category: "safety",
      description: "Comprehensive fall prevention strategies for high-risk residents",
      problems: ["Risk for Falls", "Impaired Physical Mobility"],
      interventions: 8,
      estimatedDuration: "Ongoing",
      usageCount: 45,
      lastUsed: "2024-01-20",
      isStandard: true,
      difficulty: "Intermediate",
      outcomes: ["Zero falls in 90 days", "Improved mobility confidence"]
    },
    {
      id: 2,
      name: "Post-Hip Replacement Rehabilitation",
      category: "mobility",
      description: "Evidence-based care plan for post-surgical hip replacement recovery",
      problems: ["Impaired Physical Mobility", "Acute Pain", "Knowledge Deficit"],
      interventions: 12,
      estimatedDuration: "4-6 weeks",
      usageCount: 32,
      lastUsed: "2024-01-19",
      isStandard: true,
      difficulty: "Advanced",
      outcomes: ["Independent ambulation", "Pain control", "Return to baseline function"]
    },
    {
      id: 3,
      name: "Nutrition Support for Weight Loss",
      category: "nutrition",
      description: "Structured nutrition plan for residents with unintended weight loss",
      problems: ["Altered Nutrition: Less than Body Requirements", "Risk for Deficient Fluid Volume"],
      interventions: 6,
      estimatedDuration: "8-12 weeks",
      usageCount: 28,
      lastUsed: "2024-01-18",
      isStandard: true,
      difficulty: "Beginner",
      outcomes: ["Weight stabilization", "Improved nutritional status"]
    },
    {
      id: 4,
      name: "Chronic Pain Management",
      category: "pain",
      description: "Multi-modal approach to chronic pain management",
      problems: ["Chronic Pain", "Sleep Pattern Disturbance", "Activity Intolerance"],
      interventions: 10,
      estimatedDuration: "Ongoing",
      usageCount: 22,
      lastUsed: "2024-01-17",
      isStandard: true,
      difficulty: "Advanced",
      outcomes: ["Pain reduction to tolerable levels", "Improved sleep quality"]
    },
    {
      id: 5,
      name: "Cognitive Stimulation Program",
      category: "cognitive",
      description: "Activities and interventions to maintain cognitive function",
      problems: ["Impaired Memory", "Social Isolation", "Risk for Depression"],
      interventions: 7,
      estimatedDuration: "Ongoing",
      usageCount: 18,
      lastUsed: "2024-01-16",
      isStandard: true,
      difficulty: "Intermediate",
      outcomes: ["Maintained cognitive function", "Increased social engagement"]
    },
    {
      id: 6,
      name: "Diabetes Management",
      category: "nutrition",
      description: "Comprehensive diabetes care including diet, medication, and monitoring",
      problems: ["Unstable Blood Glucose Level", "Knowledge Deficit", "Risk for Infection"],
      interventions: 9,
      estimatedDuration: "Ongoing",
      usageCount: 35,
      lastUsed: "2024-01-21",
      isStandard: true,
      difficulty: "Advanced",
      outcomes: ["Stable glucose levels", "Prevention of complications"]
    }
  ]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.problems.some(problem => problem.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mobility':
        return 'bg-blue-100 text-blue-800';
      case 'safety':
        return 'bg-red-100 text-red-800';
      case 'nutrition':
        return 'bg-green-100 text-green-800';
      case 'pain':
        return 'bg-purple-100 text-purple-800';
      case 'cognitive':
        return 'bg-orange-100 text-orange-800';
      case 'social':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTemplates.map((template) => (
        <Card key={template.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                  <Badge className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                  {template.isStandard && (
                    <Badge variant="outline">
                      <Star className="w-3 h-3 mr-1" />
                      Standard
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{template.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Problems */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Target Problems:</h4>
              <div className="space-y-1">
                {template.problems.slice(0, 2).map((problem, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <Target className="w-3 h-3 mr-2 text-blue-500" />
                    {problem}
                  </div>
                ))}
                {template.problems.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{template.problems.length - 2} more problems
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium text-gray-900">{template.interventions}</div>
                <div className="text-gray-600">Interventions</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium text-gray-900">{template.usageCount}</div>
                <div className="text-gray-600">Times Used</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium text-gray-900">{template.estimatedDuration}</div>
                <div className="text-gray-600">Duration</div>
              </div>
            </div>

            {/* Expected Outcomes */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Expected Outcomes:</h4>
              <div className="space-y-1">
                {template.outcomes.slice(0, 2).map((outcome, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-3 h-3 mr-2 text-green-500" />
                    {outcome}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                Last used: {template.lastUsed}
              </div>
              <div className="flex space-x-1">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onViewTemplate(template)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarePlanTemplates;
