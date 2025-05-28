
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useHospitalCommunications, useProcessCommunication } from "@/hooks/useHospitalCommunications";
import { useToast } from "@/hooks/use-toast";

const CommunicationLog = () => {
  const { data: communications, isLoading } = useHospitalCommunications();
  const processCommunication = useProcessCommunication();
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'retry':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'adt_feed':
        return '🏥';
      case 'referral_update':
        return '📋';
      case 'discharge_summary':
        return '📄';
      case 'readmission_alert':
        return '🚨';
      default:
        return '💬';
    }
  };

  const handleProcessCommunication = async (id: string, status: string) => {
    try {
      await processCommunication.mutateAsync({ id, status });
      toast({
        title: "Communication Updated",
        description: `Message marked as ${status}`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update communication status",
        variant: "destructive",
      });
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (isLoading) {
    return <div>Loading communication log...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Log</h2>
          <p className="text-gray-600">Monitor hospital system messages and ADT feeds</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {communications?.map((comm) => (
          <Card key={comm.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {comm.direction === 'inbound' ? (
                      <ArrowLeft className="w-4 h-4 text-blue-600" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(comm.communication_type)}</span>
                      <h3 className="font-semibold capitalize">
                        {comm.communication_type.replace('_', ' ')}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {comm.direction}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {comm.platform?.name} • MRN: {comm.patient_tracking?.patient_mrn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <Badge className={getStatusColor(comm.status || 'pending')}>
                      {comm.status === 'processed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {comm.status === 'failed' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {comm.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {comm.status || 'pending'}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimestamp(comm.created_at || '')}
                    </p>
                  </div>

                  {comm.status === 'pending' && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProcessCommunication(comm.id, 'processed')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProcessCommunication(comm.id, 'failed')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {comm.error_message && (
                <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-700">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  {comm.error_message}
                </div>
              )}

              {comm.message_content && (
                <div className="mt-3 p-3 bg-gray-50 rounded">
                  <p className="text-sm font-medium text-gray-700 mb-1">Message Content:</p>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(comm.message_content, null, 2).substring(0, 200)}...
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunicationLog;
