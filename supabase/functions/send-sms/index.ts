
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

// Fallback to SendBird if Twilio not configured
const sendbirdApplicationId = Deno.env.get('SENDBIRD_APPLICATION_ID');
const sendbirdApiToken = Deno.env.get('SENDBIRD_API_TOKEN');

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, message, residentName, residentId, contactId } = await req.json();
    
    console.log('SMS request received:', { to, message, residentName, residentId, contactId });

    if (!to || !message) {
      throw new Error('Phone number and message are required');
    }

    // Format phone number
    const formattedPhone = to.startsWith('+') ? to : `+1${to.replace(/\D/g, '')}`;
    const formattedMessage = `${message}${residentName ? ` (regarding ${residentName})` : ''}`;

    let smsResult;
    let provider = 'unknown';

    // Try Twilio first if configured
    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      console.log('Using Twilio for SMS');
      provider = 'twilio';
      
      const auth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
      
      const formData = new URLSearchParams({
        To: formattedPhone,
        From: twilioPhoneNumber,
        Body: formattedMessage,
      });

      const response = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Twilio API error:', errorData);
        throw new Error(`Twilio API error: ${response.status}`);
      }

      smsResult = await response.json();
      console.log('Twilio SMS sent:', smsResult.sid);
      
    } else if (sendbirdApplicationId && sendbirdApiToken) {
      console.log('Using SendBird for SMS');
      provider = 'sendbird';
      
      // Fix SendBird URL format - remove the exclamation mark and use correct format
      const sendbirdUrl = `https://api-${sendbirdApplicationId}.sendbird.com/v3/sms/send`;
      
      const body = JSON.stringify({
        to: [formattedPhone],
        body: formattedMessage,
        from: "ResidentCare Pro",
      });

      const response = await fetch(sendbirdUrl, {
        method: 'POST',
        headers: {
          'Api-Token': sendbirdApiToken,
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('SendBird API error:', errorData);
        throw new Error(`SendBird API error: ${response.status}`);
      }

      smsResult = await response.json();
      console.log('SendBird SMS sent:', smsResult.message_id);
      
    } else {
      throw new Error('No SMS provider configured. Please set up Twilio or SendBird credentials.');
    }

    // Log the communication to database if Supabase is configured
    if (supabaseUrl && supabaseServiceKey && residentId) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        const { error: logError } = await supabase
          .from('communication_log')
          .insert({
            resident_id: residentId,
            contact_id: contactId || null,
            communication_type: 'sms',
            direction: 'outbound',
            subject: 'SMS Message',
            content: message,
            status: 'sent',
            sent_at: new Date().toISOString(),
            metadata: {
              phone_number: formattedPhone,
              provider: provider,
              message_id: provider === 'twilio' ? smsResult.sid : smsResult.message_id,
              resident_name: residentName
            }
          });

        if (logError) {
          console.error('Failed to log communication:', logError);
        } else {
          console.log('Communication logged successfully');
        }
      } catch (logError) {
        console.error('Error logging communication:', logError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageSid: provider === 'twilio' ? smsResult.sid : smsResult.message_id,
        status: 'sent',
        provider: provider
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-sms function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
