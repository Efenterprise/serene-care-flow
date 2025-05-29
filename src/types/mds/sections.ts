
// MDS 3.0 Section Interfaces - Complete Implementation

import type { AssessmentType } from './core';

// Section A: Identification Information
export interface SectionA {
  a0100: string; // Facility Provider Number
  a0200: string; // Type of Provider
  a0310: AssessmentType; // Type of Assessment
  a0320: string; // Voided Assessment
  a1000: string; // Federal OBRA Reason for Assessment
  a1005: string; // Entered From
  a1010: string; // Admission Date
  a1700: string; // Medicaid Number
  a1800: string; // Medicare Number
  a2000?: string; // Type of Provider
  a2100?: string; // Medical Record Number
  a2300?: string; // Medicare Part A Stay
  a2400?: string; // Type of Assessment
  completed: boolean;
}

// Section B: Hearing, Speech, and Vision
export interface SectionB {
  b0100: '0' | '1' | '2' | '3'; // Comatose
  b0200: '0' | '1' | '2' | '3'; // Hearing
  b0300: '0' | '1' | '2' | '3'; // Hearing Aid
  b0600: '0' | '1' | '2' | '3'; // Speech Clarity
  b0700: '0' | '1' | '2' | '3'; // Makes Self Understood
  b0800: '0' | '1' | '2' | '3'; // Ability to Understand Others
  b1000: '0' | '1' | '2' | '3'; // Vision
  b1200: '0' | '1' | '2' | '3'; // Visual Appliances
  completed: boolean;
}

// Section C: Cognitive Patterns
export interface SectionC {
  c0100: '0' | '1' | '2' | '3' | '4'; // Should Brief Interview for Mental Status be Conducted?
  c0200: '0' | '1' | '2' | '3' | '4'; // Repetition of Three Words
  c0300: '0' | '1' | '2' | '3' | '4'; // Temporal Orientation
  c0400: '0' | '1' | '2' | '3' | '4'; // Recall
  c0500: '0' | '1' | '2' | '3' | '4'; // BIMS Summary Score
  c0600: '0' | '1' | '2' | '3' | '4'; // Should Staff Assessment for Mental Status be Conducted?
  c0700: '0' | '1' | '2' | '3' | '4'; // Short-term Memory OK
  c0800: '0' | '1' | '2' | '3' | '4'; // Long-term Memory OK
  c0900: '0' | '1' | '2' | '3' | '4'; // Memory/Recall Ability
  c1000: '0' | '1' | '2' | '3' | '4'; // Cognitive Skills for Daily Decision Making
  c1300: '0' | '1'; // Signs and Symptoms of Delirium
  c1600: '0' | '1' | '2' | '3'; // Acute Onset Mental Status Change
  completed: boolean;
}

// Section D: Mood
export interface SectionD {
  d0100: '0' | '1' | '2' | '3'; // Should Resident Mood Interview be Conducted?
  d0200: '0' | '1' | '2'; // Resident Mood Interview
  d0300: '0' | '1' | '2' | '3'; // PHQ-9 Total Severity Score
  d0350: '0' | '1' | '2' | '3'; // Should Staff Assessment for Mood be Conducted?
  d0500: '0' | '1' | '2' | '3'; // Staff Assessment Mental Status Indicators
  d0600: '0' | '1' | '2' | '3'; // Total Severity Score
  completed: boolean;
}

// Section E: Behavior
export interface SectionE {
  e0100: '0' | '1' | '2' | '3'; // Rejection of Care
  e0200: '0' | '1' | '2' | '3'; // Wandering
  e0800: '0' | '1' | '2' | '3'; // Behavioral Symptoms Directed Toward Others
  e0900: '0' | '1' | '2' | '3'; // Behavioral Symptoms Not Directed Toward Others
  e1000: '0' | '1' | '2' | '3'; // Behavioral Symptom Frequency
  e1100: '0' | '1' | '2' | '3'; // Behavioral Symptom Alterability
  completed: boolean;
}

// Section F: Preferences for Customary Routine and Activities
export interface SectionF {
  f0300: '0' | '1' | '2' | '3'; // Should Interview for Daily and Activity Preferences be Conducted?
  f0400: '0' | '1' | '2' | '3'; // Interview for Daily Preferences
  f0500: '0' | '1' | '2' | '3'; // Interview for Activity Preferences
  f0600: '0' | '1' | '2' | '3'; // Should Staff Assessment for Daily and Activity Preferences be Conducted?
  f0700: '0' | '1' | '2' | '3'; // Staff Assessment Daily Preferences
  f0800: '0' | '1' | '2' | '3'; // Staff Assessment Activity Preferences
  completed: boolean;
}

