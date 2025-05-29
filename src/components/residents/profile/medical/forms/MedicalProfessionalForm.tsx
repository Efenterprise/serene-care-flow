
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Resident } from "@/hooks/useResidents";
import { useCreateMedicalProfessional } from "@/hooks/useMedicalProfessionals";
import { BasicInfoSection } from "./BasicInfoSection";
import { ContactInfoSection } from "./ContactInfoSection";
import { ProfessionalInfoSection } from "./ProfessionalInfoSection";
import { NotesSection } from "./NotesSection";

const medicalProfessionalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profession: z.string().min(1, "Profession is required"),
  relation: z.string().optional(),
  office_phone: z.string().optional(),
  mobile_phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  npi_number: z.string().optional(),
  license_number: z.string().optional(),
  notes: z.string().optional(),
  is_primary: z.boolean().default(false),
});

export type MedicalProfessionalFormData = z.infer<typeof medicalProfessionalSchema>;

interface MedicalProfessionalFormProps {
  resident: Resident;
  onSuccess: () => void;
}

const MedicalProfessionalForm = ({ resident, onSuccess }: MedicalProfessionalFormProps) => {
  const { toast } = useToast();
  const createMutation = useCreateMedicalProfessional();

  const form = useForm<MedicalProfessionalFormData>({
    resolver: zodResolver(medicalProfessionalSchema),
    defaultValues: {
      is_primary: false,
    },
  });

  const onSubmit = async (data: MedicalProfessionalFormData) => {
    try {
      await createMutation.mutateAsync({
        name: data.name,
        profession: data.profession,
        relation: data.relation || "",
        office_phone: data.office_phone || "",
        mobile_phone: data.mobile_phone || "",
        email: data.email || "",
        npi_number: data.npi_number || "",
        license_number: data.license_number || "",
        notes: data.notes || "",
        is_primary: data.is_primary,
        resident_id: resident.id,
        is_active: true,
      });

      toast({
        title: "Medical Professional Added",
        description: "The medical professional has been added successfully.",
      });

      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error adding medical professional:", error);
      toast({
        title: "Error",
        description: "Failed to add medical professional.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <BasicInfoSection form={form} />
      <ContactInfoSection form={form} />
      <ProfessionalInfoSection form={form} />
      <NotesSection form={form} />

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Adding..." : "Add Professional"}
        </Button>
      </div>
    </form>
  );
};

export default MedicalProfessionalForm;
