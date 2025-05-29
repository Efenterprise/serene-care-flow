
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Play, Calendar, Users } from "lucide-react";

const MockSurveys = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mock Surveys</h2>
          <p className="text-gray-600">Internal audit and survey preparation tools</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Play className="w-4 h-4 mr-2" />
          Start Mock Survey
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completed Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Mock Surveys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                name: "Life Safety Focused Survey", 
                date: "2024-01-10", 
                score: 92, 
                surveyor: "Jane Smith, RN",
                status: "completed"
              },
              { 
                name: "Dietary Services Review", 
                date: "2024-01-05", 
                score: 88, 
                surveyor: "Mike Johnson",
                status: "completed"
              },
              { 
                name: "Comprehensive Annual Prep", 
                date: "2023-12-20", 
                score: 95, 
                surveyor: "Sarah Wilson, Administrator",
                status: "completed"
              }
            ].map((survey, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{survey.name}</h3>
                    <p className="text-sm text-gray-600">Conducted by: {survey.surveyor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-medium">Score: {survey.score}%</p>
                    <p className="text-sm text-gray-600">{survey.date}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {survey.status}
                  </Badge>
                  <Button size="sm" variant="outline">View Report</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockSurveys;
