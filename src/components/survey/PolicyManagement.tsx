
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Calendar, AlertTriangle } from "lucide-react";

const PolicyManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Policy Management</h2>
          <p className="text-gray-600">Track and manage facility policies and procedures</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Due for Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Overdue Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Policy Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                name: "Infection Control Policy", 
                lastReview: "2024-01-15", 
                nextReview: "2024-07-15", 
                status: "current",
                category: "Clinical"
              },
              { 
                name: "Emergency Preparedness Plan", 
                lastReview: "2023-12-01", 
                nextReview: "2024-02-01", 
                status: "due",
                category: "Safety"
              },
              { 
                name: "Dietary Services Protocol", 
                lastReview: "2023-10-15", 
                nextReview: "2024-01-15", 
                status: "overdue",
                category: "Dietary"
              }
            ].map((policy, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{policy.name}</h3>
                    <p className="text-sm text-gray-600">{policy.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right text-sm">
                    <p>Next Review: {policy.nextReview}</p>
                    <Badge className={
                      policy.status === 'current' ? 'bg-green-100 text-green-800' :
                      policy.status === 'due' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {policy.status}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyManagement;
