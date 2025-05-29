
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { useReferrals } from "@/hooks/useReferrals";

const ReferralAnalyticsCharts = () => {
  const { data: referrals } = useReferrals();

  // Mock data for trends (in production, this would come from historical data)
  const referralTrends = [
    { date: "Jan", referrals: 45, approved: 38, revenue: 125000 },
    { date: "Feb", referrals: 52, approved: 44, revenue: 145000 },
    { date: "Mar", referrals: 48, approved: 41, revenue: 135000 },
    { date: "Apr", referrals: 61, approved: 52, revenue: 172000 },
    { date: "May", referrals: 55, approved: 48, revenue: 158000 },
    { date: "Jun", referrals: 67, approved: 58, revenue: 195000 }
  ];

  // AI Score distribution
  const aiScoreDistribution = [
    { range: "90-100", count: 12, percentage: 24 },
    { range: "80-89", count: 18, percentage: 36 },
    { range: "70-79", count: 15, percentage: 30 },
    { range: "60-69", count: 5, percentage: 10 }
  ];

  // Referral sources
  const referralSources = [
    { source: "Profility", count: 25, color: "#3B82F6" },
    { source: "Reside", count: 18, color: "#10B981" },
    { source: "Census Pro", count: 12, color: "#F59E0B" },
    { source: "Manual", count: 8, color: "#8B5CF6" }
  ];

  // Processing time by priority
  const processingTimes = [
    { priority: "Urgent", avgTime: 1.2, target: 2.0 },
    { priority: "High", avgTime: 2.8, target: 4.0 },
    { priority: "Medium", avgTime: 6.5, target: 8.0 },
    { priority: "Low", avgTime: 12.3, target: 24.0 }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Referral Trends */}
      <Card className="lg:col-span-2 border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle>Referral Trends & Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={referralTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="referrals" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
                name="Total Referrals"
              />
              <Area 
                type="monotone" 
                dataKey="approved" 
                stackId="2"
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
                name="Approved"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Score Distribution */}
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle>AI Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aiScoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Referral Sources */}
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle>Referral Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={referralSources}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                label={({ source, percentage }) => `${source}: ${percentage}%`}
              >
                {referralSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Processing Times */}
      <Card className="border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle>Processing Times by Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processingTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priority" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgTime" fill="#F59E0B" name="Avg Time" />
              <Bar dataKey="target" fill="#E5E7EB" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Projection */}
      <Card className="lg:col-span-2 border-0 shadow-sm bg-white/70">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={referralTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralAnalyticsCharts;
