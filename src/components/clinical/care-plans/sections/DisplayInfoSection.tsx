
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CarePlanConfig } from '../types';

interface DisplayInfoSectionProps {
  config: CarePlanConfig;
  updateDisplayInfo: (field: string, section: string, value: boolean) => void;
}

const DisplayInfoSection = ({ config, updateDisplayInfo }: DisplayInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Display the following information on the Care Plan Report:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left"></th>
                <th className="border border-gray-300 p-2 text-center">Focus</th>
                <th className="border border-gray-300 p-2 text-center">Goal</th>
                <th className="border border-gray-300 p-2 text-center">Intervention</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(config.displayInfo).map(([field, values]) => (
                <tr key={field}>
                  <td className="border border-gray-300 p-2 font-medium">
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <Checkbox
                      checked={values.focus}
                      onCheckedChange={(checked) => updateDisplayInfo(field, 'focus', checked as boolean)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <Checkbox
                      checked={values.goal}
                      onCheckedChange={(checked) => updateDisplayInfo(field, 'goal', checked as boolean)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <Checkbox
                      checked={values.intervention}
                      onCheckedChange={(checked) => updateDisplayInfo(field, 'intervention', checked as boolean)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplayInfoSection;
