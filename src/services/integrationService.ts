
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ReferralPlatform = Database["public"]["Tables"]["referral_platforms"]["Row"];
type ReferralInsert = Database["public"]["Tables"]["referrals"]["Insert"];

export class IntegrationService {
  static async syncPlatformReferrals(platformId: string) {
    const startTime = Date.now();
    
    try {
      // Get platform configuration
      const { data: platform, error: platformError } = await supabase
        .from("referral_platforms")
        .select("*")
        .eq("id", platformId)
        .single();

      if (platformError) throw platformError;
      if (!platform.is_active) throw new Error("Platform is inactive");

      // Log the sync attempt
      await this.logIntegration(platformId, "sync", platform.api_endpoint, null, null, null, null, Date.now() - startTime);

      // In a real implementation, this would make API calls to the platform
      // For now, we'll simulate the integration
      const mockReferrals = await this.simulatePlatformData(platform);
      
      // Insert new referrals
      const results = [];
      for (const referral of mockReferrals) {
        const { data, error } = await supabase
          .from("referrals")
          .upsert(referral, { 
            onConflict: "external_id,platform_id" 
          })
          .select()
          .single();
        
        if (!error) results.push(data);
      }

      // Update last sync time
      await supabase
        .from("referral_platforms")
        .update({ last_sync_at: new Date().toISOString() })
        .eq("id", platformId);

      return results;
    } catch (error) {
      await this.logIntegration(
        platformId, 
        "sync", 
        null, 
        null, 
        null, 
        500, 
        error instanceof Error ? error.message : "Unknown error",
        Date.now() - startTime
      );
      throw error;
    }
  }

  static async simulatePlatformData(platform: ReferralPlatform): Promise<ReferralInsert[]> {
    // Simulate different platform data structures
    switch (platform.platform_type) {
      case "profility":
        return [
          {
            external_id: `prof_${Date.now()}_1`,
            platform_id: platform.id,
            source: "profility",
            patient_name: "Sarah Johnson",
            patient_dob: "1955-03-15",
            patient_gender: "Female",
            mrn: "MRN123456",
            referring_hospital: "General Hospital",
            referring_physician: "Dr. Smith",
            diagnosis: "Hip Fracture Recovery",
            diagnosis_codes: ["S72.001A"],
            acuity_level: 3,
            primary_insurance: "medicare_a",
            estimated_los: 14,
            estimated_daily_rate: 325.50,
            status: "pending",
            priority: "high",
            ai_score: 92,
            clinical_notes: "Post-surgical hip fracture, requires PT/OT",
            ready_date: new Date().toISOString().split('T')[0],
            raw_data: {
              profility_score: 92,
              assessment_completed: true,
              insurance_verified: true
            }
          }
        ];

      case "reside":
        return [
          {
            external_id: `reside_${Date.now()}_1`,
            platform_id: platform.id,
            source: "reside",
            patient_name: "Robert Chen",
            patient_dob: "1948-07-22",
            patient_gender: "Male",
            mrn: "MRN789012",
            referring_hospital: "St. Mary's Hospital",
            referring_physician: "Dr. Williams",
            diagnosis: "Stroke Recovery",
            diagnosis_codes: ["I63.9"],
            acuity_level: 4,
            primary_insurance: "medicare_advantage",
            estimated_los: 21,
            estimated_daily_rate: 385.00,
            status: "pending",
            priority: "medium",
            ai_score: 87,
            clinical_notes: "Left-sided weakness, speech therapy needed",
            ready_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
            raw_data: {
              reside_tracking_id: "RT2024001",
              hospital_coordinator: "Jane Doe",
              case_manager: "Mike Johnson"
            }
          }
        ];

      case "census_pro":
        return [
          {
            external_id: `census_${Date.now()}_1`,
            platform_id: platform.id,
            source: "census_pro",
            patient_name: "Maria Rodriguez",
            patient_dob: "1960-11-08",
            patient_gender: "Female",
            mrn: "MRN345678",
            referring_hospital: "City Medical Center",
            referring_physician: "Dr. Brown",
            diagnosis: "Post-Surgical Care",
            diagnosis_codes: ["Z48.89"],
            acuity_level: 2,
            primary_insurance: "commercial",
            estimated_los: 10,
            estimated_daily_rate: 295.00,
            status: "pending",
            priority: "low",
            ai_score: 78,
            clinical_notes: "Post-operative monitoring and wound care",
            ready_date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
            raw_data: {
              census_pro_id: "CP2024001",
              facility_preference: "private_room",
              family_contact: "555-0123"
            }
          }
        ];

      case "careport":
        return [
          {
            external_id: `careport_${Date.now()}_1`,
            platform_id: platform.id,
            source: "manual", // Use 'manual' as source since 'careport' is not in referral_source enum
            patient_name: "James Wilson",
            patient_dob: "1962-04-18",
            patient_gender: "Male",
            mrn: "CRP987654",
            referring_hospital: "Memorial Healthcare",
            referring_physician: "Dr. Anderson",
            diagnosis: "Cardiac Rehabilitation",
            diagnosis_codes: ["Z51.89"],
            acuity_level: 3,
            primary_insurance: "medicare_a", // Use 'medicare_a' instead of 'medicare_b'
            estimated_los: 18,
            estimated_daily_rate: 355.00,
            status: "pending",
            priority: "high",
            ai_score: 89,
            clinical_notes: "Post-cardiac surgery, requires specialized monitoring",
            ready_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
            raw_data: {
              careport_id: "CP2024002",
              wellsky_tracking: "WS789456",
              care_coordinator: "Lisa Thompson",
              discharge_planner: "Michael Davis",
              environment: "production"
            }
          }
        ];

      default:
        return [];
    }
  }

  static async logIntegration(
    platformId: string,
    operationType: string,
    endpoint: string | null,
    requestData: any,
    responseData: any,
    statusCode: number | null,
    errorMessage: string | null,
    processingTimeMs: number
  ) {
    await supabase
      .from("integration_logs")
      .insert({
        platform_id: platformId,
        operation_type: operationType,
        endpoint,
        request_data: requestData,
        response_data: responseData,
        status_code: statusCode,
        error_message: errorMessage,
        processing_time_ms: processingTimeMs
      });
  }

  static async getAllPlatforms() {
    const { data, error } = await supabase
      .from("referral_platforms")
      .select("*")
      .eq("is_active", true);
    
    if (error) throw error;
    return data;
  }

  static async syncAllPlatforms() {
    const platforms = await this.getAllPlatforms();
    const results = [];
    
    for (const platform of platforms) {
      try {
        const platformResults = await this.syncPlatformReferrals(platform.id);
        results.push({ platform: platform.name, results: platformResults });
      } catch (error) {
        console.error(`Failed to sync ${platform.name}:`, error);
        results.push({ platform: platform.name, error: error instanceof Error ? error.message : "Unknown error" });
      }
    }
    
    return results;
  }
}