// Section G: Functional Status
export interface SectionG {
  g0110: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Bed Mobility
  g0120: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Transfer
  g0130: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Walk in Room
  g0140: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Walk in Corridor
  g0150: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Locomotion on Unit
  g0160: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Locomotion off Unit
  g0170: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Dressing
  g0180: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Eating
  g0190: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Toilet Use
  g0200: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Activities of Daily Living Assistance - Personal Hygiene
  g0300: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Bathing
  g0400: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Functional Limitation in Range of Motion
  g0600: '0' | '1' | '2' | '3' | '4' | '7' | '8'; // Functional Rehabilitation Potential
  completed: boolean;
}

// Section H: Bladder and Bowel
export interface SectionH {
  h0100: '0' | '1' | '2' | '3' | '4' | '8' | '9'; // Continence Self-Control Categories - Urinary
  h0200: '0' | '1' | '2' | '3' | '4' | '8' | '9'; // Continence Self-Control Categories - Bowel
  h0300: '0' | '1' | '2' | '3' | '4' | '8' | '9'; // Urinary Continence
  h0400: '0' | '1' | '2' | '3' | '4' | '8' | '9'; // Bowel Continence
  h0500: '0' | '1' | '2' | '3' | '4' | '8' | '9'; // Constructs and Programs - Bladder
  h0600: '0' | '1' | '2' | '3' | '4' | '8' | '9'; // Constructs and Programs - Bowel
  completed: boolean;
}

// Section I: Active Diagnoses
export interface SectionI {
  i0100?: string[]; // Active Diagnoses - Endocrine/Nutritional/Metabolic
  i0200?: string[]; // Active Diagnoses - Heart/Circulation
  i0300?: string[]; // Active Diagnoses - Musculoskeletal
  i0400?: string[]; // Active Diagnoses - Neurological
  i0500?: string[]; // Active Diagnoses - Pulmonary
  i0600?: string[]; // Active Diagnoses - Sensory
  i0700?: string[]; // Active Diagnoses - Infections
  i0800?: string[]; // Active Diagnoses - Other
  i0900?: string[]; // Active Diagnoses - None of Above
  i1000?: string[]; // ICD-10 Codes
  i1200?: string[]; // Other Current or More Detailed Diagnoses
  i1400?: string[]; // Conditions Related to MR/DD Status
  i1500?: string[]; // Drug Regimen Review
  i1550?: string[]; // Irregular Medications
  i1700?: string[]; // Physician Review
  i2000?: string[]; // Participation in Clinical Research
  i2100?: string[]; // DNR Status
  i2200?: string[]; // Advance Directives
  i2300?: string[]; // Physician Orders for Life-Sustaining Treatment
  i2400?: string[]; // Feeding Restrictions
  i2500?: string[]; // Nutritional Approaches
  completed: boolean;
}

// Section J: Health Conditions
export interface SectionJ {
  j0100?: '0' | '1' | '2' | '3'; // Problem Conditions
  j0200?: '0' | '1' | '2' | '3'; // Pain Management
  j0300?: '0' | '1' | '2' | '3'; // Problem Conditions
  j0400?: '0' | '1' | '2' | '3'; // Problem Conditions
  j0500?: '0' | '1' | '2' | '3'; // Problem Conditions
  j0600?: '0' | '1' | '2' | '3'; // Stability of Conditions
  j1100?: '0' | '1'; // Shortness of Breath
  j1400?: '0' | '1'; // Problem Conditions - Swallowing Disorder
  j1550?: '0' | '1'; // Problem Conditions - Other
  j1700?: '0' | '1'; // Fall Risk Assessment
  j1800?: '0' | '1'; // Falls
  j1900?: '0' | '1'; // Number of Falls Since Admission
  completed: boolean;
}

// Section K: Swallowing/Nutritional Status
export interface SectionK {
  k0100?: '0' | '1' | '2' | '3'; // Swallowing Disorder
  k0200?: '0' | '1' | '2' | '3'; // Height and Weight
  k0300?: '0' | '1' | '2' | '3'; // Weight Loss
  k0510?: '0' | '1' | '2' | '3'; // Nutritional Approaches
  k0520?: '0' | '1' | '2' | '3'; // Feeding Tube
  k0700?: '0' | '1' | '2' | '3'; // Appetite
  k0800?: '0' | '1' | '2' | '3'; // Fluid Orders
  k0900?: '0' | '1' | '2' | '3'; // Fluid Input
  completed: boolean;
}

