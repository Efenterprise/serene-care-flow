
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Target,
  AlertCircle
} from "lucide-react";
import { useReferrals } from "@/hooks/useReferrals";

const RevenueProjections = () => {
  const { data: referrals } = useReferrals();

  // Calculate current revenue metrics
  const currentMonthRevenue = referrals?.reduce((acc, r) => {
    return acc + ((r.estimated_daily_rate || 0) * (r.estimated_los || 0));
  }, 0) || 0;

  // Mock historical and projected data
  const revenueProjections = [
    { month: "Jan", actual: 2100000, projected: 2050000, target: 2200000 },
    { month: "Feb", actual: 2250000, projected: 2200000, target: 2300000 },
    { month: "Mar", actual: 2180000, projected: 2150000, target: 2250000 },
    { month: "Apr", actual: 2400000, projected: 2350000, target: 2400000 },
    { month: "May", actual: 2320000, projected: 2300000, target: 2350000 },
    { month: "Jun", actual: null, projected: 2450000, target: 2400000 },
    { month: "Jul", actual: null, projected: 2520000, target: 2450000 },
    { month: "Aug", actual: null, projected: 2480000, target: 2500000 },
  ];

  const payorMix = [
    { payor: "Medicare A", revenue: 1200000, percentage: 48, color: "#3B82F6" },
    { payor: "Medicare Advantage", revenue: 650000, percentage: 26, color: "#10B981" },
    { payor: "Medicaid", revenue: 400000, percentage: 16, color: "#F59E0B" },
    { payor: "Private Pay", revenue: 200000, percentage: 8, color: "#8B5CF6" },
    { payor: "Commercial", revenue: 50000, percentage: 2, color: "#EF4444" }
  ];

  const revenueBySource = [
    { source: "Profility", revenue: 980000, referrals: 25, avgValue: 39200 },
    { source: "Reside", revenue: 756000, referrals: 18, avgValue: 42000 },
    { source: "Census Pro", revenue: 468000, referrals: 12, avgValue: 39000 },
    { source: "Manual", revenue: 296000, referrals: 8, avgValue: 37000 }
  ];

  const riskFactors = [
    {
      factor: "Denial Risk",
      impact: "High",
      description: "3 high-value referrals pending insurance approval",
      potentialLoss: 125000,
      mitigation: "Pre-verification process"
    },
    {
      factor: "Competition",
      impact: "Medium", 
      description: "New facility opening 2 miles away",
      potentialLoss: 200000,
      mitigation: "Enhanced marketing"
    },
    {
      factor: "Readmission Rate",
      impact: "Low",
      description: "Current rate 8% vs target 6%",
      potentialLoss: 50000,
      mitigation: "Discharge planning"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(currentMonthRevenue / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-green-600 mt-1">+12% vs target</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projected Next 3M</p>
                <p className="text-2xl font-bold text-gray-900">$7.4M</p>
                <p className="text-sm text-blue-600 mt-1">+8% growth</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Daily Rate</p>
                <p className="text-2xl font-bold text-gray-900">$342</p>
                <p className="text-sm text-green-600 mt-1">+$15 vs last month</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/70">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue at Risk</p>
                <p className="text-2xl font-bold text-gray-900">$375K</p>
                <p className="text-sm text-red-600 mt-1">3 factors identified</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Projections Chart */}
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle>Revenue Projections vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueProjections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Actual Revenue"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#3B82F6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Projected Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#6B7280" 
                strokeWidth={1}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Payor Mix */}
        <Card className="border-0 shadow-sm bg-white/70">
          <CardHeader>
            <CardTitle>Revenue by Payor Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={payorMix}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="percentage"
                    label={({ payor, percentage }) => `${percentage}%`}
                  >
                    {payorMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {payorMix.map((payor, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: payor.color }}
                      />
                      <span>{payor.payor}</span>
                    </div>
                    <span className="font-medium">${(payor.revenue / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Source */}
        <Card className="border-0 shadow-sm bg-white/70">
          <CardHeader>
            <CardTitle>Revenue by Referral Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBySource.map((source, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{source.source}</span>
                    <span className="text-lg font-bold">${(source.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>Referrals: {source.referrals}</div>
                    <div>Avg Value: ${source.avgValue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors */}
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle>Revenue Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((risk, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{risk.factor}</span>
                    <Badge className={getImpactColor(risk.impact)}>
                      {risk.impact} Impact
                    </Badge>
                  </div>
                  <span className="text-lg font-bold text-red-600">
                    -${(risk.potentialLoss / 1000).toFixed(0)}K
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    Mitigation: {risk.mitigation}
                  </span>
                  <Button size="sm" variant="outline">
                    Take Action
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueProjections;
