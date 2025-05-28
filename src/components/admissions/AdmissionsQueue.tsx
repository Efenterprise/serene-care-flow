
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Clock, 
  DollarSign, 
  FileText, 
  Phone, 
  Star,
  Hospital,
  AlertTriangle,
  CheckCircle,
  Zap,
  Users
} from "lucide-react";

interface PendingAdmission {
  id: number;
  name: string;
  hospital: string;
  diagnosis: string;
  insurance: string;
  estimatedLOS: string;
  priority: "high" | "medium" | "low";
  readyDate: string;
  aiScore: number;
}

interface AdmissionsQueueProps {
  pendingAdmissions: PendingAdmission[];
}

const AdmissionsQueue = ({ pendingAdmissions }: AdmissionsQueueProps) => {
  const [selectedTab, setSelectedTab] = useState("pending");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Admissions Pipeline</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Brain className="w-3 h-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 h-full overflow-y-auto">
          {pendingAdmissions.map((admission) => (
            <Card key={admission.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold text-gray-900">
                      {admission.name}
                    </CardTitle>
                    <p className="text-xs text-gray-600 flex items-center mt-1">
                      <Hospital className="w-3 h-3 mr-1" />
                      {admission.hospital}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={getPriorityColor(admission.priority)}>
                      {admission.priority}
                    </Badge>
                    <div className="flex items-center text-xs">
                      <Star className={`w-3 h-3 mr-1 ${getAIScoreColor(admission.aiScore)}`} />
                      <span className={getAIScoreColor(admission.aiScore)}>
                        {admission.aiScore}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">Diagnosis:</span>
                    <span className="ml-1 text-gray-600">{admission.diagnosis}</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">Insurance:</span>
                    <span className="ml-1 text-gray-600">{admission.insurance}</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">Est. LOS:</span>
                    <span className="ml-1 text-gray-600">{admission.estimatedLOS}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-gray-600 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Ready {admission.readyDate}
                    </span>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                        <FileText className="w-3 h-3" />
                      </Button>
                      <Button size="sm" className="h-6 px-2 text-xs bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="inquiries">
          <div className="text-center py-8">
            <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Active Inquiries</h3>
            <p className="text-xs text-gray-600">Hospital referrals and family inquiries</p>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Scheduled Admissions</h3>
            <p className="text-xs text-gray-600">Confirmed upcoming admits</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdmissionsQueue;
