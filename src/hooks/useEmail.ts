
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SendEmailData {
  to: string;
  subject: string;
  content: string;
  residentId?: string;
  contactId?: string;
  communicationType?: 'email' | 'notification';
  isEmergency?: boolean;
  fromName?: string;
  fromEmail?: string;
}

export const useEmail = () => {
  const { toast } = useToast();

  const sendEmailMutation = useMutation({
    mutationFn: async (emailData: SendEmailData) => {
      console.log('Email Hook - Sending email via test@hcjtrain.com:', { 
        to: emailData.to, 
        subject: emailData.subject,
        contentLength: emailData.content.length, 
        residentId: emailData.residentId, 
        contactId: emailData.contactId,
        isEmergency: emailData.isEmergency
      });
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailData.to)) {
        const error = new Error('Invalid email format');
        console.error('Email Hook - Email validation failed:', error.message);
        throw error;
      }

      try {
        const { data, error } = await supabase.functions.invoke('send-email', {
          body: {
            ...emailData,
            fromName: emailData.fromName || "HCJ Care Facility",
            fromEmail: "test@hcjtrain.com"
          },
        });

        console.log('Email Hook - Supabase function response:', { data, error });

        if (error) {
          console.error('Email Hook - Supabase function error:', error);
          throw new Error(`Email service error: ${error.message || 'Unknown error'}`);
        }

        if (!data) {
          console.error('Email Hook - No data returned from function');
          throw new Error('No response from email service');
        }

        if (!data.success) {
          console.error('Email Hook - Email sending failed:', data.error);
          throw new Error(data.error || 'Failed to send email');
        }

        console.log('Email Hook - Email sent successfully from test@hcjtrain.com:', {
          emailId: data.emailId,
          from: data.from
        });
        
        return data;
      } catch (functionError) {
        console.error('Email Hook - Function invocation error:', functionError);
        throw functionError;
      }
    },
    onSuccess: (data) => {
      console.log('Email Hook - Mutation successful:', data);
      toast({
        title: "Email Sent Successfully",
        description: `Email sent from test@hcjtrain.com${data.emailId ? ` (ID: ${data.emailId.substring(0, 8)}...)` : ''}`,
      });
    },
    onError: (error: any) => {
      console.error('Email Hook - Mutation error:', error);
      toast({
        title: "Email Failed",
        description: error.message || "Failed to send email. Please check the email address and try again.",
        variant: "destructive",
      });
    },
  });

  return {
    sendEmail: sendEmailMutation.mutate,
    isLoading: sendEmailMutation.isPending,
    error: sendEmailMutation.error,
    isSuccess: sendEmailMutation.isSuccess,
    data: sendEmailMutation.data,
  };
};
