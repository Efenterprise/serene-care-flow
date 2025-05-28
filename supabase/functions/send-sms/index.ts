
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
    
    console.log('SMS Edge Function - Request received:', { 
      to, 
      messageLength: message?.length, 
      residentName, 
      residentId, 
      contactId,
      timestamp: new Date().toISOString()
    });

    if (!to || !message) {
      const error = 'Phone number and message are required';
      console.error('SMS Edge Function - Validation error:', error);
      throw new Error(error);
    }

    // Format phone number with more detailed logging
    const originalPhone = to;
    const cleanedPhone = to.replace(/\D/g, '');
    let formattedPhone;

    if (cleanedPhone.length === 10) {
      formattedPhone = `+1${cleanedPhone}`;
    } else if (cleanedPhone.length === 11 && cleanedPhone.startsWith('1')) {
      formattedPhone = `+${cleanedPhone}`;
    } else {
      formattedPhone = to.startsWith('+') ? to : `+1${cleanedPhone}`;
    }

    console.log('SMS Edge Function - Phone formatting:', {
      original: originalPhone,
      cleaned: cleanedPhone,
      formatted: formattedPhone,
      cleanedLength: cleanedPhone.length
    });

    const formattedMessage = `${message}${residentName ? ` (regarding ${residentName})` : ''}`;

    console.log('SMS Edge Function - Message details:', {
      originalLength: message.length,
      formattedLength: formattedMessage.length,
      hasResidentName: !!residentName
    });

    let smsResult;
    let provider = 'unknown';

    // Try Twilio first if configured
    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      console.log('SMS Edge Function - Using Twilio for SMS');
      provider = 'twilio';
      
      const auth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
      
      const formData = new URLSearchParams({
        To: formattedPhone,
        From: twilioPhoneNumber,
        Body: formattedMessage,
      });

      console.log('SMS Edge Function - Twilio request details:', {
        url: twilioUrl,
        to: formattedPhone,
        from: twilioPhoneNumber,
        bodyLength: formattedMessage.length
      });

      const response = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      const responseText = await response.text();
      console.log('SMS Edge Function - Twilio response:', {
        status: response.status,
        statusText: response.statusText,
        responseLength: responseText.length
      });

      if (!response.ok) {
        console.error('SMS Edge Function - Twilio API error:', {
          status: response.status,
          statusText: response.statusText,
          response: responseText
        });
        throw new Error(`Twilio API error: ${response.status} - ${responseText}`);
      }

      try {
        smsResult = JSON.parse(responseText);
        console.log('SMS Edge Function - Twilio SMS sent successfully:', {
          sid: smsResult.sid,
          status: smsResult.status,
          to: smsResult.to,
          from: smsResult.from
        });
      } catch (parseError) {
        console.error('SMS Edge Function - Failed to parse Twilio response:', parseError);
        throw new Error('Invalid response from Twilio API');
      }
      
    } else if (sendbirdApplicationId && sendbirdApiToken) {
      console.log('SMS Edge Function - Using SendBird for SMS');
      provider = 'sendbird';
      
      const sendbirdUrl = `https://api-${sendbirdApplicationId}.sendbird.com/v3/sms/send`;
      
      const body = JSON.stringify({
        to: [formattedPhone],
        body: formattedMessage,
        from: "ResidentCare Pro",
      });

      console.log('SMS Edge Function - SendBird request details:', {
        url: sendbirdUrl,
        to: formattedPhone,
        bodyLength: formattedMessage.length
      });

      const response = await fetch(sendbirdUrl, {
        method: 'POST',
        headers: {
          'Api-Token': sendbirdApiToken,
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const responseText = await response.text();
      console.log('SMS Edge Function - SendBird response:', {
        status: response.status,
        statusText: response.statusText,
        responseLength: responseText.length
      });

      if (!response.ok) {
        console.error('SMS Edge Function - SendBird API error:', {
          status: response.status,
          statusText: response.statusText,
          response: responseText
        });
        throw new Error(`SendBird API error: ${response.status} - ${responseText}`);
      }

      try {
        smsResult = JSON.parse(responseText);
        console.log('SMS Edge Function - SendBird SMS sent successfully:', {
          messageId: smsResult.message_id,
          status: smsResult.status
        });
      } catch (parseError) {
        console.error('SMS Edge Function - Failed to parse SendBird response:', parseError);
        throw new Error('Invalid response from SendBird API');
      }
      
    } else {
      const error = 'No SMS provider configured. Please set up Twilio or SendBird credentials.';
      console.error('SMS Edge Function - Configuration error:', error);
      throw new Error(error);
    }

    // Log the communication to database if Supabase is configured
    if (supabaseUrl && supabaseServiceKey && residentId) {
      try {
        console.log('SMS Edge Function - Logging to database');
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        const logData = {
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
            resident_name: residentName,
            twilio_status: provider === 'twilio' ? smsResult.status : null,
            message_length: formattedMessage.length
          }
        };

        console.log('SMS Edge Function - Database log data:', logData);

        const { data: logResult, error: logError } = await supabase
          .from('communication_log')
          .insert(logData)
          .select()
          .single();

        if (logError) {
          console.error('SMS Edge Function - Failed to log communication:', {
            error: logError,
            logData: logData
          });
        } else {
          console.log('SMS Edge Function - Communication logged successfully:', {
            logId: logResult.id,
            sentAt: logResult.sent_at
          });
        }
      } catch (logError) {
        console.error('SMS Edge Function - Error logging communication:', logError);
      }
    } else {
      console.log('SMS Edge Function - Skipping database logging:', {
        hasSupabaseUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey,
        hasResidentId: !!residentId
      });
    }

    const successResponse = { 
      success: true, 
      messageSid: provider === 'twilio' ? smsResult.sid : smsResult.message_id,
      status: 'sent',
      provider: provider,
      to: formattedPhone,
      timestamp: new Date().toISOString()
    };

    console.log('SMS Edge Function - Success response:', successResponse);

    return new Response(
      JSON.stringify(successResponse), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('SMS Edge Function - Error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
