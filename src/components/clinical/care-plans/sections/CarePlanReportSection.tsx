
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CarePlanConfig } from '../types';

interface CarePlanReportSectionProps {
  config: CarePlanConfig;
  setConfig: React.Dispatch<React.SetStateAction<CarePlanConfig>>;
}

const CarePlanReportSection = ({ config, setConfig }: CarePlanReportSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Care Plan Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <Label>Include Resident Photo on Care Plan?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="planPhotoYes"
                  name="planPhoto"
                  checked={config.includeResidentPhotoOnPlan}
                  onChange={() => setConfig(prev => ({ ...prev, includeResidentPhotoOnPlan: true }))}
                />
                <Label htmlFor="planPhotoYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="planPhotoNo"
                  name="planPhoto"
                  checked={!config.includeResidentPhotoOnPlan}
                  onChange={() => setConfig(prev => ({ ...prev, includeResidentPhotoOnPlan: false }))}
                />
                <Label htmlFor="planPhotoNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Enable blank rows at end of Care Plan?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="planBlankYes"
                  name="planBlank"
                  checked={config.enableBlankRowsAtEndOfPlan}
                  onChange={() => setConfig(prev => ({ ...prev, enableBlankRowsAtEndOfPlan: true }))}
                />
                <Label htmlFor="planBlankYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="planBlankNo"
                  name="planBlank"
                  checked={!config.enableBlankRowsAtEndOfPlan}
                  onChange={() => setConfig(prev => ({ ...prev, enableBlankRowsAtEndOfPlan: false }))}
                />
                <Label htmlFor="planBlankNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Insert page break after every focus on Care Plan Report?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="pageBreakYes"
                  name="pageBreak"
                  checked={config.insertPageBreakAfterFocus}
                  onChange={() => setConfig(prev => ({ ...prev, insertPageBreakAfterFocus: true }))}
                />
                <Label htmlFor="pageBreakYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="pageBreakNo"
                  name="pageBreak"
                  checked={!config.insertPageBreakAfterFocus}
                  onChange={() => setConfig(prev => ({ ...prev, insertPageBreakAfterFocus: false }))}
                />
                <Label htmlFor="pageBreakNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Enable page numbers on Care Plan report?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="pageNumYes"
                  name="pageNum"
                  checked={config.enablePageNumbers}
                  onChange={() => setConfig(prev => ({ ...prev, enablePageNumbers: true }))}
                />
                <Label htmlFor="pageNumYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="pageNumNo"
                  name="pageNum"
                  checked={!config.enablePageNumbers}
                  onChange={() => setConfig(prev => ({ ...prev, enablePageNumbers: false }))}
                />
                <Label htmlFor="pageNumNo">No</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Enable Signature Lines on Care Plan report?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="planSigYes"
                  name="planSig"
                  checked={config.enableSignatureLinesOnPlan}
                  onChange={() => setConfig(prev => ({ ...prev, enableSignatureLinesOnPlan: true }))}
                />
                <Label htmlFor="planSigYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="planSigNo"
                  name="planSig"
                  checked={!config.enableSignatureLinesOnPlan}
                  onChange={() => setConfig(prev => ({ ...prev, enableSignatureLinesOnPlan: false }))}
                />
                <Label htmlFor="planSigNo">No</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Signature Page text</Label>
            <Textarea
              value={config.signaturePageText}
              onChange={(e) => setConfig(prev => ({ ...prev, signaturePageText: e.target.value }))}
              placeholder="Enter signature page text..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-500">Limit of 711 characters/9 Lines</p>
          </div>

          <div className="flex items-center justify-between">
            <Label>My facility hole punches the Care Plan Report on:</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="punchTop"
                  name="punch"
                  checked={config.facilityHolePunch === 'top'}
                  onChange={() => setConfig(prev => ({ ...prev, facilityHolePunch: 'top' }))}
                />
                <Label htmlFor="punchTop">Top</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="punchLeft"
                  name="punch"
                  checked={config.facilityHolePunch === 'left'}
                  onChange={() => setConfig(prev => ({ ...prev, facilityHolePunch: 'left' }))}
                />
                <Label htmlFor="punchLeft">Left</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Include Last Review Date on Care Plan Report?</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="lastReviewYes"
                  name="lastReview"
                  checked={config.includeLastReviewDate}
                  onChange={() => setConfig(prev => ({ ...prev, includeLastReviewDate: true }))}
                />
                <Label htmlFor="lastReviewYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="lastReviewNo"
                  name="lastReview"
                  checked={!config.includeLastReviewDate}
                  onChange={() => setConfig(prev => ({ ...prev, includeLastReviewDate: false }))}
                />
                <Label htmlFor="lastReviewNo">No</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarePlanReportSection;
