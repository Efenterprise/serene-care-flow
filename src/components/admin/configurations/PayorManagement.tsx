
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { usePayorConfigurations, useCreatePayorConfiguration } from '@/hooks/usePayorConfigurations';
import { Plus, Save, X } from 'lucide-react';

const PayorManagement = () => {
  const { toast } = useToast();
  const { data: payors, isLoading } = usePayorConfigurations();
  const createPayor = useCreatePayorConfiguration();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPayor, setNewPayor] = useState({
    payor_name: '',
    payor_type: 'private_insurance',
    payor_code: '',
    authorization_required: false,
    daily_rate: '',
    billing_frequency: 'monthly'
  });

  const payorTypes = [
    { value: 'medicare', label: 'Medicare' },
    { value: 'medicaid', label: 'Medicaid' },
    { value: 'private_insurance', label: 'Private Insurance' },
    { value: 'private_pay', label: 'Private Pay' },
    { value: 'va', label: 'Veterans Affairs' },
    { value: 'tricare', label: 'Tricare' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payorData = {
        ...newPayor,
        daily_rate: newPayor.daily_rate ? parseFloat(newPayor.daily_rate) : null
      };
      
      await createPayor.mutateAsync(payorData);
      setNewPayor({
        payor_name: '',
        payor_type: 'private_insurance',
        payor_code: '',
        authorization_required: false,
        daily_rate: '',
        billing_frequency: 'monthly'
      });
      setShowAddForm(false);
      toast({
        title: "Payor Created",
        description: "New payor has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create payor.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading payors...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payor Sources</CardTitle>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Payor
        </Button>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Add New Payor</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payor_name">Payor Name</Label>
                    <Input
                      id="payor_name"
                      value={newPayor.payor_name}
                      onChange={(e) => setNewPayor({ ...newPayor, payor_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="payor_type">Payor Type</Label>
                    <Select value={newPayor.payor_type} onValueChange={(value) => setNewPayor({ ...newPayor, payor_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {payorTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="daily_rate">Daily Rate ($)</Label>
                    <Input
                      id="daily_rate"
                      type="number"
                      step="0.01"
                      value={newPayor.daily_rate}
                      onChange={(e) => setNewPayor({ ...newPayor, daily_rate: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="authorization_required"
                      checked={newPayor.authorization_required}
                      onCheckedChange={(checked) => setNewPayor({ ...newPayor, authorization_required: !!checked })}
                    />
                    <Label htmlFor="authorization_required">Authorization Required</Label>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={createPayor.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Payor
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
              <TableHead>Payor Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Daily Rate</TableHead>
              <TableHead>Authorization</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payors?.map((payor) => (
              <TableRow key={payor.id}>
                <TableCell>{payor.payor_name}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {payor.payor_type.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  {payor.daily_rate ? `$${payor.daily_rate}` : 'Not set'}
                </TableCell>
                <TableCell>
                  {payor.authorization_required ? (
                    <Badge variant="destructive">Required</Badge>
                  ) : (
                    <Badge variant="secondary">Not Required</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={payor.is_active ? "default" : "secondary"}>
                    {payor.is_active ? "Active" : "Inactive"}
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

export default PayorManagement;
