
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAddResident } from "./add-form/useAddResident";
import BasicInfoTab from "./add-form/BasicInfoTab";
import LocationTab from "./add-form/LocationTab";
import MedicalTab from "./add-form/MedicalTab";
import ContactTab from "./add-form/ContactTab";

interface AddResidentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddResidentForm = ({ isOpen, onClose }: AddResidentFormProps) => {
  const { form, onSubmit, isLoading } = useAddResident(onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Resident</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="contact">Emergency Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <BasicInfoTab form={form} />
              </TabsContent>

              <TabsContent value="location">
                <LocationTab form={form} />
              </TabsContent>

              <TabsContent value="medical">
                <MedicalTab form={form} />
              </TabsContent>

              <TabsContent value="contact">
                <ContactTab form={form} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Adding..." : "Add Resident"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddResidentForm;
