
import { z } from "zod";

export const addResidentSchema = z.object({
  mrn: z.string().min(1, "MRN is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  admission_date: z.string().min(1, "Admission date is required"),
  room_number: z.string().optional(),
  floor: z.string().optional(),
  unit: z.string().optional(),
  payor_primary: z.string().optional(),
  payor_secondary: z.string().optional(),
  diagnosis_primary: z.string().optional(),
  physician_attending: z.string().optional(),
  physician_primary_care: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  emergency_contact_relationship: z.string().optional(),
  care_level: z.enum(["skilled", "assisted", "memory_care", "respite"]).optional(),
  mobility_status: z.string().optional(),
  notes: z.string().optional(),
});

export type AddResidentFormData = z.infer<typeof addResidentSchema>;
