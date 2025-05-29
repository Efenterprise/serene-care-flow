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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const webhookData = await req.json()
    
    console.log('PandaDoc webhook received:', webhookData)

    // Log webhook event
    await supabaseClient
      .from('pandadoc_webhooks')
      .insert({
        event_type: webhookData.event_type,
        document_id: webhookData.data?.id || webhookData.document_id,
        webhook_data: webhookData,
        processed_at: new Date().toISOString()
      })

    // Find the agreement associated with this document
    const { data: agreement } = await supabaseClient
      .from('admissions_agreements')
      .select('*')
      .eq('pandadoc_document_id', webhookData.data?.id || webhookData.document_id)
      .single()

    if (!agreement) {
      console.log('No agreement found for document:', webhookData.data?.id)
      return new Response('OK', { status: 200 })
    }

    // Update webhook record with agreement ID
    await supabaseClient
      .from('pandadoc_webhooks')
      .update({ agreement_id: agreement.id })
      .eq('document_id', webhookData.data?.id || webhookData.document_id)
      .is('agreement_id', null)

    // Handle different webhook events
    let newStatus = agreement.status
    let pandadocStatus = webhookData.data?.status || webhookData.status

    switch (webhookData.event_type) {
      case 'document_state_changed':
        switch (pandadocStatus) {
          case 'document.draft':
            newStatus = 'draft'
            break
          case 'document.sent':
            newStatus = 'pending_signatures'
            break
          case 'document.viewed':
            // Keep current status but update pandadoc_status
            break
          case 'document.waiting_approval':
            newStatus = 'partially_signed'
            break
          case 'document.completed':
            newStatus = 'fully_signed'
            break
          case 'document.cancelled':
          case 'document.declined':
            newStatus = 'expired'
            break
        }
        break
      
      case 'recipient_completed':
        // Check if all recipients have completed
        if (pandadocStatus === 'document.completed') {
          newStatus = 'fully_signed'
        } else {
          newStatus = 'partially_signed'
        }
        break
    }

    // Update agreement status
    const updateData: any = {
      pandadoc_status: pandadocStatus,
      status: newStatus,
      updated_at: new Date().toISOString()
    }

    if (webhookData.data?.download_url) {
      updateData.pandadoc_download_url = webhookData.data.download_url
    }

    if (newStatus === 'fully_signed' && !agreement.pandadoc_completed_at) {
      updateData.pandadoc_completed_at = new Date().toISOString()
    }

    await supabaseClient
      .from('admissions_agreements')
      .update(updateData)
      .eq('id', agreement.id)

    return new Response('OK', { 
      headers: corsHeaders,
      status: 200 
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response('Error', { 
      headers: corsHeaders,
      status: 500 
    })
  }
})
