
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  // Store connected clients for broadcasting
  const clients = new Set();
  clients.add(socket);

  socket.onopen = () => {
    console.log("Client connected to real-time referral sync");
    
    // Send initial connection confirmation
    socket.send(JSON.stringify({
      type: 'connection_established',
      timestamp: new Date().toISOString(),
      message: 'Real-time referral sync active'
    }));
  };

  socket.onmessage = async (event) => {
    try {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);

      switch (message.type) {
        case 'subscribe_to_platform':
          await handlePlatformSubscription(message, socket);
          break;
        case 'sync_platform_data':
          await handlePlatformSync(message, socket);
          break;
        case 'test_connection':
          await handleConnectionTest(message, socket);
          break;
        default:
          socket.send(JSON.stringify({
            type: 'error',
            message: 'Unknown message type'
          }));
      }
    } catch (error) {
      console.error("Error processing message:", error);
      socket.send(JSON.stringify({
        type: 'error',
        message: 'Failed to process message'
      }));
    }
  };

  socket.onclose = () => {
    console.log("Client disconnected from real-time referral sync");
    clients.delete(socket);
  };

  return response;
});

async function handlePlatformSubscription(message: any, socket: WebSocket) {
  const { platformId, credentials } = message;
  
  try {
    // Validate platform credentials and establish connection
    const { data: platform, error } = await supabase
      .from('referral_platforms')
      .select('*')
      .eq('id', platformId)
      .single();

    if (error) throw error;

    // Simulate platform connection establishment
    console.log(`Establishing connection to ${platform.name}`);
    
    // In a real implementation, this would:
    // 1. Validate credentials against the platform API
    // 2. Set up webhook listeners or polling mechanisms
    // 3. Store secure session tokens
    
    socket.send(JSON.stringify({
      type: 'platform_connected',
      platformId,
      platformName: platform.name,
      status: 'connected',
      timestamp: new Date().toISOString()
    }));

    // Start monitoring for new referrals (simulated)
    startReferralMonitoring(platformId, socket);
    
  } catch (error) {
    console.error("Platform subscription error:", error);
    socket.send(JSON.stringify({
      type: 'platform_connection_failed',
      platformId,
      error: error.message
    }));
  }
}

async function handlePlatformSync(message: any, socket: WebSocket) {
  const { platformId } = message;
  
  try {
    // Simulate fetching new referrals from platform
    const mockReferrals = await simulateNewReferrals(platformId);
    
    // Process each new referral
    for (const referral of mockReferrals) {
      // Insert into database
      const { data, error } = await supabase
        .from('referrals')
        .insert(referral)
        .select()
        .single();
        
      if (!error) {
        // Notify client of new referral
        socket.send(JSON.stringify({
          type: 'new_referral',
          referral: data,
          timestamp: new Date().toISOString()
        }));
        
        console.log(`New referral processed: ${data.patient_name}`);
      }
    }
    
  } catch (error) {
    console.error("Platform sync error:", error);
    socket.send(JSON.stringify({
      type: 'sync_error',
      error: error.message
    }));
  }
}

async function handleConnectionTest(message: any, socket: WebSocket) {
  const { platformId, credentials } = message;
  
  // Simulate connection test
  const testResult = {
    type: 'connection_test_result',
    platformId,
    success: true,
    latency: Math.floor(Math.random() * 100) + 50, // 50-150ms
    timestamp: new Date().toISOString()
  };
  
  socket.send(JSON.stringify(testResult));
}

function startReferralMonitoring(platformId: string, socket: WebSocket) {
  // Simulate periodic checking for new referrals
  const interval = setInterval(async () => {
    try {
      // In real implementation, this would check platform APIs
      const hasNewReferrals = Math.random() > 0.8; // 20% chance of new referral
      
      if (hasNewReferrals) {
        const mockReferrals = await simulateNewReferrals(platformId);
        
        for (const referral of mockReferrals) {
          const { data, error } = await supabase
            .from('referrals')
            .insert(referral)
            .select()
            .single();
            
          if (!error) {
            socket.send(JSON.stringify({
              type: 'new_referral',
              referral: data,
              timestamp: new Date().toISOString()
            }));
          }
        }
      }
    } catch (error) {
      console.error("Monitoring error:", error);
    }
  }, 30000); // Check every 30 seconds

  // Clean up interval when socket closes
  socket.addEventListener('close', () => {
    clearInterval(interval);
  });
}

async function simulateNewReferrals(platformId: string) {
  // Get platform info
  const { data: platform } = await supabase
    .from('referral_platforms')
    .select('*')
    .eq('id', platformId)
    .single();

  if (!platform) return [];

  // Generate realistic referral data based on platform type
  const baseReferral = {
    external_id: `${platform.platform_type}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    platform_id: platformId,
    source: platform.platform_type,
    status: 'pending',
    priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
    ai_score: Math.floor(Math.random() * 40) + 60, // 60-100
    created_at: new Date().toISOString(),
    ready_date: new Date(Date.now() + Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  // Generate different data based on platform
  const patients = [
    { name: "John Smith", dob: "1945-03-15", gender: "Male", diagnosis: "Hip Fracture Recovery" },
    { name: "Mary Johnson", dob: "1938-07-22", gender: "Female", diagnosis: "Stroke Recovery" },
    { name: "Robert Davis", dob: "1952-11-08", gender: "Male", diagnosis: "Post-Surgical Care" },
    { name: "Linda Wilson", dob: "1940-05-12", gender: "Female", diagnosis: "Pneumonia Recovery" }
  ];

  const patient = patients[Math.floor(Math.random() * patients.length)];
  
  return [{
    ...baseReferral,
    patient_name: patient.name,
    patient_dob: patient.dob,
    patient_gender: patient.gender,
    diagnosis: patient.diagnosis,
    diagnosis_codes: ["Z51.11"],
    referring_hospital: "General Hospital",
    referring_physician: "Dr. Smith",
    primary_insurance: ['medicare_a', 'medicare_advantage', 'commercial'][Math.floor(Math.random() * 3)],
    estimated_los: Math.floor(Math.random() * 20) + 5,
    estimated_daily_rate: Math.floor(Math.random() * 200) + 250,
    acuity_level: Math.floor(Math.random() * 4) + 1,
    clinical_notes: `Real-time referral from ${platform.name} integration`
  }];
}
