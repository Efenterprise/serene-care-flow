
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  X,
  Settings
} from 'lucide-react';

interface CarePlanConfigurationProps {
  onClose?: () => void;
}

interface DisplayInfoItem {
  focus: boolean;
  goal: boolean;
  intervention: boolean;
}

interface CarePlanConfig {
  nextReviewDays: number;
  interventionPositionMandatory: boolean;
  warnProgressNoteRequired: boolean;
  warnIncompleteItems: boolean;
  viewTriggeredItems: boolean;
  autoCloseOnDischarge: boolean;
  showCarePlanTypes: boolean;
  carePlanLibraries: {
    admission: boolean;
    covidCareplan: boolean;
    covidCareplans: boolean;
    pccDefaultLibrary: boolean;
    placeholder: boolean;
    sncCarePlanLibrary: boolean;
    standardCarePlanLibrary: boolean;
  };
  enableBlankRowsAtEnd: boolean;
  includeResidentPhoto: boolean;
  enableSignatureLines: boolean;
  displayDateOfBirth: boolean;
  includePrintDate: boolean;
  includeResidentPhotoOnPlan: boolean;
  enableBlankRowsAtEndOfPlan: boolean;
  insertPageBreakAfterFocus: boolean;
  enablePageNumbers: boolean;
  enableSignatureLinesOnPlan: boolean;
  signaturePageText: string;
  includeAllergies: boolean;
  includeDiagnoses: boolean;
  includeSpecialInstructionsFirstPage: boolean;
  includeSpecialInstructionsKardex: boolean;
  includePrintDateOnPlan: boolean;
  facilityHolePunch: string;
  includeLastReviewDate: boolean;
  displayInfo: {
    dateInitiated: DisplayInfoItem;
    createdDate: DisplayInfoItem;
    createdBy: DisplayInfoItem;
    revisionDate: DisplayInfoItem;
    revisionBy: DisplayInfoItem;
    targetDate: DisplayInfoItem;
  };
}

const CarePlanConfiguration = ({ onClose }: CarePlanConfigurationProps) => {
  const [config, setConfig] = useState<CarePlanConfig>({
    // General Options
    nextReviewDays: 90,
    interventionPositionMandatory: true,
    warnProgressNoteRequired: false,
    warnIncompleteItems: true,
    viewTriggeredItems: true,
    autoCloseOnDischarge: true,
    showCarePlanTypes: true,
    
    // Care Plan Libraries
    carePlanLibraries: {
      admission: true,
      covidCareplan: true,
      covidCareplans: false,
      pccDefaultLibrary: true,
      placeholder: false,
      sncCarePlanLibrary: true,
      standardCarePlanLibrary: false
    },

    // Care Record Report
    enableBlankRowsAtEnd: false,
    includeResidentPhoto: false,
    enableSignatureLines: true,
    displayDateOfBirth: true,
    includePrintDate: false,

    // Care Plan Report
    includeResidentPhotoOnPlan: false,
    enableBlankRowsAtEndOfPlan: false,
    insertPageBreakAfterFocus: false,
    enablePageNumbers: true,
    enableSignatureLinesOnPlan: true,
    signaturePageText: '',
    includeAllergies: false,
    includeDiagnoses: false,
    includeSpecialInstructionsFirstPage: true,
    includeSpecialInstructionsKardex: true,
    includePrintDateOnPlan: false,
    facilityHolePunch: 'left',
    includeLastReviewDate: false,

    // Display Information Table
    displayInfo: {
      dateInitiated: { focus: true, goal: true, intervention: true },
      createdDate: { focus: false, goal: false, intervention: false },
      createdBy: { focus: false, goal: false, intervention: false },
      revisionDate: { focus: true, goal: true, intervention: true },
      revisionBy: { focus: false, goal: false, intervention: false },
      targetDate: { focus: false, goal: true, intervention: false }
    }
  });

  const handleSave = () => {
    console.log('Saving care plan configuration:', config);
    // Here you would typically save to your backend
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  const updateLibrary = (library: string, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      carePlanLibraries: {
        ...prev.carePlanLibraries,
        [library]: value
      }
    }));
  };

  const updateDisplayInfo = (field: string, section: string, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      displayInfo: {
        ...prev.displayInfo,
        [field]: {
          ...prev.displayInfo[field as keyof typeof prev.displayInfo],
          [section]: value
        }
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="text-xl font-semibold">Care Plan Configuration</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* General Options */}
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

          {/* Care Plan Libraries */}
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

          {/* Care Record Report */}
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

          {/* Care Plan Report */}
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

          {/* Display Information Table */}
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
        </div>
      </div>
    </div>
  );
};

export default CarePlanConfiguration;
