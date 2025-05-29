
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MedicalProfessionalFormData } from "./MedicalProfessionalForm";

interface NotesSectionProps {
  form: UseFormReturn<MedicalProfessionalFormData>;
}

export const NotesSection = ({ form }: NotesSectionProps) => {
  const { register } = form;

  return (
    <div>
      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        {...register("notes")}
        placeholder="Additional notes about this medical professional..."
        rows={3}
      />
    </div>
  );
};
