
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CarePlanConfig } from '../types';

interface CareRecordReportSectionProps {
  config: CarePlanConfig;
  setConfig: React.Dispatch<React.SetStateAction<CarePlanConfig>>;
}

const CareRecordReportSection = ({ config, setConfig }: CareRecordReportSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Care Record Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Enable blank rows at end of Care Record?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="blankRowsYes"
                name="blankRows"
                checked={config.enableBlankRowsAtEnd}
                onChange={() => setConfig(prev => ({ ...prev, enableBlankRowsAtEnd: true }))}
              />
              <Label htmlFor="blankRowsYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="blankRowsNo"
                name="blankRows"
                checked={!config.enableBlankRowsAtEnd}
                onChange={() => setConfig(prev => ({ ...prev, enableBlankRowsAtEnd: false }))}
              />
              <Label htmlFor="blankRowsNo">No</Label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Include Resident Photo on Care Record?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="photoYes"
                name="photo"
                checked={config.includeResidentPhoto}
                onChange={() => setConfig(prev => ({ ...prev, includeResidentPhoto: true }))}
              />
              <Label htmlFor="photoYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="photoNo"
                name="photo"
                checked={!config.includeResidentPhoto}
                onChange={() => setConfig(prev => ({ ...prev, includeResidentPhoto: false }))}
              />
              <Label htmlFor="photoNo">No</Label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Enable Signature Lines on Care Record report?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="sigLinesYes"
                name="sigLines"
                checked={config.enableSignatureLines}
                onChange={() => setConfig(prev => ({ ...prev, enableSignatureLines: true }))}
              />
              <Label htmlFor="sigLinesYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="sigLinesNo"
                name="sigLines"
                checked={!config.enableSignatureLines}
                onChange={() => setConfig(prev => ({ ...prev, enableSignatureLines: false }))}
              />
              <Label htmlFor="sigLinesNo">No</Label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Display Date of Birth on Care Record report?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="dobYes"
                name="dob"
                checked={config.displayDateOfBirth}
                onChange={() => setConfig(prev => ({ ...prev, displayDateOfBirth: true }))}
              />
              <Label htmlFor="dobYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="dobNo"
                name="dob"
                checked={!config.displayDateOfBirth}
                onChange={() => setConfig(prev => ({ ...prev, displayDateOfBirth: false }))}
              />
              <Label htmlFor="dobNo">No</Label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Include Print Date on Care Record Report?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="printDateYes"
                name="printDate"
                checked={config.includePrintDate}
                onChange={() => setConfig(prev => ({ ...prev, includePrintDate: true }))}
              />
              <Label htmlFor="printDateYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="printDateNo"
                name="printDate"
                checked={!config.includePrintDate}
                onChange={() => setConfig(prev => ({ ...prev, includePrintDate: false }))}
              />
              <Label htmlFor="printDateNo">No</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareRecordReportSection;
