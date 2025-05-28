
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SendSMSData {
  to: string;
  message: string;
  residentName?: string;
  residentId?: string;
  contactId?: string;
}

export const useSMS = () => {
  const { toast } = useToast();

  const sendSMSMutation = useMutation({
    mutationFn: async ({ to, message, residentName, residentId, contactId }: SendSMSData) => {
      console.log('Sending SMS:', { to, message, residentName, residentId });
      
      // Validate phone number format
      const cleanPhone = to.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        throw new Error('Invalid phone number format');
      }

      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: { 
          to: cleanPhone, 
          message, 
          residentName,
          residentId,
          contactId
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data.success) {
        console.error('SMS sending failed:', data.error);
        throw new Error(data.error || 'Failed to send SMS');
      }

      console.log('SMS sent successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('SMS mutation successful:', data);
      toast({
        title: "SMS Sent",
        description: "Message sent successfully",
      });
    },
    onError: (error: any) => {
      console.error('SMS sending error:', error);
      toast({
        title: "SMS Failed",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  return {
    sendSMS: sendSMSMutation.mutate,
    isLoading: sendSMSMutation.isPending,
    error: sendSMSMutation.error,
  };
};
