
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

    const { agreementId, templateId, signers } = await req.json()
    
    const pandadocApiKey = Deno.env.get('PANDADOC_API_KEY')
    if (!pandadocApiKey) {
      throw new Error('PandaDoc API key not configured')
    }

    // Get agreement details
    const { data: agreement } = await supabaseClient
      .from('admissions_agreements')
      .select(`
        *,
        residents!inner(first_name, last_name, date_of_birth)
      `)
      .eq('id', agreementId)
      .single()

    if (!agreement) {
      throw new Error('Agreement not found')
    }

    // Create PandaDoc document from template
    const documentData = {
      name: `${agreement.agreement_type.replace('_', ' ')} - ${agreement.residents.first_name} ${agreement.residents.last_name}`,
      template_uuid: templateId,
      recipients: signers.map((signer: any, index: number) => ({
        email: signer.email,
        first_name: signer.first_name,
        last_name: signer.last_name,
        role: signer.role,
        signing_order: index + 1
      })),
      tokens: [
        {
          name: 'resident.first_name',
          value: agreement.residents.first_name
        },
        {
          name: 'resident.last_name', 
          value: agreement.residents.last_name
        },
        {
          name: 'resident.date_of_birth',
          value: agreement.residents.date_of_birth
        },
        {
          name: 'agreement.date',
          value: new Date().toLocaleDateString()
        }
      ],
      fields: {},
      metadata: {
        agreement_id: agreementId,
        resident_id: agreement.resident_id
      }
    }

    const response = await fetch('https://api.pandadoc.com/public/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `API-Key ${pandadocApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documentData)
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`PandaDoc API error: ${response.status} - ${errorData}`)
    }

    const document = await response.json()

    // Update agreement with PandaDoc document ID
    await supabaseClient
      .from('admissions_agreements')
      .update({
        pandadoc_document_id: document.id,
        pandadoc_template_id: templateId,
        pandadoc_status: 'document.draft',
        pandadoc_created_at: new Date().toISOString(),
        status: 'pending_signatures'
      })
      .eq('id', agreementId)

    return new Response(JSON.stringify({ document_id: document.id, status: 'created' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Error creating PandaDoc document:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
