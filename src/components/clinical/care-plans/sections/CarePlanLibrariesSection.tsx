
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CarePlanConfig } from '../types';

interface CarePlanLibrariesSectionProps {
  config: CarePlanConfig;
  updateLibrary: (library: string, value: boolean) => void;
}

const CarePlanLibrariesSection = ({ config, updateLibrary }: CarePlanLibrariesSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Care Plan Libraries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(config.carePlanLibraries).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) => updateLibrary(key, checked as boolean)}
              />
              <Label htmlFor={key} className="text-sm">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarePlanLibrariesSection;
