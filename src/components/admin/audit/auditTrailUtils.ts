
import type { Database } from '@/integrations/supabase/types';

type AuditTrail = Database['public']['Tables']['audit_trail']['Row'];

export const getActionColor = (action: string, success: boolean) => {
  if (!success) return 'bg-red-100 text-red-800';
  
  if (action.includes('LOGIN')) return 'bg-green-100 text-green-800';
  if (action.includes('LOGOUT')) return 'bg-gray-100 text-gray-800';
  if (action.includes('CREATE') || action.includes('INSERT')) return 'bg-blue-100 text-blue-800';
  if (action.includes('UPDATE') || action.includes('EDIT')) return 'bg-yellow-100 text-yellow-800';
  if (action.includes('DELETE')) return 'bg-red-100 text-red-800';
  if (action.includes('VIEW') || action.includes('SELECT')) return 'bg-purple-100 text-purple-800';
  
  return 'bg-gray-100 text-gray-800';
};

export const formatLogDetails = (details: unknown): string => {
  try {
    return typeof details === 'object' && details !== null
      ? JSON.stringify(details, null, 2)
      : String(details || '');
  } catch {
    return 'Invalid JSON data';
  }
};

export const exportToCsv = (auditLogs: AuditTrail[] | undefined, dateRange: { start: string; end: string }) => {
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
