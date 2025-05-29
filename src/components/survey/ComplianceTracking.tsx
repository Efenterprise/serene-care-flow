
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  FileCheck,
  Users,
  Building
} from "lucide-react";

const ComplianceTracking = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance Tracking</h2>
          <p className="text-gray-600">Monitor regulatory compliance across all facility areas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">92%</div>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-gray-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Items</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">47</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <p className="text-xs text-gray-600">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { area: "Life Safety & Environment", score: 94, trend: "up", issues: 1 },
              { area: "Nursing Services", score: 89, trend: "stable", issues: 2 },
              { area: "Dietary Services", score: 85, trend: "down", issues: 3 },
              { area: "Administration", score: 96, trend: "up", issues: 0 },
              { area: "Resident Rights", score: 92, trend: "stable", issues: 1 },
              { area: "Quality Assurance", score: 88, trend: "up", issues: 2 }
            ].map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{area.area}</h3>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className={`w-4 h-4 ${
                        area.trend === 'up' ? 'text-green-600' : 
                        area.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                      <span className="font-bold">{area.score}%</span>
                    </div>
                  </div>
                  <Progress value={area.score} className="h-2" />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">
                      {area.issues} active issue{area.issues !== 1 ? 's' : ''}
                    </span>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceTracking;
