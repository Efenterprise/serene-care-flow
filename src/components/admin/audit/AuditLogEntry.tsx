
import { Badge } from '@/components/ui/badge';
import { User, Calendar, FileText, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { getActionColor, formatLogDetails } from './auditTrailUtils';
import type { Database } from '@/integrations/supabase/types';

type AuditTrail = Database['public']['Tables']['audit_trail']['Row'];

interface AuditLogEntryProps {
  log: AuditTrail;
}

const getActionIcon = (action: string) => {
  if (action.includes('LOGIN') || action.includes('LOGOUT')) return <User className="w-3 h-3" />;
  if (action.includes('PATIENT')) return <FileText className="w-3 h-3" />;
  return <Activity className="w-3 h-3" />;
};

const AuditLogEntry = ({ log }: AuditLogEntryProps) => {
  return (
    <div className="border-b border-gray-100 p-4 hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge className={getActionColor(log.action, log.success || false)}>
              {getActionIcon(log.action)}
              <span className="ml-1">{log.action}</span>
            </Badge>
            {log.patient_mrn && (
              <Badge variant="outline">
                MRN: {log.patient_mrn}
              </Badge>
            )}
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {log.user_email || 'System'}
              </span>
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(log.timestamp || ''), 'MMM dd, yyyy HH:mm:ss')}
              </span>
              {log.ip_address && (
                <span>IP: {log.ip_address}</span>
              )}
            </div>
            
            {log.resource_type && (
              <div>
                Resource: {log.resource_type}
                {log.resource_id && ` (ID: ${log.resource_id})`}
              </div>
            )}
            
            {log.details && (
              <div className="text-xs bg-gray-50 p-2 rounded mt-2">
                <pre className="whitespace-pre-wrap">
                  {formatLogDetails(log.details)}
                </pre>
              </div>
            )}
            
            {log.error_message && (
              <div className="text-red-600 text-xs mt-1">
                Error: {log.error_message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogEntry;
