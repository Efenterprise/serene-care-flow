
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface UserForFilter {
  email: string;
  first_name: string;
  last_name: string;
}

interface AuditTrailFiltersProps {
  dateRange: { start: string; end: string };
  userFilter: string;
  actionFilter: string;
  users: UserForFilter[] | undefined;
  onDateRangeChange: (field: 'start' | 'end', value: string) => void;
  onUserFilterChange: (value: string) => void;
  onActionFilterChange: (value: string) => void;
}

const AuditTrailFilters = ({
  dateRange,
  userFilter,
  actionFilter,
  users,
  onDateRangeChange,
  onUserFilterChange,
  onActionFilterChange
}: AuditTrailFiltersProps) => {
  return (
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
              onChange={(e) => onDateRangeChange('start', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={dateRange.end}
              onChange={(e) => onDateRangeChange('end', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="user-filter">User Email</Label>
            <Select value={userFilter} onValueChange={onUserFilterChange}>
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
            <Select value={actionFilter} onValueChange={onActionFilterChange}>
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
  );
};

export default AuditTrailFilters;
