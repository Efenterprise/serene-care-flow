
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Clock, 
  FileText, 
  Phone, 
  Star,
  Hospital,
  CheckCircle,
  Users,
  Loader2
} from "lucide-react";
import { useReferrals, useUpdateReferralStatus } from "@/hooks/useReferrals";
import { useToast } from "@/hooks/use-toast";

const AdmissionsQueue = () => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const { data: referrals, isLoading } = useReferrals();
  const updateStatus = useUpdateReferralStatus();
  const { toast } = useToast();

  const pendingReferrals = referrals?.filter(r => r.status === 'pending') || [];
  const reviewingReferrals = referrals?.filter(r => r.status === 'reviewing') || [];
  const approvedReferrals = referrals?.filter(r => r.status === 'approved') || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": 
      case "urgent": 
        return "bg-red-100 text-red-800 border-red-200";
      case "medium": 
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": 
        return "bg-green-100 text-green-800 border-green-200";
      default: 
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAIScoreColor = (score: number | null) => {
    if (!score) return "text-gray-400";
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const handleApprove = async (referralId: string) => {
    try {
      await updateStatus.mutateAsync({ id: referralId, status: 'approved' });
      toast({
        title: "Referral Approved",
        description: "The referral has been moved to approved status.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve referral. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  const formatInsurance = (primary: string | null, secondary: string | null) => {
    const insuranceMap: Record<string, string> = {
      medicare_a: "Medicare A",
      medicare_advantage: "Medicare Advantage",
      medicaid: "Medicaid",
      private_pay: "Private Pay",
      commercial: "Commercial",
      other: "Other"
    };
    
    let result = primary ? insuranceMap[primary] || primary : "Unknown";
    if (secondary) {
      result += ` + ${insuranceMap[secondary] || secondary}`;
    }
    return result;
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const ReferralCard = ({ referral }: { referral: any }) => (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900">
              {referral.patient_name}
            </CardTitle>
            <p className="text-xs text-gray-600 flex items-center mt-1">
              <Hospital className="w-3 h-3 mr-1" />
              {referral.referring_hospital}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={getPriorityColor(referral.priority || 'medium')}>
              {referral.priority || 'medium'}
            </Badge>
            {referral.ai_score && (
              <div className="flex items-center text-xs">
                <Star className={`w-3 h-3 mr-1 ${getAIScoreColor(referral.ai_score)}`} />
                <span className={getAIScoreColor(referral.ai_score)}>
                  {referral.ai_score}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="text-xs">
            <span className="font-medium text-gray-700">Diagnosis:</span>
            <span className="ml-1 text-gray-600">{referral.diagnosis}</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-gray-700">Insurance:</span>
            <span className="ml-1 text-gray-600">
              {formatInsurance(referral.primary_insurance, referral.secondary_insurance)}
            </span>
          </div>
          {referral.estimated_los && (
            <div className="text-xs">
              <span className="font-medium text-gray-700">Est. LOS:</span>
              <span className="ml-1 text-gray-600">{referral.estimated_los} days</span>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs text-gray-600 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Ready {formatDate(referral.ready_date)}
            </span>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                <Phone className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                <FileText className="w-3 h-3" />
              </Button>
              {referral.status === 'pending' && (
                <Button 
                  size="sm" 
                  className="h-6 px-2 text-xs bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(referral.id)}
                  disabled={updateStatus.isPending}
                >
                  <CheckCircle className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
          <TabsTrigger value="pending">
            Pending ({pendingReferrals.length})
          </TabsTrigger>
          <TabsTrigger value="reviewing">
            Reviewing ({reviewingReferrals.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedReferrals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 h-full overflow-y-auto">
          {pendingReferrals.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No Pending Referrals</h3>
              <p className="text-xs text-gray-600">New referrals will appear here</p>
            </div>
          ) : (
            pendingReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))
          )}
        </TabsContent>

        <TabsContent value="reviewing" className="space-y-3 h-full overflow-y-auto">
          {reviewingReferrals.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No Referrals Under Review</h3>
              <p className="text-xs text-gray-600">Referrals being reviewed will appear here</p>
            </div>
          ) : (
            reviewingReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-3 h-full overflow-y-auto">
          {approvedReferrals.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No Approved Referrals</h3>
              <p className="text-xs text-gray-600">Approved referrals ready for admission</p>
            </div>
          ) : (
            approvedReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdmissionsQueue;
