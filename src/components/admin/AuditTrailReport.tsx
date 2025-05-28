
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Download } from 'lucide-react';
import { format, subDays } from 'date-fns';
import AuditTrailFilters from './audit/AuditTrailFilters';
import AuditLogsList from './audit/AuditLogsList';
import { exportToCsv } from './audit/auditTrailUtils';

const AuditTrailReport = () => {
  const [dateRange, setDateRange] = useState({
    start: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });
  const [userFilter, setUserFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  const { data: auditLogs, isLoading } = useQuery({
    queryKey: ['audit-trail', dateRange, userFilter, actionFilter],
    queryFn: async () => {
      let query = supabase
        .from('audit_trail')
        .select('*')
        .gte('timestamp', `${dateRange.start}T00:00:00`)
        .lte('timestamp', `${dateRange.end}T23:59:59`)
        .order('timestamp', { ascending: false });

      if (userFilter) {
        query = query.ilike('user_email', `%${userFilter}%`);
      }

      if (actionFilter) {
        query = query.ilike('action', `%${actionFilter}%`);
      }

      const { data, error } = await query.limit(1000);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: users } = useQuery({
    queryKey: ['users-for-audit'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('email, first_name, last_name')
        .order('first_name');
      
      if (error) throw error;
      return data;
    },
  });

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
  };

  const handleExportToCsv = () => {
    exportToCsv(auditLogs, dateRange);
  };

  if (isLoading) {
    return <div className="p-6">Loading audit trail...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Trail Report</h2>
          <p className="text-gray-600">HIPAA-compliant activity logging and monitoring</p>
        </div>
        <Button onClick={handleExportToCsv} disabled={!auditLogs?.length}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <AuditTrailFilters
        dateRange={dateRange}
        userFilter={userFilter}
        actionFilter={actionFilter}
        users={users}
        onDateRangeChange={handleDateRangeChange}
        onUserFilterChange={setUserFilter}
        onActionFilterChange={setActionFilter}
      />

      <AuditLogsList auditLogs={auditLogs} />
    </div>
  );
};

export default AuditTrailReport;
