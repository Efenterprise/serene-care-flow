
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { addResidentSchema, AddResidentFormData } from "./types";

export const useAddResident = (onClose: () => void) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<AddResidentFormData>({
    resolver: zodResolver(addResidentSchema),
    defaultValues: {
      admission_date: new Date().toISOString().split('T')[0],
      gender: "female",
    },
  });

  const createResidentMutation = useMutation({
    mutationFn: async (data: AddResidentFormData) => {
      // First create the resident
      const { data: resident, error: residentError } = await supabase
        .from("residents")
        .insert({
          mrn: data.mrn,
          first_name: data.first_name,
          last_name: data.last_name,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          admission_date: data.admission_date,
          room_number: data.room_number || null,
          floor: data.floor || null,
          unit: data.unit || null,
          payor_primary: data.payor_primary || null,
          payor_secondary: data.payor_secondary || null,
          diagnosis_primary: data.diagnosis_primary || null,
          physician_attending: data.physician_attending || null,
          physician_primary_care: data.physician_primary_care || null,
          care_level: data.care_level || null,
          mobility_status: data.mobility_status || null,
          notes: data.notes || null,
          allergies: [],
          diagnosis_secondary: [],
          diet_restrictions: [],
          special_needs: [],
        })
        .select()
        .single();

      if (residentError) throw residentError;

      // If emergency contact information is provided, create a contact record
      if (data.emergency_contact_name && data.emergency_contact_phone) {
        // Get the emergency contact type
        const { data: contactType } = await supabase
          .from("contact_types")
          .select("id")
          .eq("category", "emergency")
          .eq("name", "Emergency Contact")
          .single();

        if (contactType) {
          const nameParts = data.emergency_contact_name.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';

          await supabase
            .from("resident_contacts")
            .insert({
              resident_id: resident.id,
              contact_type_id: contactType.id,
              first_name: firstName,
              last_name: lastName,
              phone_primary: data.emergency_contact_phone,
              relationship: data.emergency_contact_relationship || null,
              priority_level: 1,
              is_emergency_contact: true,
              is_authorized_to_receive_info: true,
              preferred_contact_method: 'phone',
            });
        }
      }

      return resident;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Resident added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["residents"] });
      queryClient.invalidateQueries({ queryKey: ["resident-stats"] });
      queryClient.invalidateQueries({ queryKey: ["resident-contacts"] });
      form.reset();
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add resident",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AddResidentFormData) => {
    createResidentMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: createResidentMutation.isPending,
  };
};
