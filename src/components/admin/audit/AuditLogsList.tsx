
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import AuditLogEntry from './AuditLogEntry';
import type { Database } from '@/integrations/supabase/types';

type AuditTrail = Database['public']['Tables']['audit_trail']['Row'];

interface AuditLogsListProps {
  auditLogs: AuditTrail[] | undefined;
}

const AuditLogsList = ({ auditLogs }: AuditLogsListProps) => {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Audit Logs ({auditLogs?.length || 0} entries)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {auditLogs?.map((log) => (
            <AuditLogEntry key={log.id} log={log} />
          ))}
          
          {auditLogs?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No audit logs found for the selected criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditLogsList;
