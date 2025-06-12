
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  AlertTriangle, 
  FileText, 
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  Activity,
  Plus
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ClinicalOverview = () => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleNavigateToTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const clinicalAreas = [
    {
      title: "Care Plans",
      description: "Manage resident care plans and goals",
      icon: Target,
      stats: { active: 42, total: 65, urgent: 3 },
      color: "blue",
      action: () => handleNavigateToTab('care-plans')
    },
    {
      title: "Incident Management",
      description: "Track and resolve safety incidents",
      icon: AlertTriangle,
      stats: { active: 5, total: 23, urgent: 2 },
      color: "red",
      action: () => handleNavigateToTab('incidents')
    },
    {
      title: "Grievances",
      description: "Handle resident and family grievances",
      icon: FileText,
      stats: { active: 3, total: 12, urgent: 1 },
      color: "orange",
      action: () => handleNavigateToTab('grievances')
    },
    {
      title: "UDA Management",
      description: "Manage UDA assessments and scheduling",
      icon: Users,
      stats: { active: 8, total: 28, urgent: 0 },
      color: "green",
      action: () => handleNavigateToTab('uda')
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'text-blue-600' };
      case 'red': return { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-600' };
      case 'orange': return { bg: 'bg-orange-100', text: 'text-orange-800', icon: 'text-orange-600' };
      case 'green': return { bg: 'bg-green-100', text: 'text-green-800', icon: 'text-green-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Clinical Management</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive clinical oversight and management tools
        </p>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleNavigateToTab('care-plans')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Active Items</p>
                <p className="text-2xl font-bold text-blue-600">58</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleNavigateToTab('incidents')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent Items</p>
                <p className="text-2xl font-bold text-red-600">6</p>
              </div>
              <Clock className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleNavigateToTab('uda')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                <p className="text-2xl font-bold text-purple-600">94%</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinical Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clinicalAreas.map((area) => {
          const colors = getColorClasses(area.color);
          const IconComponent = area.icon;
          
          return (
            <Card key={area.title} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={area.action}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                      <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{area.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{area.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{area.stats.active}</div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-600">{area.stats.total}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                  </div>
                  {area.stats.urgent > 0 && (
                    <Badge className={`${colors.bg} ${colors.text}`}>
                      {area.stats.urgent} urgent
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => handleNavigateToTab('incidents')}
            >
              <div className="text-left">
                <div className="font-medium">Report Incident</div>
                <div className="text-sm text-gray-500">Log a new safety incident</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => handleNavigateToTab('care-plans')}
            >
              <div className="text-left">
                <div className="font-medium">Create Care Plan</div>
                <div className="text-sm text-gray-500">Start a new care plan</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => handleNavigateToTab('grievances')}
            >
              <div className="text-left">
                <div className="font-medium">File Grievance</div>
                <div className="text-sm text-gray-500">Report a grievance</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => handleNavigateToTab('uda')}
            >
              <div className="text-left">
                <div className="font-medium">Schedule UDA</div>
                <div className="text-sm text-gray-500">Plan UDA assessment</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalOverview;
