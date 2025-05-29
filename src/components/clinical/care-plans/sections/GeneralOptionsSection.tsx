
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CarePlanConfig } from '../types';

interface GeneralOptionsSectionProps {
  config: CarePlanConfig;
  setConfig: React.Dispatch<React.SetStateAction<CarePlanConfig>>;
}

const GeneralOptionsSection = ({ config, setConfig }: GeneralOptionsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Next Review Date (days from start date of last review)</Label>
            <Input
              type="number"
              value={config.nextReviewDays}
              onChange={(e) => setConfig(prev => ({ ...prev, nextReviewDays: parseInt(e.target.value) }))}
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Intervention Position is Mandatory?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="interventionYes"
                  name="interventionMandatory"
                  checked={config.interventionPositionMandatory}
                  onChange={() => setConfig(prev => ({ ...prev, interventionPositionMandatory: true }))}
                />
                <Label htmlFor="interventionYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="interventionNo"
                  name="interventionMandatory"
                  checked={!config.interventionPositionMandatory}
                  onChange={() => setConfig(prev => ({ ...prev, interventionPositionMandatory: false }))}
                />
                <Label htmlFor="interventionNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Warn that a Progress Note may be required when care plan is edited?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="progressNoteYes"
                  name="progressNote"
                  checked={config.warnProgressNoteRequired}
                  onChange={() => setConfig(prev => ({ ...prev, warnProgressNoteRequired: true }))}
                />
                <Label htmlFor="progressNoteYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="progressNoteNo"
                  name="progressNote"
                  checked={!config.warnProgressNoteRequired}
                  onChange={() => setConfig(prev => ({ ...prev, warnProgressNoteRequired: false }))}
                />
                <Label htmlFor="progressNoteNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Warn if incomplete care plan items exist?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="incompleteYes"
                  name="incomplete"
                  checked={config.warnIncompleteItems}
                  onChange={() => setConfig(prev => ({ ...prev, warnIncompleteItems: true }))}
                />
                <Label htmlFor="incompleteYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="incompleteNo"
                  name="incomplete"
                  checked={!config.warnIncompleteItems}
                  onChange={() => setConfig(prev => ({ ...prev, warnIncompleteItems: false }))}
                />
                <Label htmlFor="incompleteNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>View number of triggered items on Care Plan Detail Page?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="triggeredYes"
                  name="triggered"
                  checked={config.viewTriggeredItems}
                  onChange={() => setConfig(prev => ({ ...prev, viewTriggeredItems: true }))}
                />
                <Label htmlFor="triggeredYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="triggeredNo"
                  name="triggered"
                  checked={!config.viewTriggeredItems}
                  onChange={() => setConfig(prev => ({ ...prev, viewTriggeredItems: false }))}
                />
                <Label htmlFor="triggeredNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Automatically close current care plan upon discharge (return not anticipated)?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="autoCloseYes"
                  name="autoClose"
                  checked={config.autoCloseOnDischarge}
                  onChange={() => setConfig(prev => ({ ...prev, autoCloseOnDischarge: true }))}
                />
                <Label htmlFor="autoCloseYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="autoCloseNo"
                  name="autoClose"
                  checked={!config.autoCloseOnDischarge}
                  onChange={() => setConfig(prev => ({ ...prev, autoCloseOnDischarge: false }))}
                />
                <Label htmlFor="autoCloseNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Show Care Plan Types:</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="showTypesYes"
                  name="showTypes"
                  checked={config.showCarePlanTypes}
                  onChange={() => setConfig(prev => ({ ...prev, showCarePlanTypes: true }))}
                />
                <Label htmlFor="showTypesYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="showTypesNo"
                  name="showTypes"
                  checked={!config.showCarePlanTypes}
                  onChange={() => setConfig(prev => ({ ...prev, showCarePlanTypes: false }))}
                />
                <Label htmlFor="showTypesNo">No</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralOptionsSection;
