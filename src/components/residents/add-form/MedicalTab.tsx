
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { AddResidentFormData } from "./types";

interface MedicalTabProps {
  form: UseFormReturn<AddResidentFormData>;
}

const MedicalTab = ({ form }: MedicalTabProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="diagnosis_primary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Diagnosis</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="physician_attending"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attending Physician</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="physician_primary_care"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Care Physician</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="mobility_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobility Status</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., Independent, Walker, Wheelchair" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MedicalTab;
