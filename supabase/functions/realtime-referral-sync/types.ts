
export interface RealTimeMessage {
  type: string;
  platformId?: string;
  credentials?: any;
  [key: string]: any;
}

export interface MockReferral {
  external_id: string;
  platform_id: string;
  source: string;
  status: string;
  priority: string;
  ai_score: number;
  created_at: string;
  ready_date: string;
  patient_name: string;
  patient_dob: string;
  patient_gender: string;
  diagnosis: string;
  diagnosis_codes: string[];
  referring_hospital: string;
  referring_physician: string;
  primary_insurance: string;
  estimated_los: number;
  estimated_daily_rate: number;
  acuity_level: number;
  clinical_notes: string;
}

export interface Platform {
  id: string;
  name: string;
  platform_type: string;
}
