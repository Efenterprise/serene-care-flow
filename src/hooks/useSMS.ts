
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SendSMSData {
  to: string;
  message: string;
  residentName?: string;
}

export const useSMS = () => {
  const { toast } = useToast();

  const sendSMSMutation = useMutation({
    mutationFn: async ({ to, message, residentName }: SendSMSData) => {
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: { to, message, residentName },
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to send SMS');
      }

      return data;
    },
    onSuccess: () => {
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
  };
};
