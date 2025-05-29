
export interface DisplayInfoItem {
  focus: boolean;
  goal: boolean;
  intervention: boolean;
}

export interface CarePlanConfig {
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

export interface CarePlanConfigurationProps {
  onClose?: () => void;
}
