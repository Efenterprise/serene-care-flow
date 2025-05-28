
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
      const { data: result, error } = await supabase
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
          emergency_contact_name: data.emergency_contact_name || null,
          emergency_contact_phone: data.emergency_contact_phone || null,
          emergency_contact_relationship: data.emergency_contact_relationship || null,
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

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Resident added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["residents"] });
      queryClient.invalidateQueries({ queryKey: ["resident-stats"] });
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
