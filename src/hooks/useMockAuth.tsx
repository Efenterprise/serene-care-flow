
import React, { createContext, useContext } from 'react';

// Mock user profile for demo purposes
const mockProfile = {
  user_id: 'demo-user-123',
  first_name: 'Demo',
  last_name: 'User',
  email: 'demo@healthcare.com',
  role: 'admin',
  is_active: true,
  last_login_at: new Date().toISOString(),
  work_location: 'facility_only',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const mockUser = {
  id: 'demo-user-123',
  email: 'demo@healthcare.com',
  created_at: new Date().toISOString()
};

interface MockAuthContextType {
  user: any;
  session: any;
  profile: any;
  loading: boolean;
  signIn: () => Promise<{ error?: any }>;
  signUp: () => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    // Return mock data for components that still reference useAuth
    return {
      user: mockUser,
      session: { access_token: 'mock-token' },
      profile: mockProfile,
      loading: false,
      signIn: async () => ({ error: null }),
      signUp: async () => ({ error: null }),
      signOut: async () => {},
      refreshProfile: async () => {}
    };
  }
  return context;
};

export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = {
    user: mockUser,
    session: { access_token: 'mock-token' },
    profile: mockProfile,
    loading: false,
    signIn: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => {},
    refreshProfile: async () => {}
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
};
