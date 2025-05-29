
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { RealTimeMessage } from "./types.ts";
import { handlePlatformSubscription, handlePlatformSync, handleConnectionTest } from "./platform-handlers.ts";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

export function setupWebSocketHandlers(socket: WebSocket) {
  const clients = new Set();
  clients.add(socket);

  socket.onopen = () => {
    console.log("Client connected to real-time referral sync");
    
    socket.send(JSON.stringify({
      type: 'connection_established',
      timestamp: new Date().toISOString(),
      message: 'Real-time referral sync active'
    }));
  };

  socket.onmessage = async (event) => {
    try {
      const message: RealTimeMessage = JSON.parse(event.data);
      console.log("Received message:", message);

      switch (message.type) {
        case 'subscribe_to_platform':
          await handlePlatformSubscription(message, socket, supabase);
          break;
        case 'sync_platform_data':
          await handlePlatformSync(message, socket, supabase);
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
}
