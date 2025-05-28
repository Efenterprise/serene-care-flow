export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_trail: {
        Row: {
          action: string
          details: Json | null
          error_message: string | null
          id: string
          ip_address: unknown | null
          patient_mrn: string | null
          resource_id: string | null
          resource_type: string | null
          session_id: string | null
          success: boolean | null
          timestamp: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          details?: Json | null
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          patient_mrn?: string | null
          resource_id?: string | null
          resource_type?: string | null
          session_id?: string | null
          success?: boolean | null
          timestamp?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          details?: Json | null
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          patient_mrn?: string | null
          resource_id?: string | null
          resource_type?: string | null
          session_id?: string | null
          success?: boolean | null
          timestamp?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      beds: {
        Row: {
          admit_date: string | null
          amenities: string[] | null
          bed_number: string
          bed_type: string | null
          created_at: string | null
          current_resident_id: string | null
          id: string
          is_available: boolean | null
          isolation_required: boolean | null
          projected_discharge_date: string | null
          room_number: string | null
          special_equipment: string[] | null
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          admit_date?: string | null
          amenities?: string[] | null
          bed_number: string
          bed_type?: string | null
          created_at?: string | null
          current_resident_id?: string | null
          id?: string
          is_available?: boolean | null
          isolation_required?: boolean | null
          projected_discharge_date?: string | null
          room_number?: string | null
          special_equipment?: string[] | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          admit_date?: string | null
          amenities?: string[] | null
          bed_number?: string
          bed_type?: string | null
          created_at?: string | null
          current_resident_id?: string | null
          id?: string
          is_available?: boolean | null
          isolation_required?: boolean | null
          projected_discharge_date?: string | null
          room_number?: string | null
          special_equipment?: string[] | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      emr_connections: {
        Row: {
          access_token: string | null
          authentication_method: string
          certificate_data: string | null
          client_id: string | null
          client_secret: string | null
          connection_errors: Json | null
          connection_type: string
          created_at: string | null
          current_usage: number | null
          daily_request_limit: number | null
          endpoint_url: string
          id: string
          is_active: boolean | null
          last_successful_connection: string | null
          platform_id: string | null
          refresh_token: string | null
          requests_per_minute: number | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          authentication_method: string
          certificate_data?: string | null
          client_id?: string | null
          client_secret?: string | null
          connection_errors?: Json | null
          connection_type: string
          created_at?: string | null
          current_usage?: number | null
          daily_request_limit?: number | null
          endpoint_url: string
          id?: string
          is_active?: boolean | null
          last_successful_connection?: string | null
          platform_id?: string | null
          refresh_token?: string | null
          requests_per_minute?: number | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          authentication_method?: string
          certificate_data?: string | null
          client_id?: string | null
          client_secret?: string | null
          connection_errors?: Json | null
          connection_type?: string
          created_at?: string | null
          current_usage?: number | null
          daily_request_limit?: number | null
          endpoint_url?: string
          id?: string
          is_active?: boolean | null
          last_successful_connection?: string | null
          platform_id?: string | null
          refresh_token?: string | null
          requests_per_minute?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emr_connections_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "referral_platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_ip_addresses: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          ip_address: unknown
          is_active: boolean | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          ip_address: unknown
          is_active?: boolean | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          ip_address?: unknown
          is_active?: boolean | null
        }
        Relationships: []
      }
      hospital_communications: {
        Row: {
          communication_type: string
          created_at: string | null
          direction: string
          error_message: string | null
          id: string
          message_content: Json | null
          patient_tracking_id: string | null
          platform_id: string | null
          processed_at: string | null
          retry_count: number | null
          status: string | null
        }
        Insert: {
          communication_type: string
          created_at?: string | null
          direction: string
          error_message?: string | null
          id?: string
          message_content?: Json | null
          patient_tracking_id?: string | null
          platform_id?: string | null
          processed_at?: string | null
          retry_count?: number | null
          status?: string | null
        }
        Update: {
          communication_type?: string
          created_at?: string | null
          direction?: string
          error_message?: string | null
          id?: string
          message_content?: Json | null
          patient_tracking_id?: string | null
          platform_id?: string | null
          processed_at?: string | null
          retry_count?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospital_communications_patient_tracking_id_fkey"
            columns: ["patient_tracking_id"]
            isOneToOne: false
            referencedRelation: "patient_tracking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospital_communications_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "referral_platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_logs: {
        Row: {
          created_at: string | null
          endpoint: string | null
          error_message: string | null
          id: string
          operation_type: string
          platform_id: string | null
          processing_time_ms: number | null
          request_data: Json | null
          response_data: Json | null
          status_code: number | null
        }
        Insert: {
          created_at?: string | null
          endpoint?: string | null
          error_message?: string | null
          id?: string
          operation_type: string
          platform_id?: string | null
          processing_time_ms?: number | null
          request_data?: Json | null
          response_data?: Json | null
          status_code?: number | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string | null
          error_message?: string | null
          id?: string
          operation_type?: string
          platform_id?: string | null
          processing_time_ms?: number | null
          request_data?: Json | null
          response_data?: Json | null
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_logs_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "referral_platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          attempted_at: string | null
          email: string
          failure_reason: string | null
          id: string
          ip_address: unknown
          success: boolean
          user_agent: string | null
        }
        Insert: {
          attempted_at?: string | null
          email: string
          failure_reason?: string | null
          id?: string
          ip_address: unknown
          success: boolean
          user_agent?: string | null
        }
        Update: {
          attempted_at?: string | null
          email?: string
          failure_reason?: string | null
          id?: string
          ip_address?: unknown
          success?: boolean
          user_agent?: string | null
        }
        Relationships: []
      }
      patient_tracking: {
        Row: {
          admission_date: string | null
          care_plan: Json | null
          communication_log: Json | null
          created_at: string | null
          current_status: string
          discharge_date: string | null
          discharge_summary: string | null
          facility_id: string | null
          id: string
          last_hospital_contact: string | null
          location: string | null
          medication_list: Json | null
          patient_mrn: string
          quality_metrics: Json | null
          readmission_date: string | null
          readmission_risk_score: number | null
          referral_id: string | null
          risk_factors: string[] | null
          updated_at: string | null
        }
        Insert: {
          admission_date?: string | null
          care_plan?: Json | null
          communication_log?: Json | null
          created_at?: string | null
          current_status: string
          discharge_date?: string | null
          discharge_summary?: string | null
          facility_id?: string | null
          id?: string
          last_hospital_contact?: string | null
          location?: string | null
          medication_list?: Json | null
          patient_mrn: string
          quality_metrics?: Json | null
          readmission_date?: string | null
          readmission_risk_score?: number | null
          referral_id?: string | null
          risk_factors?: string[] | null
          updated_at?: string | null
        }
        Update: {
          admission_date?: string | null
          care_plan?: Json | null
          communication_log?: Json | null
          created_at?: string | null
          current_status?: string
          discharge_date?: string | null
          discharge_summary?: string | null
          facility_id?: string | null
          id?: string
          last_hospital_contact?: string | null
          location?: string | null
          medication_list?: Json | null
          patient_mrn?: string
          quality_metrics?: Json | null
          readmission_date?: string | null
          readmission_risk_score?: number | null
          referral_id?: string | null
          risk_factors?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_tracking_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "referral_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_tracking_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_metrics: {
        Row: {
          care_plan_compliance: number | null
          cost_per_day: number | null
          created_at: string | null
          functional_improvement: Json | null
          id: string
          insurance_approval_rate: number | null
          length_of_stay: number | null
          medication_adherence_rate: number | null
          patient_satisfaction_score: number | null
          readmission_within_30_days: boolean | null
          referral_id: string | null
          reporting_period_end: string
          reporting_period_start: string
        }
        Insert: {
          care_plan_compliance?: number | null
          cost_per_day?: number | null
          created_at?: string | null
          functional_improvement?: Json | null
          id?: string
          insurance_approval_rate?: number | null
          length_of_stay?: number | null
          medication_adherence_rate?: number | null
          patient_satisfaction_score?: number | null
          readmission_within_30_days?: boolean | null
          referral_id?: string | null
          reporting_period_end: string
          reporting_period_start: string
        }
        Update: {
          care_plan_compliance?: number | null
          cost_per_day?: number | null
          created_at?: string | null
          functional_improvement?: Json | null
          id?: string
          insurance_approval_rate?: number | null
          length_of_stay?: number | null
          medication_adherence_rate?: number | null
          patient_satisfaction_score?: number | null
          readmission_within_30_days?: boolean | null
          referral_id?: string | null
          reporting_period_end?: string
          reporting_period_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "quality_metrics_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by_user_id: string | null
          assigned_to_user_id: string | null
          id: string
          is_active: boolean | null
          notes: string | null
          referral_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by_user_id?: string | null
          assigned_to_user_id?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          referral_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by_user_id?: string | null
          assigned_to_user_id?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          referral_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_assignments_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_platforms: {
        Row: {
          api_credentials: Json | null
          api_endpoint: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          name: string
          platform_type: Database["public"]["Enums"]["referral_source"]
          rate_limit_per_hour: number | null
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          api_credentials?: Json | null
          api_endpoint?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          name: string
          platform_type: Database["public"]["Enums"]["referral_source"]
          rate_limit_per_hour?: number | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          api_credentials?: Json | null
          api_endpoint?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          name?: string
          platform_type?: Database["public"]["Enums"]["referral_source"]
          rate_limit_per_hour?: number | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          actual_admit_date: string | null
          acuity_level: number | null
          ai_score: number | null
          allergies: string[] | null
          clinical_notes: string | null
          created_at: string | null
          diagnosis: string
          diagnosis_codes: string[] | null
          estimated_daily_rate: number | null
          estimated_los: number | null
          external_id: string | null
          functional_status: Json | null
          id: string
          insurance_details: Json | null
          medications: Json | null
          mrn: string | null
          patient_dob: string | null
          patient_gender: string | null
          patient_name: string
          platform_id: string | null
          primary_insurance:
            | Database["public"]["Enums"]["insurance_type"]
            | null
          priority: Database["public"]["Enums"]["priority_level"] | null
          raw_data: Json | null
          ready_date: string | null
          referring_hospital: string
          referring_physician: string | null
          requested_admit_date: string | null
          secondary_insurance:
            | Database["public"]["Enums"]["insurance_type"]
            | null
          source: Database["public"]["Enums"]["referral_source"]
          status: Database["public"]["Enums"]["referral_status"] | null
          sync_status: string | null
          updated_at: string | null
        }
        Insert: {
          actual_admit_date?: string | null
          acuity_level?: number | null
          ai_score?: number | null
          allergies?: string[] | null
          clinical_notes?: string | null
          created_at?: string | null
          diagnosis: string
          diagnosis_codes?: string[] | null
          estimated_daily_rate?: number | null
          estimated_los?: number | null
          external_id?: string | null
          functional_status?: Json | null
          id?: string
          insurance_details?: Json | null
          medications?: Json | null
          mrn?: string | null
          patient_dob?: string | null
          patient_gender?: string | null
          patient_name: string
          platform_id?: string | null
          primary_insurance?:
            | Database["public"]["Enums"]["insurance_type"]
            | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          raw_data?: Json | null
          ready_date?: string | null
          referring_hospital: string
          referring_physician?: string | null
          requested_admit_date?: string | null
          secondary_insurance?:
            | Database["public"]["Enums"]["insurance_type"]
            | null
          source?: Database["public"]["Enums"]["referral_source"]
          status?: Database["public"]["Enums"]["referral_status"] | null
          sync_status?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_admit_date?: string | null
          acuity_level?: number | null
          ai_score?: number | null
          allergies?: string[] | null
          clinical_notes?: string | null
          created_at?: string | null
          diagnosis?: string
          diagnosis_codes?: string[] | null
          estimated_daily_rate?: number | null
          estimated_los?: number | null
          external_id?: string | null
          functional_status?: Json | null
          id?: string
          insurance_details?: Json | null
          medications?: Json | null
          mrn?: string | null
          patient_dob?: string | null
          patient_gender?: string | null
          patient_name?: string
          platform_id?: string | null
          primary_insurance?:
            | Database["public"]["Enums"]["insurance_type"]
            | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          raw_data?: Json | null
          ready_date?: string | null
          referring_hospital?: string
          referring_physician?: string | null
          requested_admit_date?: string | null
          secondary_insurance?:
            | Database["public"]["Enums"]["insurance_type"]
            | null
          source?: Database["public"]["Enums"]["referral_source"]
          status?: Database["public"]["Enums"]["referral_status"] | null
          sync_status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "referral_platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mfa_settings: {
        Row: {
          backup_codes: string[] | null
          created_at: string | null
          id: string
          is_enabled: boolean | null
          last_used_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          last_used_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          last_used_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          created_by: string | null
          department: string | null
          email: string
          first_name: string
          id: string
          is_active: boolean | null
          last_login_at: string | null
          last_name: string
          license_number: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
          work_location: Database["public"]["Enums"]["work_location"]
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          email: string
          first_name: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          last_name: string
          license_number?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
          work_location?: Database["public"]["Enums"]["work_location"]
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          last_name?: string
          license_number?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
          work_location?: Database["public"]["Enums"]["work_location"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      log_audit_trail: {
        Args: {
          _user_id: string
          _user_email: string
          _action: string
          _resource_type?: string
          _resource_id?: string
          _ip_address?: unknown
          _user_agent?: string
          _session_id?: string
          _details?: Json
          _patient_mrn?: string
          _success?: boolean
          _error_message?: string
        }
        Returns: string
      }
    }
    Enums: {
      insurance_type:
        | "medicare_a"
        | "medicare_advantage"
        | "medicaid"
        | "private_pay"
        | "commercial"
        | "other"
      priority_level: "low" | "medium" | "high" | "urgent"
      referral_source:
        | "profility"
        | "reside"
        | "census_pro"
        | "manual"
        | "epic"
        | "allscripts"
        | "cerner"
        | "meditech"
        | "nextgen"
        | "athenahealth"
      referral_status:
        | "pending"
        | "reviewing"
        | "approved"
        | "rejected"
        | "admitted"
      user_role:
        | "admin"
        | "nurse"
        | "doctor"
        | "social_worker"
        | "administrator"
        | "read_only"
      work_location: "facility_only" | "remote_allowed" | "hybrid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      insurance_type: [
        "medicare_a",
        "medicare_advantage",
        "medicaid",
        "private_pay",
        "commercial",
        "other",
      ],
      priority_level: ["low", "medium", "high", "urgent"],
      referral_source: [
        "profility",
        "reside",
        "census_pro",
        "manual",
        "epic",
        "allscripts",
        "cerner",
        "meditech",
        "nextgen",
        "athenahealth",
      ],
      referral_status: [
        "pending",
        "reviewing",
        "approved",
        "rejected",
        "admitted",
      ],
      user_role: [
        "admin",
        "nurse",
        "doctor",
        "social_worker",
        "administrator",
        "read_only",
      ],
      work_location: ["facility_only", "remote_allowed", "hybrid"],
    },
  },
} as const
