
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { AddResidentFormData } from "./types";

interface LocationTabProps {
  form: UseFormReturn<AddResidentFormData>;
}

const LocationTab = ({ form }: LocationTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="room_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="payor_primary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Payor</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payor_secondary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Payor</FormLabel>
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
        name="care_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Care Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select care level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="skilled">Skilled</SelectItem>
                <SelectItem value="assisted">Assisted</SelectItem>
                <SelectItem value="memory_care">Memory Care</SelectItem>
                <SelectItem value="respite">Respite</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default LocationTab;
