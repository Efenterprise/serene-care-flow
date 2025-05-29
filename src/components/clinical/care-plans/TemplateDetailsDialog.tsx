
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Target, 
  TrendingUp, 
  Copy, 
  Edit, 
  Star,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

interface TemplateDetailsDialogProps {
  template: any;
  onClose: () => void;
}

const TemplateDetailsDialog = ({ template, onClose }: TemplateDetailsDialogProps) => {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">{template.name}</h2>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getCategoryColor(template.category)}>
                {template.category}
              </Badge>
              <Badge className={getDifficultyColor(template.difficulty)}>
                {template.difficulty}
              </Badge>
              {template.isStandard && (
                <Badge variant="outline">
                  <Star className="w-3 h-3 mr-1" />
                  Standard Template
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Copy className="w-4 h-4 mr-2" />
              Use Template
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* Description and Stats */}
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">{template.description}</p>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{template.interventions}</div>
                  <div className="text-sm text-gray-600">Interventions</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{template.usageCount}</div>
                  <div className="text-sm text-gray-600">Times Used</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{template.estimatedDuration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto text-orange-600 mb-1" />
                  <div className="text-sm text-gray-600">Last Used</div>
                  <div className="text-sm font-medium">{template.lastUsed}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Problems */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Target Problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {template.problems.map((problem: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Target className="w-4 h-4 mr-3 text-blue-600" />
                    <span className="font-medium text-gray-900">{problem}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sample Interventions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Sample Interventions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Mock interventions based on template type */}
                {template.category === 'safety' && (
                  <>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">Environmental Safety Assessment</div>
                      <div className="text-sm text-gray-600 mt-1">Conduct comprehensive room and pathway assessment for hazards</div>
                      <div className="text-xs text-gray-500 mt-1">Frequency: Daily | Priority: High</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">Bed and Chair Alarm System</div>
                      <div className="text-sm text-gray-600 mt-1">Activate bed/chair alarms for high-risk residents</div>
                      <div className="text-xs text-gray-500 mt-1">Frequency: Continuous | Priority: High</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">Non-slip Footwear</div>
                      <div className="text-sm text-gray-600 mt-1">Ensure appropriate footwear with good traction</div>
                      <div className="text-xs text-gray-500 mt-1">Frequency: Daily | Priority: Medium</div>
                    </div>
                  </>
                )}
                
                {template.category === 'mobility' && (
                  <>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">Physical Therapy Assessment</div>
                      <div className="text-sm text-gray-600 mt-1">Initial PT evaluation and goal setting</div>
                      <div className="text-xs text-gray-500 mt-1">Frequency: Initial, then weekly | Priority: High</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">Progressive Mobility Training</div>
                      <div className="text-sm text-gray-600 mt-1">Structured ambulation and strengthening exercises</div>
                      <div className="text-xs text-gray-500 mt-1">Frequency: BID | Priority: High</div>
                    </div>
                  </>
                )}

                {template.category === 'nutrition' && (
                  <>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">Nutritional Assessment</div>
                      <div className="text-sm text-gray-600 mt-1">Comprehensive evaluation by registered dietitian</div>
                      <div className="text-xs text-gray-500 mt-1">Frequency: Initial, then monthly | Priority: High</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">Daily Weight Monitoring</div>
                      <div className="text-sm text-gray-600 mt-1">Track weight trends and nutritional progress</div>
                      <div className="text-xs text-gray-500 mt-1">Frequency: Daily | Priority: Medium</div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Expected Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Expected Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {template.outcomes.map((outcome: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 mr-3 text-green-600" />
                    <span className="font-medium text-gray-900">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailsDialog;
