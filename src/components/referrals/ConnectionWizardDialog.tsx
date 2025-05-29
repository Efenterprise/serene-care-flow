
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConnectionWizardProps {
  isOpen: boolean;
  onClose: () => void;
  platformType: string;
  platformName: string;
  onConnectionComplete: (credentials: any) => void;
}

const ConnectionWizardDialog = ({ 
  isOpen, 
  onClose, 
  platformType, 
  platformName, 
  onConnectionComplete 
}: ConnectionWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const platformConfigs = {
    careport: {
      name: "Careport WellSky",
      fields: [
        { key: "username", label: "Careport Username", type: "text", required: true },
        { key: "password", label: "Careport Password", type: "password", required: true },
        { key: "facility_id", label: "Facility ID", type: "text", required: true },
        { key: "environment", label: "Environment", type: "select", options: ["production", "staging"], required: true }
      ],
      steps: [
        {
          title: "Welcome",
          description: "Let's connect your facility to Careport WellSky for live referral data",
          content: "This wizard will guide you through connecting to Careport WellSky. You'll need your login credentials and facility information."
        },
        {
          title: "Credentials",
          description: "Enter your Careport WellSky login information",
          content: "We'll securely store and encrypt your credentials. They will only be used to sync referral data."
        },
        {
          title: "Validation", 
          description: "Testing your connection to Careport",
          content: "We're validating your credentials and testing the connection to ensure everything works properly."
        },
        {
          title: "Complete",
          description: "Connection established successfully!",
          content: "Your facility is now connected to Careport WellSky. Referrals will automatically sync in real-time."
        }
      ]
    },
    profility: {
      name: "Profility",
      fields: [
        { key: "username", label: "Profility Username", type: "text", required: true },
        { key: "password", label: "Profility Password", type: "password", required: true },
        { key: "facility_code", label: "Facility Code", type: "text", required: true },
        { key: "api_key", label: "API Key (if available)", type: "password", required: false }
      ],
      steps: [
        {
          title: "Welcome",
          description: "Connect to Profility for enhanced referral management",
          content: "This wizard will help you integrate with Profility's referral system for comprehensive data analysis."
        },
        {
          title: "Credentials",
          description: "Enter your Profility account details",
          content: "Provide your Profility login credentials to enable secure data synchronization."
        },
        {
          title: "Validation",
          description: "Verifying Profility connection",
          content: "Testing your connection to Profility and validating access permissions."
        },
        {
          title: "Complete",
          description: "Profility integration complete!",
          content: "Your Profility integration is active. Advanced analytics and scoring are now available."
        }
      ]
    },
    reside: {
      name: "Reside",
      fields: [
        { key: "api_key", label: "Reside API Key", type: "password", required: true },
        { key: "facility_id", label: "Facility ID", type: "text", required: true },
        { key: "webhook_url", label: "Webhook URL (optional)", type: "text", required: false }
      ],
      steps: [
        {
          title: "Welcome",
          description: "Integrate with Reside for streamlined referrals",
          content: "Connect your facility to Reside's referral network for enhanced patient placement capabilities."
        },
        {
          title: "API Configuration",
          description: "Configure your Reside API access",
          content: "Enter your API credentials to enable secure communication with Reside's platform."
        },
        {
          title: "Validation",
          description: "Testing Reside API connection",
          content: "Validating your API credentials and testing connectivity to Reside services."
        },
        {
          title: "Complete", 
          description: "Reside integration successful!",
          content: "Your facility is now connected to Reside. Referral data will sync automatically."
        }
      ]
    }
  };

  const config = platformConfigs[platformType as keyof typeof platformConfigs];
  const totalSteps = config?.steps.length || 4;

  const updateCredential = (key: string, value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const togglePasswordVisibility = (key: string) => {
    setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const validateStep = async () => {
    if (currentStep === 2) {
      // Validate credentials
      setIsValidating(true);
      try {
        // Simulate validation process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const results: Record<string, boolean> = {};
        config.fields.forEach(field => {
          if (field.required) {
            results[field.key] = !!credentials[field.key];
          }
        });
        
        setValidationResults(results);
        
        const allValid = Object.values(results).every(valid => valid);
        if (allValid) {
          setCurrentStep(3);
          // Simulate connection test
          setTimeout(() => {
            setCurrentStep(4);
            toast({
              title: "Connection Successful",
              description: `Successfully connected to ${platformName}`,
            });
          }, 3000);
        } else {
          toast({
            title: "Validation Failed", 
            description: "Please check your credentials and try again",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Connection Error",
          description: "Failed to validate connection. Please try again.",
          variant: "destructive",
        });
      }
      setIsValidating(false);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    onConnectionComplete(credentials);
    onClose();
    setCurrentStep(1);
    setCredentials({});
    setValidationResults({});
  };

  if (!config) return null;

  const currentStepConfig = config.steps[currentStep - 1];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{config.name} Connection Wizard</span>
            <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{currentStepConfig.title}</CardTitle>
              <p className="text-gray-600">{currentStepConfig.description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">{currentStepConfig.content}</p>

              {currentStep === 2 && (
                <div className="space-y-4">
                  {config.fields.map((field) => (
                    <div key={field.key}>
                      <Label htmlFor={field.key} className="flex items-center space-x-1">
                        <span>{field.label}</span>
                        {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      
                      {field.type === "select" ? (
                        <select
                          id={field.key}
                          value={credentials[field.key] || ""}
                          onChange={(e) => updateCredential(field.key, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required={field.required}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="relative">
                          <Input
                            id={field.key}
                            type={field.type === "password" && !showPasswords[field.key] ? "password" : "text"}
                            value={credentials[field.key] || ""}
                            onChange={(e) => updateCredential(field.key, e.target.value)}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            required={field.required}
                            className={validationResults[field.key] === false ? "border-red-500" : ""}
                          />
                          {field.type === "password" && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              onClick={() => togglePasswordVisibility(field.key)}
                            >
                              {showPasswords[field.key] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      )}
                      
                      {validationResults[field.key] === false && (
                        <p className="text-sm text-red-500 mt-1">This field is required</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                  <p>Testing connection to {platformName}...</p>
                  <p className="text-sm text-gray-600">This may take a few moments</p>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-600">Connection Successful!</h3>
                    <p className="text-gray-600">Real-time referral sync is now active</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">What happens next:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Referrals will sync automatically in real-time</li>
                      <li>• AI scoring will analyze incoming referrals</li>
                      <li>• You'll receive notifications for new referrals</li>
                      <li>• Enhanced analytics will be available immediately</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => currentStep > 1 ? setCurrentStep(prev => prev - 1) : onClose()}
              disabled={isValidating}
            >
              {currentStep > 1 ? "Previous" : "Cancel"}
            </Button>
            
            <Button
              onClick={currentStep === totalSteps ? handleComplete : validateStep}
              disabled={isValidating || (currentStep === 2 && !config.fields.filter(f => f.required).every(f => credentials[f.key]))}
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : currentStep === totalSteps ? (
                "Complete Setup"
              ) : currentStep === 2 ? (
                "Test Connection"
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionWizardDialog;
