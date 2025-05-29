
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, X, Settings } from 'lucide-react';
import { CarePlanConfig, CarePlanConfigurationProps } from './types';
import GeneralOptionsSection from './sections/GeneralOptionsSection';
import CarePlanLibrariesSection from './sections/CarePlanLibrariesSection';
import CareRecordReportSection from './sections/CareRecordReportSection';
import CarePlanReportSection from './sections/CarePlanReportSection';
import DisplayInfoSection from './sections/DisplayInfoSection';

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
          <GeneralOptionsSection config={config} setConfig={setConfig} />
          <CarePlanLibrariesSection config={config} updateLibrary={updateLibrary} />
          <CareRecordReportSection config={config} setConfig={setConfig} />
          <CarePlanReportSection config={config} setConfig={setConfig} />
          <DisplayInfoSection config={config} updateDisplayInfo={updateDisplayInfo} />
        </div>
      </div>
    </div>
  );
};

export default CarePlanConfiguration;
