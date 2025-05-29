
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ConfigurationGroupDisplayProps {
  groupedConfigurations: Record<string, any[]>;
}

const ConfigurationGroupDisplay = ({ groupedConfigurations }: ConfigurationGroupDisplayProps) => {
  const configurationTypes = [
    { value: 'care_levels', label: 'Care Levels' },
    { value: 'diet_types', label: 'Diet Types' },
    { value: 'mobility_levels', label: 'Mobility Levels' },
    { value: 'alert_types', label: 'Alert Types' },
    { value: 'medication_frequencies', label: 'Medication Frequencies' },
    { value: 'diagnosis_categories', label: 'Diagnosis Categories' }
  ];

  return (
    <div className="space-y-6">
      {Object.entries(groupedConfigurations).map(([type, configs]) => (
        <Card key={type}>
          <CardHeader>
            <CardTitle className="text-lg">
              {configurationTypes.find(t => t.value === type)?.label || type}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Display Value</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {configs.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell>
                      <Badge variant="outline">{config.configuration_key}</Badge>
                    </TableCell>
                    <TableCell>{config.configuration_value}</TableCell>
                    <TableCell>{config.display_order}</TableCell>
                    <TableCell>
                      <Badge variant={config.is_active ? "default" : "secondary"}>
                        {config.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConfigurationGroupDisplay;
