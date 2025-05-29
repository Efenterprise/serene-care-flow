
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { MockReferral, Platform } from "./types.ts";

const MOCK_PATIENTS = [
  { name: "John Smith", dob: "1945-03-15", gender: "Male", diagnosis: "Hip Fracture Recovery" },
  { name: "Mary Johnson", dob: "1938-07-22", gender: "Female", diagnosis: "Stroke Recovery" },
  { name: "Robert Davis", dob: "1952-11-08", gender: "Male", diagnosis: "Post-Surgical Care" },
  { name: "Linda Wilson", dob: "1940-05-12", gender: "Female", diagnosis: "Pneumonia Recovery" }
];

export async function simulateNewReferrals(platformId: string, supabase: SupabaseClient): Promise<MockReferral[]> {
  const { data: platform } = await supabase
    .from('referral_platforms')
    .select('*')
    .eq('id', platformId)
    .single();

  if (!platform) return [];

  const baseReferral = {
    external_id: `${platform.platform_type}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    platform_id: platformId,
    source: platform.platform_type,
    status: 'pending',
    priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
    ai_score: Math.floor(Math.random() * 40) + 60,
    created_at: new Date().toISOString(),
    ready_date: new Date(Date.now() + Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  const patient = MOCK_PATIENTS[Math.floor(Math.random() * MOCK_PATIENTS.length)];
  
  return [{
    ...baseReferral,
    patient_name: patient.name,
    patient_dob: patient.dob,
    patient_gender: patient.gender,
    diagnosis: patient.diagnosis,
    diagnosis_codes: ["Z51.11"],
    referring_hospital: "General Hospital",
    referring_physician: "Dr. Smith",
    primary_insurance: ['medicare_a', 'medicare_advantage', 'commercial'][Math.floor(Math.random() * 3)],
    estimated_los: Math.floor(Math.random() * 20) + 5,
    estimated_daily_rate: Math.floor(Math.random() * 200) + 250,
    acuity_level: Math.floor(Math.random() * 4) + 1,
    clinical_notes: `Real-time referral from ${platform.name} integration`
  }];
}

export function startReferralMonitoring(platformId: string, socket: WebSocket, supabase: SupabaseClient) {
  const interval = setInterval(async () => {
    try {
      const hasNewReferrals = Math.random() > 0.8;
      
      if (hasNewReferrals) {
        const mockReferrals = await simulateNewReferrals(platformId, supabase);
        
        for (const referral of mockReferrals) {
          const { data, error } = await supabase
            .from('referrals')
            .insert(referral)
            .select()
            .single();
            
          if (!error) {
            socket.send(JSON.stringify({
              type: 'new_referral',
              referral: data,
              timestamp: new Date().toISOString()
            }));
          }
        }
      }
    } catch (error) {
      console.error("Monitoring error:", error);
    }
  }, 30000);

  socket.addEventListener('close', () => {
    clearInterval(interval);
  });
}
