
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useRoleConfigurations } from '@/hooks/useConfigurations';

const RoleConfigurationsManagement = () => {
  const { data: roles, isLoading } = useRoleConfigurations();

  if (isLoading) {
    return <div>Loading role configurations...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles & Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Dashboard Access</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles?.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <Badge variant="outline">{role.role_name}</Badge>
                </TableCell>
                <TableCell>{role.role_description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.dashboard_access?.map((access) => (
                      <Badge key={access} variant="secondary" className="text-xs">
                        {access}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={role.is_active ? "default" : "secondary"}>
                    {role.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RoleConfigurationsManagement;
