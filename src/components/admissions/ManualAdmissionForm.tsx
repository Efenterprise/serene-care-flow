
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  User, 
  Stethoscope, 
  Bed, 
  FileText, 
  Calendar,
  Phone,
  Mail,
  CreditCard,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useCreateReferral } from "@/hooks/useReferrals";
import { useCreatePatientTracking } from "@/hooks/usePatientTracking";
import { useBeds, useUpdateBedAvailability } from "@/hooks/useBeds";
import { useToast } from "@/hooks/use-toast";

interface ManualAdmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBedId?: string;
}

interface AdmissionFormData {
  // Patient Demographics
  patientName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  
  // Medical Information
  diagnosis: string;
  attendingPhysician: string;
  referringHospital: string;
  primaryInsurance: string;
  secondaryInsurance?: string;
  mrn: string;
  acuityLevel: number;
  
  // Admission Details
  admissionDate: string;
  bedId?: string;
  clinicalNotes: string;
  allergies: string[];
  medications: string;
  functionalStatus: string;
}

const ManualAdmissionForm = ({ isOpen, onClose, selectedBedId }: ManualAdmissionFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBed, setSelectedBed] = useState<string | undefined>(selectedBedId);
  const { data: beds } = useBeds();
  const createReferral = useCreateReferral();
  const createPatientTracking = useCreatePatientTracking();
  const updateBedAvailability = useUpdateBedAvailability();
  const { toast } = useToast();

  const form = useForm<AdmissionFormData>({
    defaultValues: {
      patientName: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      diagnosis: "",
      attendingPhysician: "",
      referringHospital: "Direct Admission",
      primaryInsurance: "",
      secondaryInsurance: "",
      mrn: "",
      acuityLevel: 1,
      admissionDate: new Date().toISOString().split('T')[0],
      bedId: selectedBedId,
      clinicalNotes: "",
      allergies: [],
      medications: "",
      functionalStatus: ""
    }
  });

  const availableBeds = beds?.filter(bed => bed.is_available) || [];

  const handleSubmit = async (data: AdmissionFormData) => {
    try {
      // Create referral entry
      const referral = await createReferral.mutateAsync({
        patient_name: data.patientName,
        patient_dob: data.dateOfBirth,
        patient_gender: data.gender,
        diagnosis: data.diagnosis,
        referring_hospital: data.referringHospital,
        referring_physician: data.attendingPhysician,
        primary_insurance: data.primaryInsurance as any,
        secondary_insurance: data.secondaryInsurance as any,
        mrn: data.mrn,
        acuity_level: data.acuityLevel,
        clinical_notes: data.clinicalNotes,
        allergies: data.allergies,
        ready_date: data.admissionDate,
        requested_admit_date: data.admissionDate,
        actual_admit_date: data.admissionDate,
        status: 'approved',
        source: 'manual',
        priority: data.acuityLevel >= 4 ? 'high' : data.acuityLevel >= 2 ? 'medium' : 'low'
      });

      // Create patient tracking entry
      await createPatientTracking.mutateAsync({
        referral_id: referral.id,
        patient_mrn: data.mrn,
        current_status: 'admitted',
        admission_date: data.admissionDate,
        location: selectedBed ? `Bed ${beds?.find(b => b.id === selectedBed)?.bed_number}` : 'Pending assignment'
      });

      // Update bed availability if bed was selected
      if (selectedBed) {
        await updateBedAvailability.mutateAsync({
          id: selectedBed,
          is_available: false
        });
      }

      toast({
        title: "Admission Successful",
        description: `${data.patientName} has been successfully admitted.`,
      });

      onClose();
      form.reset();
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: "Admission Failed",
        description: "There was an error processing the admission. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const stepTitles = [
    "Patient Demographics",
    "Medical Information", 
    "Admission Details",
    "Review & Submit"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Manual Patient Admission
          </DialogTitle>
          <DialogDescription>
            Complete the form below to manually admit a new patient
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className={`flex items-center ${index < stepTitles.length - 1 ? 'flex-1' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep > index + 1 ? 'bg-green-500 text-white' :
                  currentStep === index + 1 ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm ${currentStep === index + 1 ? 'font-semibold' : 'text-gray-600'}`}>
                  {title}
                </span>
                {index < stepTitles.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {/* Step 1: Patient Demographics */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Patient Demographics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="patientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter patient's full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="patient@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Emergency Contact</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="emergencyContactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Emergency contact name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="emergencyContactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="(555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="emergencyContactRelation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Relationship</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Spouse, Child" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Medical Information */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Medical Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="diagnosis"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Diagnosis *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter primary diagnosis" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mrn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical Record Number</FormLabel>
                            <FormControl>
                              <Input placeholder="MRN-12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="attendingPhysician"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attending Physician</FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="acuityLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Acuity Level</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select acuity level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">Level 1 - Low</SelectItem>
                                <SelectItem value="2">Level 2 - Moderate</SelectItem>
                                <SelectItem value="3">Level 3 - High</SelectItem>
                                <SelectItem value="4">Level 4 - Critical</SelectItem>
                                <SelectItem value="5">Level 5 - Intensive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="primaryInsurance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Insurance *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select primary insurance" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="medicare_a">Medicare A</SelectItem>
                                <SelectItem value="medicare_advantage">Medicare Advantage</SelectItem>
                                <SelectItem value="medicaid">Medicaid</SelectItem>
                                <SelectItem value="private_pay">Private Pay</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="secondaryInsurance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Insurance</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select secondary insurance" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="medicare_a">Medicare A</SelectItem>
                                <SelectItem value="medicare_advantage">Medicare Advantage</SelectItem>
                                <SelectItem value="medicaid">Medicaid</SelectItem>
                                <SelectItem value="private_pay">Private Pay</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="clinicalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clinical Notes</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter relevant clinical information, care needs, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Admission Details */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bed className="w-5 h-5 mr-2" />
                      Admission Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="admissionDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admission Date *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label className="text-sm font-medium">Bed Assignment</Label>
                      <div className="grid grid-cols-4 gap-3 mt-2">
                        {availableBeds.map((bed) => (
                          <Button
                            key={bed.id}
                            type="button"
                            variant={selectedBed === bed.id ? "default" : "outline"}
                            className="h-auto p-3 flex flex-col"
                            onClick={() => setSelectedBed(bed.id)}
                          >
                            <div className="font-semibold">#{bed.bed_number}</div>
                            <div className="text-xs">Room {bed.room_number}</div>
                            <div className="text-xs">{bed.bed_type}</div>
                          </Button>
                        ))}
                      </div>
                      {availableBeds.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                          <p>No beds currently available</p>
                        </div>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="medications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Medications</FormLabel>
                          <FormControl>
                            <Textarea placeholder="List current medications, dosages, and frequencies" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="functionalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Functional Status</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe mobility, self-care abilities, cognitive status" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Review & Submit
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Patient Information</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Name:</strong> {form.getValues('patientName')}</p>
                          <p><strong>DOB:</strong> {form.getValues('dateOfBirth')}</p>
                          <p><strong>Gender:</strong> {form.getValues('gender')}</p>
                          <p><strong>Phone:</strong> {form.getValues('phone')}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Medical Information</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Diagnosis:</strong> {form.getValues('diagnosis')}</p>
                          <p><strong>Physician:</strong> {form.getValues('attendingPhysician')}</p>
                          <p><strong>Acuity:</strong> Level {form.getValues('acuityLevel')}</p>
                          <p><strong>Insurance:</strong> {form.getValues('primaryInsurance')}</p>
                        </div>
                      </div>
                    </div>
                    
                    {selectedBed && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2">Bed Assignment</h4>
                        <Badge variant="outline">
                          Bed #{beds?.find(b => b.id === selectedBed)?.bed_number} - Room {beds?.find(b => b.id === selectedBed)?.room_number}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={createReferral.isPending || createPatientTracking.isPending}
                  >
                    {createReferral.isPending ? "Processing..." : "Admit Patient"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManualAdmissionForm;
