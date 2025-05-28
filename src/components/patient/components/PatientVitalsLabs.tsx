
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Thermometer,
  Activity,
  Droplets,
  FlaskConical,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PatientVitalsLabsProps {
  patientId: string;
}

const PatientVitalsLabs = ({ patientId }: PatientVitalsLabsProps) => {
  const vitalsHistory = [
    { date: "2024-01-20 08:00", bp_sys: 128, bp_dia: 78, hr: 72, temp: 98.6, rr: 16, o2: 98 },
    { date: "2024-01-20 04:00", bp_sys: 132, bp_dia: 82, hr: 68, temp: 98.4, rr: 18, o2: 97 },
    { date: "2024-01-19 20:00", bp_sys: 125, bp_dia: 75, hr: 74, temp: 98.8, rr: 16, o2: 98 },
    { date: "2024-01-19 16:00", bp_sys: 130, bp_dia: 80, hr: 76, temp: 98.7, rr: 17, o2: 97 },
    { date: "2024-01-19 12:00", bp_sys: 134, bp_dia: 84, hr: 70, temp: 98.5, rr: 16, o2: 98 },
    { date: "2024-01-19 08:00", bp_sys: 127, bp_dia: 77, hr: 72, temp: 98.6, rr: 15, o2: 99 },
  ];

  const labResults = [
    {
      id: "1",
      date: "2024-01-19",
      type: "Complete Blood Count",
      results: [
        { name: "Hemoglobin", value: "12.8", unit: "g/dL", range: "12.0-15.5", status: "normal" },
        { name: "Hematocrit", value: "38.2", unit: "%", range: "36.0-46.0", status: "normal" },
        { name: "White Blood Cells", value: "7.2", unit: "K/μL", range: "4.5-11.0", status: "normal" },
        { name: "Platelets", value: "245", unit: "K/μL", range: "150-450", status: "normal" }
      ]
    },
    {
      id: "2",
      date: "2024-01-17",
      type: "Comprehensive Metabolic Panel",
      results: [
        { name: "Glucose", value: "110", unit: "mg/dL", range: "70-100", status: "high" },
        { name: "BUN", value: "18", unit: "mg/dL", range: "7-20", status: "normal" },
        { name: "Creatinine", value: "1.0", unit: "mg/dL", range: "0.6-1.2", status: "normal" },
        { name: "Sodium", value: "140", unit: "mEq/L", range: "136-145", status: "normal" },
        { name: "Potassium", value: "4.2", unit: "mEq/L", range: "3.5-5.0", status: "normal" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600';
      case 'high':
        return 'text-red-600';
      case 'low':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
        return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'low':
        return <TrendingDown className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const latestVitals = vitalsHistory[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Vitals & Laboratory Results</h3>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Trends
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Record Vitals
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Vitals</TabsTrigger>
          <TabsTrigger value="trends">Vital Trends</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Blood Pressure</p>
              <p className="text-xl font-bold text-blue-600">
                {latestVitals.bp_sys}/{latestVitals.bp_dia}
              </p>
              <p className="text-xs text-gray-500">mmHg</p>
            </Card>

            <Card className="text-center p-4 bg-green-50 border-green-200">
              <div className="flex items-center justify-center mb-2">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="text-xl font-bold text-green-600">{latestVitals.hr}</p>
              <p className="text-xs text-gray-500">bpm</p>
            </Card>

            <Card className="text-center p-4 bg-orange-50 border-orange-200">
              <div className="flex items-center justify-center mb-2">
                <Thermometer className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-xl font-bold text-orange-600">{latestVitals.temp}°F</p>
              <p className="text-xs text-gray-500">Oral</p>
            </Card>

            <Card className="text-center p-4 bg-purple-50 border-purple-200">
              <div className="flex items-center justify-center mb-2">
                <Droplets className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Oxygen Sat</p>
              <p className="text-xl font-bold text-purple-600">{latestVitals.o2}%</p>
              <p className="text-xs text-gray-500">Room air</p>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Additional Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Respiratory Rate</span>
                  <p className="font-medium">{latestVitals.rr} breaths/min</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Pain Level</span>
                  <p className="font-medium">3/10 (surgical site)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vitalsHistory.reverse()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis domain={[60, 160]} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Line type="monotone" dataKey="bp_sys" stroke="#3b82f6" name="Systolic" />
                  <Line type="monotone" dataKey="bp_dia" stroke="#ef4444" name="Diastolic" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Heart Rate Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={vitalsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis domain={[60, 100]} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Line type="monotone" dataKey="hr" stroke="#10b981" name="Heart Rate" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs">
          <div className="space-y-6">
            {labResults.map((lab) => (
              <Card key={lab.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FlaskConical className="w-5 h-5 mr-2" />
                      {lab.type}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{lab.date}</span>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Report
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {lab.results.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{result.name}</p>
                          <p className="text-sm text-gray-600">Range: {result.range}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${getStatusColor(result.status)}`}>
                            {result.value} {result.unit}
                          </span>
                          {getStatusIcon(result.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientVitalsLabs;
