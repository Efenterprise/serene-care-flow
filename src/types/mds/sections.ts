
// MDS 3.0 Section Interfaces

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
  i0100: string[]; // Active Diagnoses - Endocrine/Nutritional/Metabolic
  i0200: string[]; // Active Diagnoses - Heart/Circulation
  i0300: string[]; // Active Diagnoses - Musculoskeletal
  i0400: string[]; // Active Diagnoses - Neurological
  i0500: string[]; // Active Diagnoses - Pulmonary
  i0600: string[]; // Active Diagnoses - Sensory
  i0700: string[]; // Active Diagnoses - Infections
  i0800: string[]; // Active Diagnoses - Other
  i0900: string[]; // Active Diagnoses - None of Above
  completed: boolean;
}

// Remaining sections with basic structure
export interface SectionJ {
  // Health Conditions
  completed: boolean;
}

export interface SectionK {
  // Swallowing/Nutritional Status
  completed: boolean;
}

export interface SectionL {
  // Oral/Dental Status
  completed: boolean;
}

export interface SectionM {
  // Skin Conditions
  completed: boolean;
}

export interface SectionN {
  // Medications
  completed: boolean;
}

export interface SectionO {
  // Special Treatments and Procedures
  completed: boolean;
}

export interface SectionP {
  // Restraints
  completed: boolean;
}

export interface SectionQ {
  // Participation in Assessment and Goal Setting
  completed: boolean;
}

export interface SectionV {
  // Care Area Assessment (CAA)
  completed: boolean;
}

export interface SectionX {
  // Correction Request
  completed: boolean;
}

export interface SectionZ {
  // Assessment Administration
  completed: boolean;
}