// Section L: Oral/Dental Status
export interface SectionL {
  l0100?: '0' | '1' | '2' | '3'; // Oral Health Problems
  l0200?: '0' | '1' | '2' | '3'; // Dental
  completed: boolean;
}

// Section M: Skin Conditions
export interface SectionM {
  m0100?: '0' | '1' | '2' | '3'; // Determination of Pressure Ulcer Risk
  m0150?: '0' | '1' | '2' | '3'; // Risk of Developing Pressure Ulcers
  m0200?: '0' | '1' | '2' | '3'; // Pressure Ulcer or Injury
  m0300?: '0' | '1' | '2' | '3' | '4' | '9'; // Current Number of Pressure Ulcers/Injuries
  m0400?: '0' | '1' | '2' | '3' | '4' | '9'; // Highest Stage of Pressure Ulcers/Injuries
  m0500?: '0' | '1' | '2' | '3' | '4' | '9'; // Pressure Ulcer/Injury Healing
  m0610?: '0' | '1' | '2' | '3'; // Other Ulcers, Wounds, and Skin Problems
  m0700?: '0' | '1' | '2' | '3'; // Most Severe Tissue Type
  m0800?: '0' | '1' | '2' | '3'; // Worsening in Ulcer Status
  completed: boolean;
}

// Section N: Medications
export interface SectionN {
  n0100?: '0' | '1' | '2' | '3'; // Number of Medications
  n0300?: '0' | '1'; // Injections
  n0350?: '0' | '1'; // Insulin
  n0400?: '0' | '1'; // Antipsychotic Medications
  n0410?: '0' | '1'; // Antianxiety/Hypnotic Medications
  n0450?: '0' | '1'; // Antidepressant Medications
  n0500?: '0' | '1'; // Anticoagulant Medications
  n0510?: '0' | '1'; // Diuretic Medications
  completed: boolean;
}

// Section O: Special Treatments and Procedures
export interface SectionO {
  o0100?: '0' | '1'; // Special Treatments and Procedures
  o0200?: '0' | '1'; // IV Medications
  o0250?: '0' | '1'; // Intake/Output
  o0300?: '0' | '1'; // Enteral/Parenteral Nutrition
  o0400?: string; // Therapy - Speech-Language Pathology
  o0410?: string; // Therapy - Speech-Language Pathology
  o0420?: string; // Therapy - Occupational Therapy
  o0430?: string; // Therapy - Occupational Therapy
  o0440?: string; // Therapy - Physical Therapy
  o0450?: string; // Therapy - Physical Therapy
  o0500?: '0' | '1'; // Respiratory Treatments
  o0600?: '0' | '1'; // Other
  completed: boolean;
}

// Section P: Restraints
export interface SectionP {
  p0100?: '0' | '1'; // Physical Restraints
  p0200?: '0' | '1'; // Chair Prevents Rising
  completed: boolean;
}

// Section Q: Participation in Assessment and Goal Setting
export interface SectionQ {
  q0100?: '0' | '1' | '2' | '3'; // Participation in Assessment
  q0200?: '0' | '1' | '2' | '3'; // Participation in Current Care Planning
  completed: boolean;
}

// Section V: Care Area Assessment (CAA)
export interface SectionV {
  caa_summary?: {
    [key: string]: {
      triggered: boolean;
      addressed_in_care_plan: boolean;
      rationale: string;
    };
  };
  completed: boolean;
}

// Section X: Correction Request
export interface SectionX {
  x0100?: string; // Correction Request
  x0150?: string; // Medicare Part A Stay
  completed: boolean;
}

// Section Z: Assessment Administration
export interface SectionZ {
  z0100?: string; // Medicare Part A Billing
  z0150?: string; // Medicare HIPPS Code
  z0200?: string; // Medicare Part A Assessment
  z0250?: string; // Medicare Part A Episode Payment
  z0300?: string; // Medicare Part A HIPPS Code
  z0350?: string; // Medicare Part A Assessment
  z0400?: string; // Medicare Part A Non-Therapy Ancillary Services
  z0500?: string; // Medicare Part A Assessment
  z0600?: string; // Medicare Assessment Completion Date
  completed: boolean;
}
