
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Thermometer, 
  Activity,
  Gauge,
  Plus,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentVitalsTabProps {
  resident: Resident;
}

const ResidentVitalsTab = ({ resident }: ResidentVitalsTabProps) => {
  // Mock vitals data - in real system this would come from API
  const currentVitals = {
    temperature: { value: 98.6, unit: "°F", status: "normal", time: "08:00 AM" },
    bloodPressure: { systolic: 120, diastolic: 80, status: "normal", time: "08:00 AM" },
    heartRate: { value: 72, unit: "bpm", status: "normal", time: "08:00 AM" },
    respiratoryRate: { value: 16, unit: "rpm", status: "normal", time: "08:00 AM" },
    oxygenSaturation: { value: 98, unit: "%", status: "normal", time: "08:00 AM" },
    weight: { value: 165, unit: "lbs", change: "+2", time: "Weekly" },
    glucoseLevel: { value: 95, unit: "mg/dL", status: "normal", time: "07:30 AM" }
  };

  const recentVitals = [
    { date: "Today 08:00", temp: "98.6°F", bp: "120/80", hr: "72", rr: "16", o2: "98%" },
    { date: "Yesterday 08:00", temp: "98.4°F", bp: "118/78", hr: "70", rr: "16", o2: "99%" },
    { date: "Yesterday 20:00", temp: "98.8°F", bp: "125/82", hr: "75", rr: "18", o2: "97%" },
    { date: "2 days ago 08:00", temp: "98.2°F", bp: "115/75", hr: "68", rr: "15", o2: "98%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'elevated':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Vitals Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Vital Signs</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Record Vitals
        </Button>
      </div>

      {/* Current Vitals Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Thermometer className="w-4 h-4 mr-2 text-red-500" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{currentVitals.temperature.value}</span>
                <span className="text-gray-500">{currentVitals.temperature.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(currentVitals.temperature.status)}>
                  {currentVitals.temperature.status}
                </Badge>
                <span className="text-xs text-gray-500">{currentVitals.temperature.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Gauge className="w-4 h-4 mr-2 text-blue-500" />
              Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {currentVitals.bloodPressure.systolic}/{currentVitals.bloodPressure.diastolic}
                </span>
                <span className="text-gray-500">mmHg</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(currentVitals.bloodPressure.status)}>
                  {currentVitals.bloodPressure.status}
                </Badge>
                <span className="text-xs text-gray-500">{currentVitals.bloodPressure.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{currentVitals.heartRate.value}</span>
                <span className="text-gray-500">{currentVitals.heartRate.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(currentVitals.heartRate.status)}>
                  {currentVitals.heartRate.status}
                </Badge>
                <span className="text-xs text-gray-500">{currentVitals.heartRate.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Activity className="w-4 h-4 mr-2 text-green-500" />
              O2 Saturation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{currentVitals.oxygenSaturation.value}</span>
                <span className="text-gray-500">{currentVitals.oxygenSaturation.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(currentVitals.oxygenSaturation.status)}>
                  {currentVitals.oxygenSaturation.status}
                </Badge>
                <span className="text-xs text-gray-500">{currentVitals.oxygenSaturation.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Measurements */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              Respiratory Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{currentVitals.respiratoryRate.value}</span>
                <span className="text-gray-500">{currentVitals.respiratoryRate.unit}</span>
              </div>
              <Badge className={getStatusColor(currentVitals.respiratoryRate.status)}>
                {currentVitals.respiratoryRate.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{currentVitals.weight.value}</span>
                <span className="text-gray-500">{currentVitals.weight.unit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-600">{currentVitals.weight.change} lbs</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              Blood Glucose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{currentVitals.glucoseLevel.value}</span>
                <span className="text-gray-500">{currentVitals.glucoseLevel.unit}</span>
              </div>
              <Badge className={getStatusColor(currentVitals.glucoseLevel.status)}>
                {currentVitals.glucoseLevel.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vitals History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Vitals History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date/Time</th>
                  <th className="text-left p-2">Temp</th>
                  <th className="text-left p-2">BP</th>
                  <th className="text-left p-2">HR</th>
                  <th className="text-left p-2">RR</th>
                  <th className="text-left p-2">O2 Sat</th>
                </tr>
              </thead>
              <tbody>
                {recentVitals.map((vital, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{vital.date}</td>
                    <td className="p-2">{vital.temp}</td>
                    <td className="p-2">{vital.bp}</td>
                    <td className="p-2">{vital.hr}</td>
                    <td className="p-2">{vital.rr}</td>
                    <td className="p-2">{vital.o2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentVitalsTab;
