
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { AddResidentFormData } from "./types";

interface ContactTabProps {
  form: UseFormReturn<AddResidentFormData>;
}

const ContactTab = ({ form }: ContactTabProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="emergency_contact_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Contact Name</FormLabel>
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
          name="emergency_contact_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact Phone</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emergency_contact_relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship</FormLabel>
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
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea {...field} rows={4} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactTab;
