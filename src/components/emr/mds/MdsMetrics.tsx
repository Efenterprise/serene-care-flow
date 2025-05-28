
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertTriangle, Calendar } from "lucide-react";

interface MdsMetricsProps {
  completedCount: number;
  inProgressCount: number;
  overdueCount: number;
}

const MdsMetrics = ({ completedCount, inProgressCount, overdueCount }: MdsMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-green-600">{completedCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-xl font-bold text-blue-600">{inProgressCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-xl font-bold text-red-600">{overdueCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Due This Week</p>
              <p className="text-xl font-bold text-purple-600">3</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MdsMetrics;
