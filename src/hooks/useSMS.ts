
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
      console.log('SMS Hook - Sending SMS:', { 
        to, 
        messageLength: message.length, 
        residentName, 
        residentId, 
        contactId 
      });
      
      // Validate phone number format
      const cleanPhone = to.replace(/\D/g, '');
      console.log('SMS Hook - Phone validation:', {
        original: to,
        cleaned: cleanPhone,
        length: cleanPhone.length
      });

      if (cleanPhone.length < 10) {
        const error = new Error('Invalid phone number format - must be at least 10 digits');
        console.error('SMS Hook - Phone validation failed:', error.message);
        throw error;
      }

      // Use the cleaned phone number for sending
      const phoneToSend = cleanPhone.length === 10 ? cleanPhone : 
                         cleanPhone.length === 11 && cleanPhone.startsWith('1') ? cleanPhone.substring(1) : 
                         cleanPhone;

      console.log('SMS Hook - Final phone number:', phoneToSend);

      try {
        const { data, error } = await supabase.functions.invoke('send-sms', {
          body: { 
            to: phoneToSend, 
            message, 
            residentName,
            residentId,
            contactId
          },
        });

        console.log('SMS Hook - Supabase function response:', { data, error });

        if (error) {
          console.error('SMS Hook - Supabase function error:', error);
          throw new Error(`SMS service error: ${error.message || 'Unknown error'}`);
        }

        if (!data) {
          console.error('SMS Hook - No data returned from function');
          throw new Error('No response from SMS service');
        }

        if (!data.success) {
          console.error('SMS Hook - SMS sending failed:', data.error);
          throw new Error(data.error || 'Failed to send SMS');
        }

        console.log('SMS Hook - SMS sent successfully:', {
          messageSid: data.messageSid,
          status: data.status,
          provider: data.provider
        });
        
        return data;
      } catch (functionError) {
        console.error('SMS Hook - Function invocation error:', functionError);
        throw functionError;
      }
    },
    onSuccess: (data) => {
      console.log('SMS Hook - Mutation successful:', data);
      toast({
        title: "SMS Sent Successfully",
        description: `Message sent via ${data.provider || 'SMS service'}${data.messageSid ? ` (ID: ${data.messageSid.substring(0, 8)}...)` : ''}`,
      });
    },
    onError: (error: any) => {
      console.error('SMS Hook - Mutation error:', error);
      toast({
        title: "SMS Failed",
        description: error.message || "Failed to send message. Please check the phone number and try again.",
        variant: "destructive",
      });
    },
  });

  return {
    sendSMS: sendSMSMutation.mutate,
    isLoading: sendSMSMutation.isPending,
    error: sendSMSMutation.error,
    isSuccess: sendSMSMutation.isSuccess,
    data: sendSMSMutation.data,
  };
};
