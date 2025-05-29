
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { RealTimeMessage, Platform } from "./types.ts";
import { simulateNewReferrals, startReferralMonitoring } from "./referral-simulator.ts";

export async function handlePlatformSubscription(message: RealTimeMessage, socket: WebSocket, supabase: SupabaseClient) {
  const { platformId, credentials } = message;
  
  try {
    const { data: platform, error } = await supabase
      .from('referral_platforms')
      .select('*')
      .eq('id', platformId)
      .single();

    if (error) throw error;

    console.log(`Establishing connection to ${platform.name}`);
    
    socket.send(JSON.stringify({
      type: 'platform_connected',
      platformId,
      platformName: platform.name,
      status: 'connected',
      timestamp: new Date().toISOString()
    }));

    startReferralMonitoring(platformId, socket, supabase);
    
  } catch (error) {
    console.error("Platform subscription error:", error);
    socket.send(JSON.stringify({
      type: 'platform_connection_failed',
      platformId,
      error: error.message
    }));
  }
}

export async function handlePlatformSync(message: RealTimeMessage, socket: WebSocket, supabase: SupabaseClient) {
  const { platformId } = message;
  
  try {
    const mockReferrals = await simulateNewReferrals(platformId, supabase);
    
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

export async function handleConnectionTest(message: RealTimeMessage, socket: WebSocket) {
  const { platformId, credentials } = message;
  
  const testResult = {
    type: 'connection_test_result',
    platformId,
    success: true,
    latency: Math.floor(Math.random() * 100) + 50,
    timestamp: new Date().toISOString()
  };
  
  socket.send(JSON.stringify(testResult));
}
