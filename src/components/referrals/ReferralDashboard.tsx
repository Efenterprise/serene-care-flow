
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  Star,
  AlertTriangle,
  CheckCircle,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import ReferralMetricsCards from "./ReferralMetricsCards";
import ReferralAnalyticsCharts from "./ReferralAnalyticsCharts";
import AdmissionsQueue from "../admissions/AdmissionsQueue";
import ReferralWorkflow from "./ReferralWorkflow";
import AIInsightsPanel from "./AIInsightsPanel";
import RevenueProjections from "./RevenueProjections";

const ReferralDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referral Management Hub</h1>
          <p className="text-gray-600">Advanced analytics and AI-powered referral processing</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <ReferralMetricsCards />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="queue">Admissions Queue</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ReferralAnalyticsCharts />
        </TabsContent>

        <TabsContent value="queue">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <AdmissionsQueue />
            </div>
            <div className="lg:col-span-1">
              <AIInsightsPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workflow">
          <ReferralWorkflow />
        </TabsContent>

        <TabsContent value="ai-insights">
          <AIInsightsPanel expanded />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueProjections />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferralDashboard;
