
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  Star,
  AlertTriangle,
  CheckCircle,
  Zap
} from "lucide-react";
import { useReferrals } from "@/hooks/useReferrals";

const ReferralMetricsCards = () => {
  const { data: referrals } = useReferrals();

  // Calculate metrics
  const totalReferrals = referrals?.length || 0;
  const pendingReferrals = referrals?.filter(r => r.status === 'pending').length || 0;
  const approvedReferrals = referrals?.filter(r => r.status === 'approved').length || 0;
  const avgAIScore = referrals?.reduce((acc, r) => acc + (r.ai_score || 0), 0) / totalReferrals || 0;
  const highPriorityCount = referrals?.filter(r => r.priority === 'high' || r.priority === 'urgent').length || 0;
  const estimatedRevenue = referrals?.reduce((acc, r) => acc + ((r.estimated_daily_rate || 0) * (r.estimated_los || 0)), 0) || 0;

  // Calculate conversion rate (approved / total * 100)
  const conversionRate = totalReferrals > 0 ? (approvedReferrals / totalReferrals * 100).toFixed(1) : '0';

  // Calculate average processing time (mock data)
  const avgProcessingTime = "2.3";

  const metrics = [
    {
      title: "Total Referrals",
      value: totalReferrals.toString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "blue"
    },
    {
      title: "Pending Review",
      value: pendingReferrals.toString(),
      change: "-8%",
      changeType: "positive" as const,
      icon: Clock,
      color: "orange"
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      change: "+5.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "green"
    },
    {
      title: "Avg AI Score",
      value: avgAIScore.toFixed(0),
      change: "+3 pts",
      changeType: "positive" as const,
      icon: Star,
      color: "purple"
    },
    {
      title: "High Priority",
      value: highPriorityCount.toString(),
      change: "+2",
      changeType: "neutral" as const,
      icon: AlertTriangle,
      color: "red"
    },
    {
      title: "Est. Revenue",
      value: `$${(estimatedRevenue / 1000).toFixed(0)}K`,
      change: "+18%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "emerald"
    },
    {
      title: "Avg Processing",
      value: `${avgProcessingTime}h`,
      change: "-0.5h",
      changeType: "positive" as const,
      icon: Zap,
      color: "indigo"
    },
    {
      title: "Approved Today",
      value: approvedReferrals.toString(),
      change: "+6",
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "teal"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600",
      orange: "bg-orange-100 text-orange-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      red: "bg-red-100 text-red-600",
      emerald: "bg-emerald-100 text-emerald-600",
      indigo: "bg-indigo-100 text-indigo-600",
      teal: "bg-teal-100 text-teal-600"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600";
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last week</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${getColorClasses(metric.color)}`}>
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReferralMetricsCards;
