
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContactType {
  id: string;
  name: string;
  category: string;
  description: string;
  requires_verification: boolean;
  verification_document_types: string[];
  is_active: boolean;
}

export interface ResidentContact {
  id: string;
  resident_id: string;
  contact_type_id: string;
  first_name: string;
  last_name: string;
  relationship?: string;
  priority_level: number;
  phone_primary?: string;
  phone_secondary?: string;
  email?: string;
  address?: any;
  preferred_contact_method: string;
  preferred_contact_time?: string;
  is_emergency_contact: boolean;
  is_authorized_to_receive_info: boolean;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  contact_type?: ContactType;
  verification?: ContactVerification[];
}

export interface ContactVerification {
  id: string;
  resident_contact_id: string;
  verification_type: string;
  document_name?: string;
  document_url?: string;
  verification_status: string;
  verified_by?: string;
  verified_at?: string;
  expiration_date?: string;
  notes?: string;
}

export interface CommunicationLog {
  id: string;
  resident_id: string;
  contact_id?: string;
  communication_type: string;
  direction: string;
  subject?: string;
  content?: string;
  status: string;
  sent_by?: string;
  sent_at: string;
  metadata?: any;
}

export const useContactTypes = () => {
  return useQuery({
    queryKey: ["contact-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_types")
        .select("*")
        .eq("is_active", true)
        .order("category", { ascending: true });

      if (error) throw error;
      return data as ContactType[];
    },
  });
};

export const useResidentContacts = (residentId: string) => {
  return useQuery({
    queryKey: ["resident-contacts", residentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resident_contacts")
        .select(`
          *,
          contact_type:contact_types(*),
          verification:contact_verification(*)
        `)
        .eq("resident_id", residentId)
        .eq("is_active", true)
        .order("priority_level", { ascending: true });

      if (error) throw error;
      return data as ResidentContact[];
    },
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contact: Omit<ResidentContact, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("resident_contacts")
        .insert(contact)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["resident-contacts", data.resident_id] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ResidentContact> & { id: string }) => {
      const { data, error } = await supabase
        .from("resident_contacts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["resident-contacts", data.resident_id] });
    },
  });
};

export const useCommunicationLog = (residentId: string) => {
  return useQuery({
    queryKey: ["communication-log", residentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("communication_log")
        .select(`
          *,
          contact:resident_contacts(first_name, last_name)
        `)
        .eq("resident_id", residentId)
        .order("sent_at", { ascending: false });

      if (error) throw error;
      return data as CommunicationLog[];
    },
  });
};

export const useCreateCommunication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (communication: Omit<CommunicationLog, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("communication_log")
        .insert(communication)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["communication-log", data.resident_id] });
    },
  });
};
