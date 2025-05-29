
import { MdsData, CaaTrigger, CaaType } from '@/types/mds';

export class CaaEngine {
  static analyzeTriggers(mdsData: MdsData): CaaTrigger[] {
    const triggers: CaaTrigger[] = [];

    // CAA 1: Delirium
    const deliriumTrigger = this.checkDeliriumTriggers(mdsData);
    if (deliriumTrigger.triggered) {
      triggers.push(deliriumTrigger);
    }

    // CAA 2: Cognitive Loss/Dementia
    const cognitiveTrigger = this.checkCognitiveLossTriggers(mdsData);
    if (cognitiveTrigger.triggered) {
      triggers.push(cognitiveTrigger);
    }

    // CAA 3: Visual Function
    const visualTrigger = this.checkVisualFunctionTriggers(mdsData);
    if (visualTrigger.triggered) {
      triggers.push(visualTrigger);
    }

    // CAA 4: Communication
    const communicationTrigger = this.checkCommunicationTriggers(mdsData);
    if (communicationTrigger.triggered) {
      triggers.push(communicationTrigger);
    }

    // CAA 5: ADL Functional/Rehabilitation Potential
    const adlTrigger = this.checkAdlFunctionalTriggers(mdsData);
    if (adlTrigger.triggered) {
      triggers.push(adlTrigger);
    }

    // CAA 6: Urinary Incontinence and Indwelling Catheter
    const urinaryTrigger = this.checkUrinaryIncontinenceTriggers(mdsData);
    if (urinaryTrigger.triggered) {
      triggers.push(urinaryTrigger);
    }

    // CAA 7: Psychosocial Well-Being
    const psychosocialTrigger = this.checkPsychosocialTriggers(mdsData);
    if (psychosocialTrigger.triggered) {
      triggers.push(psychosocialTrigger);
    }

    // CAA 8: Mood State
    const moodTrigger = this.checkMoodStateTriggers(mdsData);
    if (moodTrigger.triggered) {
      triggers.push(moodTrigger);
    }

    // CAA 9: Behavioral Symptoms
    const behaviorTrigger = this.checkBehavioralSymptomsTriggers(mdsData);
    if (behaviorTrigger.triggered) {
      triggers.push(behaviorTrigger);
    }

    // CAA 10: Activities
    const activitiesTrigger = this.checkActivitiesTriggers(mdsData);
    if (activitiesTrigger.triggered) {
      triggers.push(activitiesTrigger);
    }

    // CAA 11: Falls
    const fallsTrigger = this.checkFallsTriggers(mdsData);
    if (fallsTrigger.triggered) {
      triggers.push(fallsTrigger);
    }

    // CAA 12: Nutritional Status
    const nutritionTrigger = this.checkNutritionalStatusTriggers(mdsData);
    if (nutritionTrigger.triggered) {
      triggers.push(nutritionTrigger);
    }

    // Continue with remaining CAAs...

    return triggers;
  }

  private static checkDeliriumTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check C1300 - Signs and Symptoms of Delirium (B through F)
    if (mdsData.section_c.c1300 === '1') {
      triggerItems.push('C1300 - Signs and Symptoms of Delirium present');
      triggered = true;
    }

    // Check C1600 - Acute Onset Mental Status Change
    if (['1', '2'].includes(mdsData.section_c.c1600)) {
      triggerItems.push('C1600 - Acute onset mental status change');
      triggered = true;
    }

