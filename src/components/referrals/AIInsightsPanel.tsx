
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  Target,
  DollarSign,
  Clock,
  Users
} from "lucide-react";
import { useReferrals } from "@/hooks/useReferrals";

interface AIInsightsPanelProps {
  expanded?: boolean;
}

const AIInsightsPanel = ({ expanded = false }: AIInsightsPanelProps) => {
  const { data: referrals } = useReferrals();

  // AI-generated insights (in production, these would come from ML models)
  const insights = [
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "Revenue Opportunity",
      description: "3 high-value referrals pending approval could generate $15K additional revenue",
      action: "Review high-score referrals",
      priority: "high",
      confidence: 92
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Capacity Alert",
      description: "Skilled nursing beds at 95% capacity. Consider discharge planning",
      action: "Review discharge candidates",
      priority: "urgent",
      confidence: 88
    },
    {
      type: "optimization",
      icon: Target,
      title: "Process Optimization",
      description: "Reduce avg processing time by 30% by prioritizing Medicare Advantage referrals",
      action: "Adjust workflow",
      priority: "medium",
      confidence: 85
    },
    {
      type: "prediction",
      icon: Brain,
      title: "Admission Prediction",
      description: "87% likelihood of 5 new admissions this week based on referral patterns",
      action: "Prepare bed assignments",
      priority: "medium",
      confidence: 87
    }
  ];

  const recommendations = [
    {
      title: "Focus on High-Score Referrals",
      description: "Prioritize referrals with AI scores >85 for faster approval",
      impact: "25% faster processing"
    },
    {
      title: "Insurance Pre-verification",
      description: "Implement automated insurance checking for Medicare referrals",
      impact: "40% reduction in denials"
    },
    {
      title: "Weekend Processing",
      description: "Extend review hours for urgent referrals on weekends",
      impact: "15% faster admissions"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return DollarSign;
      case "alert":
        return AlertTriangle;
      case "optimization":
        return Target;
      case "prediction":
        return Brain;
      default:
        return Lightbulb;
    }
  };

  return (
    <div className={`space-y-4 ${expanded ? '' : 'max-h-[600px] overflow-y-auto'}`}>
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>AI Insights</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = getTypeIcon(insight.type);
            return (
              <div key={index} className="p-4 border rounded-lg bg-gray-50/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-sm">{insight.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                    <span className="text-xs text-gray-500">{insight.confidence}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  {insight.action}
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {expanded && (
        <Card className="border-0 shadow-sm bg-white/70">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <span>AI Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50/50">
                <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {rec.impact}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {expanded && (
        <Card className="border-0 shadow-sm bg-white/70">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">94%</div>
                <div className="text-xs text-gray-600">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2.1h</div>
                <div className="text-xs text-gray-600">Avg Processing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-xs text-gray-600">Conversion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">$2.3M</div>
                <div className="text-xs text-gray-600">Monthly Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIInsightsPanel;
