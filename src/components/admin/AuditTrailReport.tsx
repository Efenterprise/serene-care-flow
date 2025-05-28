
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Filter, Download, Calendar, User, Activity } from 'lucide-react';
import { format, subDays } from 'date-fns';
import type { Database } from '@/integrations/supabase/types';

type AuditTrail = Database['public']['Tables']['audit_trail']['Row'];

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

  const exportToCsv = () => {
    if (!auditLogs) return;

    const headers = [
      'Timestamp',
      'User Email',
      'Action',
      'Resource Type',
      'Resource ID',
      'IP Address',
      'Success',
      'Patient MRN',
      'Details'
    ];

    const csvContent = [
      headers.join(','),
      ...auditLogs.map(log => [
        log.timestamp,
        log.user_email || 'System',
        log.action,
        log.resource_type || '',
        log.resource_id || '',
        log.ip_address || '',
        log.success ? 'Yes' : 'No',
        log.patient_mrn || '',
        log.details ? JSON.stringify(log.details).replace(/,/g, ';') : ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${dateRange.start}-to-${dateRange.end}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getActionColor = (action: string, success: boolean) => {
    if (!success) return 'bg-red-100 text-red-800';
    
    if (action.includes('LOGIN')) return 'bg-green-100 text-green-800';
    if (action.includes('LOGOUT')) return 'bg-gray-100 text-gray-800';
    if (action.includes('CREATE') || action.includes('INSERT')) return 'bg-blue-100 text-blue-800';
    if (action.includes('UPDATE') || action.includes('EDIT')) return 'bg-yellow-100 text-yellow-800';
    if (action.includes('DELETE')) return 'bg-red-100 text-red-800';
    if (action.includes('VIEW') || action.includes('SELECT')) return 'bg-purple-100 text-purple-800';
    
    return 'bg-gray-100 text-gray-800';
  };

  const getActionIcon = (action: string) => {
    if (action.includes('LOGIN') || action.includes('LOGOUT')) return <User className="w-3 h-3" />;
    if (action.includes('PATIENT')) return <FileText className="w-3 h-3" />;
    return <Activity className="w-3 h-3" />;
  };

  const formatLogDetails = (details: unknown): string => {
    try {
      return typeof details === 'object' 
        ? JSON.stringify(details, null, 2)
        : String(details);
    } catch {
      return 'Invalid JSON data';
    }
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
        <Button onClick={exportToCsv} disabled={!auditLogs?.length}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="user-filter">User Email</Label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All users</SelectItem>
                  {users?.map((user) => (
                    <SelectItem key={user.email} value={user.email}>
                      {user.first_name} {user.last_name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="action-filter">Action</Label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All actions</SelectItem>
                  <SelectItem value="LOGIN">Login Events</SelectItem>
                  <SelectItem value="LOGOUT">Logout Events</SelectItem>
                  <SelectItem value="PATIENT">Patient Actions</SelectItem>
                  <SelectItem value="CREATE">Create Actions</SelectItem>
                  <SelectItem value="UPDATE">Update Actions</SelectItem>
                  <SelectItem value="DELETE">Delete Actions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
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
              <div key={log.id} className="border-b border-gray-100 p-4 hover:bg-gray-50">
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
            ))}
            
            {auditLogs?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No audit logs found for the selected criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrailReport;
