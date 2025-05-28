
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface AnalyticsData {
  census?: any;
  auditTrail?: any[];
  residents?: any[];
  activities?: any[];
}

async function getCensusData(): Promise<any> {
  const { data: residents } = await supabase
    .from('residents')
    .select('status, admission_date, discharge_date')
    .eq('status', 'current');

  const { data: beds } = await supabase
    .from('beds')
    .select('is_available, bed_type');

  const currentResidents = residents?.length || 0;
  const totalBeds = beds?.length || 0;
  const availableBeds = beds?.filter(bed => bed.is_available)?.length || 0;
  const occupancyRate = totalBeds > 0 ? ((currentResidents / totalBeds) * 100).toFixed(1) : 0;

  return {
    currentResidents,
    totalBeds,
    availableBeds,
    occupancyRate: `${occupancyRate}%`,
    admissionsToday: residents?.filter(r => 
      new Date(r.admission_date).toDateString() === new Date().toDateString()
    )?.length || 0
  };
}

async function getAuditTrail(hours: number = 24): Promise<any[]> {
  const since = new Date(Date.now() - (hours * 60 * 60 * 1000)).toISOString();
  
  const { data } = await supabase
    .from('audit_trail')
    .select('action, user_email, timestamp, resource_type, success')
    .gte('timestamp', since)
    .order('timestamp', { ascending: false })
    .limit(50);

  return data || [];
}

async function getResidentActivities(): Promise<any[]> {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: residents } = await supabase
    .from('residents')
    .select('first_name, last_name, room_number, care_level, status')
    .eq('status', 'current')
    .limit(20);

  return residents || [];
}

async function analyzeQuery(query: string): Promise<AnalyticsData> {
  const data: AnalyticsData = {};
  const queryLower = query.toLowerCase();

  // Determine what data to fetch based on the query
  if (queryLower.includes('census') || queryLower.includes('bed') || queryLower.includes('occupancy')) {
    data.census = await getCensusData();
  }

  if (queryLower.includes('audit') || queryLower.includes('user') || queryLower.includes('activity') || queryLower.includes('log')) {
    data.auditTrail = await getAuditTrail();
  }

  if (queryLower.includes('resident') || queryLower.includes('patient') || queryLower.includes('clinical')) {
    data.residents = await getResidentActivities();
  }

  // If no specific data type detected, provide a general overview
  if (Object.keys(data).length === 0) {
    data.census = await getCensusData();
    data.auditTrail = await getAuditTrail(4); // Last 4 hours for overview
  }

  return data;
}

async function generateAIResponse(query: string, data: AnalyticsData): Promise<string> {
  const systemPrompt = `You are a healthcare analytics AI assistant for a senior living facility. 
  Analyze the provided facility data and respond to user queries with actionable insights.
  
  Focus on:
  - Patient safety and care quality
  - Operational efficiency
  - Compliance and documentation
  - Resource utilization
  - Trend analysis
  
  Be concise, professional, and provide specific numbers when available.
  Format responses with clear sections and bullet points when appropriate.`;

  const dataContext = `Current facility data:
  ${JSON.stringify(data, null, 2)}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${query}\n\nFacility Data:\n${dataContext}` }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'I apologize, but I encountered an error processing your request. Please try again.';
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      throw new Error('Query is required');
    }

    console.log('Processing query:', query);

    // Analyze the query and fetch relevant data
    const data = await analyzeQuery(query);
    console.log('Fetched data:', Object.keys(data));

    // Generate AI response
    const aiResponse = await generateAIResponse(query, data);

    // Log the interaction for audit purposes
    await supabase.from('audit_trail').insert({
      action: 'AI_QUERY',
      resource_type: 'ai_proact',
      details: { query, dataTypes: Object.keys(data) },
      user_email: 'system',
      success: true
    });

    return new Response(JSON.stringify({
      response: aiResponse,
      data: data,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-proact function:', error);
    
    // Log the error
    await supabase.from('audit_trail').insert({
      action: 'AI_QUERY_ERROR',
      resource_type: 'ai_proact',
      details: { error: error.message },
      user_email: 'system',
      success: false,
      error_message: error.message
    });

    return new Response(JSON.stringify({ 
      error: error.message,
      response: 'I apologize, but I encountered an error processing your request. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
