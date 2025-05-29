
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
  RefreshCw,
  Wifi,
  Zap
} from "lucide-react";
import ReferralMetricsCards from "./ReferralMetricsCards";
import ReferralAnalyticsCharts from "./ReferralAnalyticsCharts";
import AdmissionsQueue from "../admissions/AdmissionsQueue";
import ReferralWorkflow from "./ReferralWorkflow";
import AIInsightsPanel from "./AIInsightsPanel";
import RevenueProjections from "./RevenueProjections";
import LivePlatformConnections from "./LivePlatformConnections";
import { useRealTimeReferrals } from "@/hooks/useRealTimeReferrals";

const ReferralDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  const { isConnected, connectionStatus, activePlatforms } = useRealTimeReferrals();

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
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-gray-600">Advanced analytics and AI-powered referral processing</p>
            <div className="flex items-center space-x-2">
              <Wifi className={`w-4 h-4 ${isConnected ? 'text-green-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-gray-400'}`}>
                {isConnected ? `Live (${activePlatforms.length} platforms)` : 'Offline'}
              </span>
            </div>
          </div>
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
          {isConnected && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Zap className="w-3 h-3 mr-1" />
              Real-time Active
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <ReferralMetricsCards />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="live-connections">Live Connections</TabsTrigger>
          <TabsTrigger value="queue">Admissions Queue</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ReferralAnalyticsCharts />
        </TabsContent>

        <TabsContent value="live-connections">
          <LivePlatformConnections />
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
