
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const sendbirdApplicationId = Deno.env.get('SENDBIRD_APPLICATION_ID');
const sendbirdApiToken = Deno.env.get('SENDBIRD_API_TOKEN');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, message, residentName } = await req.json();

    if (!sendbirdApplicationId || !sendbirdApiToken) {
      throw new Error('SendBird credentials not configured');
    }

    if (!to || !message) {
      throw new Error('Phone number and message are required');
    }

    // Format the message
    const formattedMessage = `${message}${residentName ? ` regarding ${residentName}` : ''}`;

    // Create the SendBird SMS API request
    const sendbirdUrl = `https://api-${sendbirdApplicationId}.sendbird.com/v3/sms/send`;
    
    const body = JSON.stringify({
      to: [to],
      body: formattedMessage,
      from: "ResidentCare Pro", // You can customize this sender name
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

    const data = await response.json();
    console.log('SMS sent successfully:', data.message_id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageSid: data.message_id,
        status: data.status 
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
