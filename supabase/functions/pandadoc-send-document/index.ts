
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    const { documentId, message } = await req.json()
    
    const pandadocApiKey = Deno.env.get('PANDADOC_API_KEY')
    if (!pandadocApiKey) {
      throw new Error('PandaDoc API key not configured')
    }

    // Send document for signature
    const sendData = {
      message: message || 'Please review and sign this admission agreement.',
      silent: false
    }

    const response = await fetch(`https://api.pandadoc.com/public/v1/documents/${documentId}/send`, {
      method: 'POST',
      headers: {
        'Authorization': `API-Key ${pandadocApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData)
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`PandaDoc API error: ${response.status} - ${errorData}`)
    }

    // Update agreement status
    await supabaseClient
      .from('admissions_agreements')
      .update({
        pandadoc_status: 'document.sent',
        status: 'pending_signatures',
        updated_at: new Date().toISOString()
      })
      .eq('pandadoc_document_id', documentId)

    return new Response(JSON.stringify({ status: 'sent' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Error sending PandaDoc document:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
