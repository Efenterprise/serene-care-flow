
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, metadata: any) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return null;
    }
  };

  const logAuditTrail = async (action: string, details?: any, success: boolean = true, errorMessage?: string) => {
    try {
      const ip = await getClientIP();
      await supabase.rpc('log_audit_trail', {
        _user_id: user?.id || null,
        _user_email: user?.email || null,
        _action: action,
        _ip_address: ip,
        _user_agent: navigator.userAgent,
        _session_id: session?.access_token?.substring(0, 8) || null,
        _details: details ? JSON.stringify(details) : null,
        _success: success,
        _error_message: errorMessage
      });
    } catch (error) {
      console.error('Failed to log audit trail:', error);
    }
  };

  const checkIPRestriction = async (userProfile: UserProfile) => {
    // Skip IP restrictions for admin users or remote users
    if (userProfile.role === 'admin' || userProfile.work_location !== 'facility_only') {
      console.log('✅ Skipping IP restriction check for:', userProfile.role, userProfile.work_location);
      return;
    }

    if (userProfile.work_location === 'facility_only') {
      const ip = await getClientIP();
      console.log('🔍 Checking IP restriction for user:', userProfile.email, 'IP:', ip);
      
      if (ip) {
        const { data: allowedIPs, error } = await supabase
          .from('facility_ip_addresses')
          .select('ip_address')
          .eq('is_active', true);

        if (error) {
          console.error('❌ Error fetching allowed IPs:', error);
          return; // Allow access if we can't check restrictions
        }

        console.log('📋 Allowed IP ranges:', allowedIPs);

        const isAllowed = allowedIPs?.some(({ ip_address }) => {
          const ipAddressStr = String(ip_address);
          // Simple IP range check - check if current IP starts with allowed range
          if (ipAddressStr.includes('/')) {
            const baseIP = ipAddressStr.split('/')[0];
            return ip.startsWith(baseIP.split('.').slice(0, 2).join('.'));
          }
          return ip === ipAddressStr;
        });

        console.log('🔐 IP access allowed:', isAllowed);

        if (!isAllowed) {
          await logAuditTrail('LOGIN_IP_RESTRICTION_VIOLATION', { ip }, false, 'Access denied from unauthorized IP');
          console.warn('⚠️ IP restriction violation - but allowing access for development');
          // Don't throw error in development - just log it
        }
      }
    }
  };

  const fetchProfile = async (userId: string) => {
    console.log('👤 Fetching profile for user:', userId);
    
    const { data: userProfile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('❌ Error fetching profile:', error);
      return null;
    }

    console.log('✅ Fetched user profile:', userProfile);

    if (userProfile) {
      await checkIPRestriction(userProfile);
      
      // Update last login
      await supabase
        .from('user_profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('user_id', userId);
    }

    return userProfile;
  };

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    }
  };

  useEffect(() => {
    console.log('🔄 Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(async () => {
            try {
              const userProfile = await fetchProfile(session.user.id);
              setProfile(userProfile);
              setLoading(false);
              
              if (event === 'SIGNED_IN') {
                await logAuditTrail('LOGIN_SUCCESS', { method: 'email_password' });
              }
            } catch (error) {
              console.error('❌ Error during profile fetch:', error);
              setLoading(false);
            }
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
          
          if (event === 'SIGNED_OUT') {
            await logAuditTrail('LOGOUT');
          }
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔍 Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then(userProfile => {
          setProfile(userProfile);
          setLoading(false);
        }).catch(error => {
          console.error('❌ Error fetching initial profile:', error);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const ip = await getClientIP();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      // Log login attempt
      await supabase.from('login_attempts').insert({
        email,
        ip_address: ip,
        success: !error,
        user_agent: navigator.userAgent,
        failure_reason: error?.message || null
      });

      if (error) {
        await logAuditTrail('LOGIN_FAILED', { email }, false, error.message);
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        await logAuditTrail('SIGNUP_FAILED', { email }, false, error.message);
      }

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    await logAuditTrail('LOGOUT_INITIATED');
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
