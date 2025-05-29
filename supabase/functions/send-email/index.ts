
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  content: string;
  residentId?: string;
  contactId?: string;
  communicationType: 'email' | 'notification';
  isEmergency?: boolean;
  fromName?: string;
  fromEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Email function invoked');
    
    const { 
      to, 
      subject, 
      content, 
      residentId, 
      contactId, 
      communicationType = 'email',
      isEmergency = false,
      fromName = "HCJ Care Facility",
      fromEmail = "test@hcjtrain.com"
    }: EmailRequest = await req.json();

    console.log('Email request:', { to, subject, communicationType, isEmergency });

    // Validate required fields
    if (!to || !subject || !content) {
      console.error('Missing required fields:', { to: !!to, subject: !!subject, content: !!content });
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject, content" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      console.error('Invalid email format:', to);
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Format email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .emergency-banner { background: #fee2e2; border: 2px solid #dc2626; padding: 15px; margin-bottom: 20px; border-radius: 8px; }
            .emergency-title { color: #dc2626; margin: 0 0 10px 0; font-size: 18px; font-weight: bold; }
            .content-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6; }
            .content-title { color: #1f2937; margin-top: 0; font-size: 20px; }
            .content-text { white-space: pre-wrap; line-height: 1.6; color: #374151; }
            .footer { border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 12px; color: #6b7280; }
            .logo { color: #3b82f6; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">🏥 HCJ Care Facility</div>
            
            ${isEmergency ? `
              <div class="emergency-banner">
                <div class="emergency-title">⚠️ EMERGENCY COMMUNICATION</div>
                <p style="margin: 0; font-weight: bold;">This is an urgent message requiring immediate attention.</p>
              </div>
            ` : ''}
            
            <div class="content-box">
              <h1 class="content-title">${subject}</h1>
              <div class="content-text">${content}</div>
            </div>
            
            <div class="footer">
              <p><strong>HCJ Care Facility</strong><br>
              Healthcare Communication & Training</p>
              <p>This message was sent from our resident care management system.</p>
              <p>If you have questions about this communication, please contact the facility directly.</p>
              <p style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #e5e7eb;">
                <small>Powered by hcjtrain.com</small>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend
    console.log('Sending email via Resend from test@hcjtrain.com...');
    const emailResponse = await resend.emails.send({
      from: `${fromName} <test@hcjtrain.com>`,
      to: [to],
      subject: isEmergency ? `🚨 URGENT: ${subject}` : subject,
      html: emailHtml,
      text: content, // Fallback plain text
    });

    console.log('Resend response:', emailResponse);

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: `Failed to send email: ${emailResponse.error.message || 'Unknown error'}`,
          details: emailResponse.error 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Log the communication if residentId and contactId are provided
    if (residentId && contactId) {
      try {
        console.log('Logging communication to database...');
        
        // Initialize Supabase client
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error: logError } = await supabase
          .from('communications')
          .insert({
            resident_id: residentId,
            contact_id: contactId,
            communication_type: communicationType,
            direction: 'outbound',
            subject,
            content,
            status: 'sent',
            sent_at: new Date().toISOString(),
            metadata: {
              email_id: emailResponse.data?.id,
              recipient: to,
              is_emergency: isEmergency,
              provider: 'resend',
              from_domain: 'hcjtrain.com'
            }
          });

        if (logError) {
          console.error('Failed to log communication:', logError);
          // Don't fail the email send if logging fails
        } else {
          console.log('Communication logged successfully');
        }
      } catch (logError) {
        console.error('Error logging communication:', logError);
        // Don't fail the email send if logging fails
      }
    }

    console.log('Email sent successfully from test@hcjtrain.com:', emailResponse.data?.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        emailId: emailResponse.data?.id,
        message: "Email sent successfully from test@hcjtrain.com",
        from: "test@hcjtrain.com"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
