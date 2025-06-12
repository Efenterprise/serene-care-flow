
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface GrievanceAnalyticsProps {
  priorityStats: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  categoryStats: {
    clinical: number;
    staff: number;
    food: number;
    facility: number;
    billing: number;
    other: number;
  };
  grievances: any[];
}

const GrievanceAnalytics = ({ priorityStats, categoryStats, grievances }: GrievanceAnalyticsProps) => {
  const priorityData = [
    { name: 'Critical', value: priorityStats.critical, color: '#ef4444' },
    { name: 'High', value: priorityStats.high, color: '#f97316' },
    { name: 'Medium', value: priorityStats.medium, color: '#eab308' },
    { name: 'Low', value: priorityStats.low, color: '#22c55e' }
  ];

  const categoryData = [
    { name: 'Clinical Care', value: categoryStats.clinical },
    { name: 'Staff Conduct', value: categoryStats.staff },
    { name: 'Food Service', value: categoryStats.food },
    { name: 'Facility', value: categoryStats.facility },
    { name: 'Billing', value: categoryStats.billing },
    { name: 'Other', value: categoryStats.other }
  ];

  // Mock trend data - this would come from actual historical data
  const trendData = [
    { month: 'Jan', grievances: 12, resolved: 10 },
    { month: 'Feb', grievances: 8, resolved: 9 },
    { month: 'Mar', grievances: 15, resolved: 12 },
    { month: 'Apr', grievances: 10, resolved: 13 },
    { month: 'May', grievances: 7, resolved: 8 },
    { month: 'Jun', grievances: 5, resolved: 6 }
  ];

  const resolutionTimeData = [
    { timeframe: '0-24 hours', count: 2 },
    { timeframe: '1-3 days', count: 8 },
    { timeframe: '4-7 days', count: 12 },
    { timeframe: '1-2 weeks', count: 6 },
    { timeframe: '2+ weeks', count: 3 }
  ];

  const COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {grievances.length}
              </div>
              <div className="text-sm text-gray-600">Total Grievances</div>
              <div className="text-xs text-green-600 mt-1">+2 from last month</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-gray-600">Resolution Rate</div>
              <div className="text-xs text-green-600 mt-1">+5% from last month</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">4.2</div>
              <div className="text-sm text-gray-600">Avg Days to Resolve</div>
              <div className="text-xs text-red-600 mt-1">+0.5 days from last month</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Complainant Satisfaction</div>
              <div className="text-xs text-green-600 mt-1">+3% from last month</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grievances by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grievances by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="grievances" fill="#ef4444" name="New Grievances" />
                <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolution Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resolutionTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeframe" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Issues This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Medication Management</span>
                <Badge variant="destructive">3 incidents</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Food Quality</span>
                <Badge className="bg-orange-100 text-orange-800">2 incidents</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Staff Communication</span>
                <Badge className="bg-orange-100 text-orange-800">2 incidents</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Facility Maintenance</span>
                <Badge className="bg-yellow-100 text-yellow-800">1 incident</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Response Time (24h target)</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Investigation Timeline (5 days)</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Resolution Timeline (7 days)</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrievanceAnalytics;
