
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Resident } from "@/hooks/useResidents";

const medicalHistorySchema = z.object({
  type: z.string().min(1, "Type is required"),
  condition: z.string().min(1, "Condition is required"),
  date: z.string().min(1, "Date is required"),
  provider: z.string().min(1, "Provider is required"),
  status: z.string().min(1, "Status is required"),
  severity: z.string().min(1, "Severity is required"),
  notes: z.string().optional(),
  followUpRequired: z.boolean().default(false),
});

type MedicalHistoryFormData = z.infer<typeof medicalHistorySchema>;

interface AddMedicalHistoryDialogProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const AddMedicalHistoryDialog = ({ resident, isOpen, onClose }: AddMedicalHistoryDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MedicalHistoryFormData>({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: {
      followUpRequired: false,
    },
  });

  const onSubmit = async (data: MedicalHistoryFormData) => {
    setIsLoading(true);
    try {
      // This would integrate with a medical history hook in a real app
      console.log("Adding medical history:", data);
      
      toast({
        title: "Medical History Added",
        description: "The medical history entry has been added successfully.",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Error adding medical history:", error);
      toast({
        title: "Error",
        description: "Failed to add medical history entry.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const historyTypes = [
    { value: "diagnosis", label: "Diagnosis" },
    { value: "surgery", label: "Surgery/Procedure" },
    { value: "allergy", label: "Allergy" },
    { value: "medication", label: "Medication History" },
    { value: "hospitalization", label: "Hospitalization" },
    { value: "injury", label: "Injury" },
    { value: "other", label: "Other" }
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "resolved", label: "Resolved" },
    { value: "ongoing", label: "Ongoing" },
    { value: "chronic", label: "Chronic" },
    { value: "remission", label: "In Remission" }
  ];

  const severityOptions = [
    { value: "minor", label: "Minor" },
    { value: "moderate", label: "Moderate" },
    { value: "major", label: "Major" },
    { value: "severe", label: "Severe" },
    { value: "critical", label: "Critical" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medical History Entry</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select value={watch("type")} onValueChange={(value) => setValue("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {historyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="condition">Condition/Procedure *</Label>
              <Input
                id="condition"
                {...register("condition")}
                placeholder="e.g., Hypertension, Hip Replacement"
              />
              {errors.condition && (
                <p className="text-sm text-red-600">{errors.condition.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                {...register("date")}
              />
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="provider">Provider *</Label>
              <Input
                id="provider"
                {...register("provider")}
                placeholder="Dr. John Smith"
              />
              {errors.provider && (
                <p className="text-sm text-red-600">{errors.provider.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select value={watch("status")} onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="severity">Severity *</Label>
              <Select value={watch("severity")} onValueChange={(value) => setValue("severity", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityOptions.map((severity) => (
                    <SelectItem key={severity.value} value={severity.value}>
                      {severity.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.severity && (
                <p className="text-sm text-red-600">{errors.severity.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpRequired"
              checked={watch("followUpRequired")}
              onCheckedChange={(checked) => setValue("followUpRequired", !!checked)}
            />
            <Label htmlFor="followUpRequired">Follow-up Required</Label>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Additional details, treatment notes, complications, etc."
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add History Entry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicalHistoryDialog;
