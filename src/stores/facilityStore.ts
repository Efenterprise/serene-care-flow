
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

interface FacilityStats {
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  occupancyRate: number;
  currentResidents: number;
  dischargedResidents: number;
  pendingAdmissions: number;
  temporaryLeave: number;
  todayAdmissions: number;
  todayDischarges: number;
  lastUpdated: Date;
}

interface TherapyStats {
  activePatients: number;
  todaySessions: number;
  completedSessions: number;
  remainingSessions: number;
  goalAchievementRate: number;
  monthlyRevenue: number;
  lastUpdated: Date;
}

interface FacilityStore {
  stats: FacilityStats;
  therapyStats: TherapyStats;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchFacilityStats: () => Promise<void>;
  fetchTherapyStats: () => Promise<void>;
  updateResidentCount: (change: number) => void;
  updateAdmissions: (admissions: number, discharges: number) => void;
  resetError: () => void;
}

export const useFacilityStore = create<FacilityStore>((set, get) => ({
  stats: {
    totalBeds: 120,
    occupiedBeds: 95,
    availableBeds: 25,
    occupancyRate: 79.2,
    currentResidents: 95,
    dischargedResidents: 0,
    pendingAdmissions: 8,
    temporaryLeave: 0,
    todayAdmissions: 3,
    todayDischarges: 1,
    lastUpdated: new Date(),
  },
  therapyStats: {
    activePatients: 95, // Should match current residents
    todaySessions: 47,
    completedSessions: 23,
    remainingSessions: 24,
    goalAchievementRate: 87,
    monthlyRevenue: 284000,
    lastUpdated: new Date(),
  },
  isLoading: false,
  error: null,

  fetchFacilityStats: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Fetch resident statistics from Supabase
      const { data: residents, error: residentsError } = await supabase
        .from('residents')
        .select('status, admission_date, discharge_date');

      if (residentsError) throw residentsError;

      // Fetch bed information
      const { data: beds, error: bedsError } = await supabase
        .from('beds')
        .select('is_available');

      if (bedsError) throw bedsError;

      // Calculate statistics
      const today = new Date().toISOString().split('T')[0];
      
      const currentResidents = residents?.filter(r => r.status === 'current').length || 0;
      const dischargedResidents = residents?.filter(r => r.status === 'discharged').length || 0;
      const pendingAdmissions = residents?.filter(r => r.status === 'pending_admission').length || 0;
      const temporaryLeave = residents?.filter(r => r.status === 'temporary_leave').length || 0;
      
      const todayAdmissions = residents?.filter(r => 
        r.admission_date === today && r.status === 'current'
      ).length || 0;
      
      const todayDischarges = residents?.filter(r => 
        r.discharge_date === today && r.status === 'discharged'
      ).length || 0;

      const totalBeds = beds?.length || 120;
      const occupiedBeds = currentResidents;
      const availableBeds = totalBeds - occupiedBeds;
      const occupancyRate = totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0;

      set({
        stats: {
          totalBeds,
          occupiedBeds,
          availableBeds,
          occupancyRate: Math.round(occupancyRate * 10) / 10,
          currentResidents,
          dischargedResidents,
          pendingAdmissions,
          temporaryLeave,
          todayAdmissions,
          todayDischarges,
          lastUpdated: new Date(),
        },
        isLoading: false,
      });

      // Update therapy stats to match resident count
      get().fetchTherapyStats();

    } catch (error) {
      console.error('Error fetching facility stats:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch facility statistics',
        isLoading: false 
      });
    }
  },

  fetchTherapyStats: async () => {
    const { stats } = get();
    
    // Therapy stats should be based on current residents
    const activePatients = stats.currentResidents;
    
    // Calculate sessions based on active patients (average 0.5 sessions per patient per day)
    const avgSessionsPerPatient = 0.5;
    const todaySessions = Math.round(activePatients * avgSessionsPerPatient);
    const completedSessions = Math.round(todaySessions * 0.49); // 49% completed
    const remainingSessions = todaySessions - completedSessions;
    
    // Monthly revenue calculation (based on average $3000 per patient per month)
    const monthlyRevenue = activePatients * 3000;

    set({
      therapyStats: {
        activePatients,
        todaySessions,
        completedSessions,
        remainingSessions,
        goalAchievementRate: 87,
        monthlyRevenue,
        lastUpdated: new Date(),
      },
    });
  },

  updateResidentCount: (change: number) => {
    set((state) => {
      const newOccupied = Math.max(0, state.stats.occupiedBeds + change);
      const newCurrent = Math.max(0, state.stats.currentResidents + change);
      const newAvailable = state.stats.totalBeds - newOccupied;
      const newOccupancyRate = state.stats.totalBeds > 0 ? 
        (newOccupied / state.stats.totalBeds) * 100 : 0;

      return {
        stats: {
          ...state.stats,
          occupiedBeds: newOccupied,
          currentResidents: newCurrent,
          availableBeds: newAvailable,
          occupancyRate: Math.round(newOccupancyRate * 10) / 10,
          lastUpdated: new Date(),
        },
        therapyStats: {
          ...state.therapyStats,
          activePatients: newCurrent,
          lastUpdated: new Date(),
        },
      };
    });
  },

  updateAdmissions: (admissions: number, discharges: number) => {
    set((state) => ({
      stats: {
        ...state.stats,
        todayAdmissions: admissions,
        todayDischarges: discharges,
        lastUpdated: new Date(),
      },
    }));
  },

  resetError: () => set({ error: null }),
}));