    return {
      caa_type: 'delirium',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkCognitiveLossTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check C0500 - BIMS Summary Score (0-7 indicates cognitive impairment)
    if (mdsData.section_c.c0500 && ['0', '1', '2', '3', '4', '5', '6', '7'].includes(mdsData.section_c.c0500)) {
      triggerItems.push('C0500 - BIMS Summary Score indicates cognitive impairment');
      triggered = true;
    }

    // Check C1000 - Cognitive Skills for Daily Decision Making (2-4 indicates impairment)
    if (['2', '3', '4'].includes(mdsData.section_c.c1000)) {
      triggerItems.push('C1000 - Cognitive skills for daily decision making impaired');
      triggered = true;
    }

    // Check C0700 - Short-term Memory OK (1 indicates problem)
    if (mdsData.section_c.c0700 === '1') {
      triggerItems.push('C0700 - Short-term memory problem');
      triggered = true;
    }

    // Check C0800 - Long-term Memory OK (1 indicates problem)
    if (mdsData.section_c.c0800 === '1') {
      triggerItems.push('C0800 - Long-term memory problem');
      triggered = true;
    }

    return {
      caa_type: 'cognitive_loss',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkVisualFunctionTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check B1000 - Vision (1-3 indicates impairment)
    if (['1', '2', '3'].includes(mdsData.section_b.b1000)) {
      triggerItems.push('B1000 - Vision impairment identified');
      triggered = true;
    }

    return {
      caa_type: 'visual_function',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkCommunicationTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check B0200 - Hearing (2-3 indicates severe impairment)
    if (['2', '3'].includes(mdsData.section_b.b0200)) {
      triggerItems.push('B0200 - Hearing impairment');
      triggered = true;
    }

    // Check B0600 - Speech Clarity (2-3 indicates unclear speech)
    if (['2', '3'].includes(mdsData.section_b.b0600)) {
      triggerItems.push('B0600 - Speech clarity problems');
      triggered = true;
    }

    // Check B0700 - Makes Self Understood (2-3 indicates difficulty)
    if (['2', '3'].includes(mdsData.section_b.b0700)) {
      triggerItems.push('B0700 - Difficulty making self understood');
      triggered = true;
    }

    // Check B0800 - Ability to Understand Others (2-3 indicates difficulty)
    if (['2', '3'].includes(mdsData.section_b.b0800)) {
      triggerItems.push('B0800 - Difficulty understanding others');
      triggered = true;
    }

    return {
      caa_type: 'communication',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkAdlFunctionalTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check G0110 through G0200 for ADL dependencies (3-4 indicates extensive assistance/total dependence)
    const adlItems = [
      { code: 'G0110', name: 'Bed Mobility', value: mdsData.section_g.g0110 },
      { code: 'G0120', name: 'Transfer', value: mdsData.section_g.g0120 },
      { code: 'G0130', name: 'Walk in Room', value: mdsData.section_g.g0130 },
      { code: 'G0140', name: 'Walk in Corridor', value: mdsData.section_g.g0140 },
      { code: 'G0150', name: 'Locomotion on Unit', value: mdsData.section_g.g0150 },
      { code: 'G0160', name: 'Locomotion off Unit', value: mdsData.section_g.g0160 },
      { code: 'G0170', name: 'Dressing', value: mdsData.section_g.g0170 },
      { code: 'G0180', name: 'Eating', value: mdsData.section_g.g0180 },
      { code: 'G0190', name: 'Toilet Use', value: mdsData.section_g.g0190 },
      { code: 'G0200', name: 'Personal Hygiene', value: mdsData.section_g.g0200 }
    ];

    for (const item of adlItems) {
      if (['3', '4'].includes(item.value)) {
        triggerItems.push(`${item.code} - ${item.name} requires extensive assistance or total dependence`);
        triggered = true;
      }
    }

    // Check G0600 - Functional Rehabilitation Potential
    if (['1', '2'].includes(mdsData.section_g.g0600)) {
      triggerItems.push('G0600 - Functional rehabilitation potential identified');
      triggered = true;
    }

    return {
      caa_type: 'adl_functional_rehab',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkUrinaryIncontinenceTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check H0100 - Urinary Continence (2-4 indicates incontinence)
    if (['2', '3', '4'].includes(mdsData.section_h.h0100)) {
      triggerItems.push('H0100 - Urinary incontinence present');
      triggered = true;
    }

    // Check H0300 - Urinary Continence (any value 1-4 indicates issue)
    if (['1', '2', '3', '4'].includes(mdsData.section_h.h0300)) {
      triggerItems.push('H0300 - Urinary continence issues');
      triggered = true;
    }

    return {
      caa_type: 'urinary_incontinence',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkPsychosocialTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check F0400 - Interview for Daily Preferences (indicates preferences not met)
    if (['1', '2', '3'].includes(mdsData.section_f.f0400)) {
      triggerItems.push('F0400 - Daily preferences not being met');
      triggered = true;
    }

    // Check F0500 - Interview for Activity Preferences 
    if (['1', '2', '3'].includes(mdsData.section_f.f0500)) {
      triggerItems.push('F0500 - Activity preferences not being met');
      triggered = true;
    }

    return {
      caa_type: 'psychosocial_wellbeing',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkMoodStateTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check D0300 - PHQ-9 Total Severity Score (3+ indicates depression)
    if (['3', '4'].includes(mdsData.section_d.d0300)) {
      triggerItems.push('D0300 - PHQ-9 indicates potential depression');
      triggered = true;
    }

    // Check D0600 - Total Severity Score (3+ indicates mood issues)
    if (['3', '4'].includes(mdsData.section_d.d0600)) {
      triggerItems.push('D0600 - Staff assessment indicates mood concerns');
      triggered = true;
    }

    return {
      caa_type: 'mood_state',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkBehavioralSymptomsTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check E0100 - Rejection of Care (1+ indicates behavior present)
    if (['1', '2', '3'].includes(mdsData.section_e.e0100)) {
      triggerItems.push('E0100 - Rejection of care behaviors present');
      triggered = true;
    }

    // Check E0200 - Wandering
    if (['1', '2', '3'].includes(mdsData.section_e.e0200)) {
      triggerItems.push('E0200 - Wandering behaviors present');
      triggered = true;
    }

    // Check E0800 - Behavioral Symptoms Directed Toward Others
    if (['1', '2', '3'].includes(mdsData.section_e.e0800)) {
      triggerItems.push('E0800 - Behavioral symptoms directed toward others');
      triggered = true;
    }

    // Check E0900 - Behavioral Symptoms Not Directed Toward Others
    if (['1', '2', '3'].includes(mdsData.section_e.e0900)) {
      triggerItems.push('E0900 - Behavioral symptoms not directed toward others');
      triggered = true;
    }

    return {
      caa_type: 'behavioral_symptoms',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkActivitiesTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check F0500 - Interview for Activity Preferences (indicates lack of meaningful activities)
    if (['2', '3'].includes(mdsData.section_f.f0500)) {
      triggerItems.push('F0500 - Activity preferences indicate need for enhanced programming');
      triggered = true;
    }

    return {
      caa_type: 'activities',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkFallsTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // Check for fall-related diagnoses in Section I
    // This would typically check specific ICD-10 codes related to fall history
    // For now, we'll use functional status as a proxy for fall risk

    // Check G0130/G0140 - Walking abilities (indicating fall risk)
    if (['2', '3', '4', '8'].includes(mdsData.section_g.g0130) || 
        ['2', '3', '4', '8'].includes(mdsData.section_g.g0140)) {
      triggerItems.push('G0130/G0140 - Walking impairment increases fall risk');
      triggered = true;
    }

    // Check cognitive impairment as fall risk factor
    if (['2', '3', '4'].includes(mdsData.section_c.c1000)) {
      triggerItems.push('C1000 - Cognitive impairment increases fall risk');
      triggered = true;
    }

    return {
      caa_type: 'falls',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  private static checkNutritionalStatusTriggers(mdsData: MdsData): CaaTrigger {
    const triggerItems: string[] = [];
    let triggered = false;

    // This would typically check Section K items for nutritional status
    // For now, we'll use eating assistance as a proxy
    if (['2', '3', '4'].includes(mdsData.section_g.g0180)) {
      triggerItems.push('G0180 - Eating assistance indicates potential nutritional concerns');
      triggered = true;
    }

    return {
      caa_type: 'nutritional_status',
      triggered,
      trigger_items: triggerItems,
      investigation_required: triggered,
      investigation_completed: false,
      proceed_to_care_planning: false,
      rationale: triggered ? 'Automatic trigger based on MDS items' : 'No triggers identified'
    };
  }

  // Helper method to get CAA descriptions
  static getCaaDescription(caaType: CaaType): string {
    const descriptions = {
      'delirium': 'Delirium',
      'cognitive_loss': 'Dementia and Cognitive Loss',
      'visual_function': 'Visual Function',
      'communication': 'Communication',
      'adl_functional_rehab': 'ADL Functional/Rehabilitation Potential',
      'urinary_incontinence': 'Urinary Incontinence and Indwelling Catheter',
      'psychosocial_wellbeing': 'Psychosocial Well-Being',
      'mood_state': 'Mood State',
      'behavioral_symptoms': 'Behavioral Symptoms',
      'activities': 'Activities',
      'falls': 'Falls',
      'nutritional_status': 'Nutritional Status',
      'feeding_tube': 'Feeding Tube',
      'dehydration': 'Dehydration/Fluid Maintenance',
      'dental_care': 'Dental Care',
      'pressure_ulcer': 'Pressure Ulcer',
      'psychotropic_drug_use': 'Psychotropic Drug Use',
      'physical_restraints': 'Physical Restraints',
      'pain': 'Pain'
    };
    return descriptions[caaType] || caaType;
  }
}
