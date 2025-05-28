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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
      referral_source: "profility" | "reside" | "census_pro" | "manual"
      referral_status:
        | "pending"
        | "reviewing"
        | "approved"
        | "rejected"
        | "admitted"
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
      referral_source: ["profility", "reside", "census_pro", "manual"],
      referral_status: [
        "pending",
        "reviewing",
        "approved",
        "rejected",
        "admitted",
      ],
    },
  },
} as const
