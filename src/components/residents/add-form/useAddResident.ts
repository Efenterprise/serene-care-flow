
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
      try {
        console.log('Attempting to create resident with data:', data);
        
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

        if (residentError) {
          console.error('Resident creation error:', residentError);
          throw new Error(residentError.message || 'Failed to create resident');
        }

        console.log('Resident created successfully:', resident);

        // If emergency contact information is provided, create a contact record
        if (data.emergency_contact_name && data.emergency_contact_phone) {
          try {
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

              const { error: contactError } = await supabase
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

              if (contactError) {
                console.error('Emergency contact creation error:', contactError);
                // Don't fail the whole operation if contact creation fails
                console.warn('Emergency contact could not be created, but resident was successfully added');
              }
            }
          } catch (contactError) {
            console.error('Error creating emergency contact:', contactError);
            // Continue with resident creation even if contact fails
          }
        }

        return resident;
      } catch (error) {
        console.error('Error in createResidentMutation:', error);
        throw error;
      }
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
      console.error('Mutation error:', error);
      let errorMessage = "Failed to add resident";
      
      if (error.message?.includes('violates row-level security policy')) {
        errorMessage = "Authentication required. Please sign in to add residents.";
      } else if (error.message?.includes('unique constraint')) {
        errorMessage = "A resident with this MRN already exists.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AddResidentFormData) => {
    console.log('Form submitted with data:', data);
    createResidentMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: createResidentMutation.isPending,
  };
};
