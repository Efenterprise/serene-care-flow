
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useFacilityUnits, useCreateFacilityUnit, useUpdateFacilityUnit } from '@/hooks/useConfigurations';
import { Plus, Edit, Save, X } from 'lucide-react';

const UnitsManagement = () => {
  const { toast } = useToast();
  const { data: units, isLoading } = useFacilityUnits();
  const createUnit = useCreateFacilityUnit();
  const updateUnit = useUpdateFacilityUnit();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState<string | null>(null);
  const [newUnit, setNewUnit] = useState({
    unit_name: '',
    unit_code: '',
    description: '',
    floor_number: 1,
    total_beds: 0,
    unit_type: 'skilled_nursing'
  });

  const unitTypes = [
    { value: 'skilled_nursing', label: 'Skilled Nursing' },
    { value: 'memory_care', label: 'Memory Care' },
    { value: 'rehabilitation', label: 'Rehabilitation' },
    { value: 'general', label: 'General' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createUnit.mutateAsync(newUnit);
      setNewUnit({
        unit_name: '',
        unit_code: '',
        description: '',
        floor_number: 1,
        total_beds: 0,
        unit_type: 'skilled_nursing'
      });
      setShowAddForm(false);
      toast({
        title: "Unit Created",
        description: "New unit has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create unit.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (unit: any) => {
    try {
      await updateUnit.mutateAsync(unit);
      setEditingUnit(null);
      toast({
        title: "Unit Updated",
        description: "Unit has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update unit.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading units...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Units & Bed Layout</CardTitle>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Unit
        </Button>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Add New Unit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="unit_name">Unit Name</Label>
                    <Input
                      id="unit_name"
                      value={newUnit.unit_name}
                      onChange={(e) => setNewUnit({ ...newUnit, unit_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit_code">Unit Code</Label>
                    <Input
                      id="unit_code"
                      value={newUnit.unit_code}
                      onChange={(e) => setNewUnit({ ...newUnit, unit_code: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="total_beds">Total Beds</Label>
                    <Input
                      id="total_beds"
                      type="number"
                      value={newUnit.total_beds}
                      onChange={(e) => setNewUnit({ ...newUnit, total_beds: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit_type">Unit Type</Label>
                    <Select value={newUnit.unit_type} onValueChange={(value) => setNewUnit({ ...newUnit, unit_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {unitTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={createUnit.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Unit
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Beds</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units?.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>{unit.unit_name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{unit.unit_code}</Badge>
                </TableCell>
                <TableCell>{unit.unit_type.replace('_', ' ')}</TableCell>
                <TableCell>{unit.floor_number}</TableCell>
                <TableCell>{unit.total_beds}</TableCell>
                <TableCell>
                  <Badge variant={unit.is_active ? "default" : "secondary"}>
                    {unit.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UnitsManagement;
