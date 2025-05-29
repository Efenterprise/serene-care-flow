
import { useState, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface RealTimeMessage {
  type: string;
  [key: string]: any;
}

export const useRealTimeReferrals = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus('connecting');
    
    // Use the full WebSocket URL for the edge function
    const wsUrl = `wss://cjlsjdxboijvejugtqyv.functions.supabase.co/realtime-referral-sync`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log('Connected to real-time referral sync');
      setIsConnected(true);
      setConnectionStatus('connected');
      
      toast({
        title: "Real-time sync connected",
        description: "Now monitoring for live referral updates",
      });
    };

    wsRef.current.onmessage = (event) => {
      try {
        const message: RealTimeMessage = JSON.parse(event.data);
        handleMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    wsRef.current.onclose = () => {
      console.log('Disconnected from real-time referral sync');
      setIsConnected(false);
      setConnectionStatus('disconnected');
      
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) {
          connect();
        }
      }, 5000);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('error');
    };
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setConnectionStatus('disconnected');
  };

  const subscribeToPlatform = (platformId: string, credentials?: any) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      toast({
        title: "Connection Error",
        description: "Not connected to real-time sync service",
        variant: "destructive",
      });
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: 'subscribe_to_platform',
      platformId,
      credentials
    }));
  };

  const syncPlatformData = (platformId: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: 'sync_platform_data',
      platformId
    }));
  };

  const testConnection = (platformId: string, credentials: any) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: 'test_connection',
      platformId,
      credentials
    }));
  };

  const handleMessage = (message: RealTimeMessage) => {
    console.log('Received real-time message:', message);

    switch (message.type) {
      case 'connection_established':
        toast({
          title: "Real-time sync active",
          description: message.message,
        });
        break;

      case 'platform_connected':
        setActivePlatforms(prev => [...prev.filter(id => id !== message.platformId), message.platformId]);
        toast({
          title: "Platform Connected",
          description: `Successfully connected to ${message.platformName}`,
        });
        break;

      case 'platform_connection_failed':
        toast({
          title: "Platform Connection Failed",
          description: message.error,
          variant: "destructive",
        });
        break;

      case 'new_referral':
        // Invalidate referrals query to trigger refresh
        queryClient.invalidateQueries({ queryKey: ['referrals'] });
        
        toast({
          title: "New Referral Received",
          description: `${message.referral.patient_name} - ${message.referral.diagnosis}`,
        });
        break;

      case 'connection_test_result':
        toast({
          title: message.success ? "Connection Test Successful" : "Connection Test Failed",
          description: message.success ? `Latency: ${message.latency}ms` : "Failed to connect to platform",
          variant: message.success ? "default" : "destructive",
        });
        break;

      case 'sync_error':
        toast({
          title: "Sync Error",
          description: message.error,
          variant: "destructive",
        });
        break;

      case 'error':
        toast({
          title: "Real-time Error",
          description: message.message,
          variant: "destructive",
        });
        break;
    }
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    isConnected,
    connectionStatus,
    activePlatforms,
    connect,
    disconnect,
    subscribeToPlatform,
    syncPlatformData,
    testConnection
  };
};
