
import { create } from 'zustand';

interface TherapyStats {
  activePatients: number;
  todaySessions: number;
  completedSessions: number;
  remainingSessions: number;
  goalAchievementRate: number;
  monthlyRevenue: number;
  lastUpdated: Date;
}

interface TherapyStatsStore {
  therapyStats: TherapyStats;
  isUpdating: boolean;
  
  // Actions
  fetchTherapyStats: (currentResidents?: number) => void;
  updateTherapyStatsFromResidents: (currentResidents: number) => void;
}

export const useTherapyStatsStore = create<TherapyStatsStore>((set, get) => ({
  therapyStats: {
    activePatients: 95, // Should match current residents
    todaySessions: 47,
    completedSessions: 23,
    remainingSessions: 24,
    goalAchievementRate: 87,
    monthlyRevenue: 284000,
    lastUpdated: new Date(),
  },
  isUpdating: false,

  fetchTherapyStats: (currentResidents = 95) => {
    const currentState = get();
    if (currentState.isUpdating) {
      console.log('Therapy stats update already in progress, skipping...');
      return;
    }

    set({ isUpdating: true });

    console.log('Updating therapy stats based on facility data...', { currentResidents });
    
    // Therapy stats should be based on current residents
    const activePatients = currentResidents;
    
    // Calculate sessions based on active patients (average 0.5 sessions per patient per day)
    const avgSessionsPerPatient = 0.5;
    const todaySessions = Math.round(activePatients * avgSessionsPerPatient);
    const completedSessions = Math.round(todaySessions * 0.49); // 49% completed
    const remainingSessions = todaySessions - completedSessions;
    
    // Monthly revenue calculation (based on average $3000 per patient per month)
    const monthlyRevenue = activePatients * 3000;

    const newTherapyStats = {
      activePatients,
      todaySessions,
      completedSessions,
      remainingSessions,
      goalAchievementRate: 87,
      monthlyRevenue,
      lastUpdated: new Date(),
    };

    console.log('Updated therapy stats:', newTherapyStats);

    set({
      therapyStats: newTherapyStats,
      isUpdating: false,
    });
  },

  updateTherapyStatsFromResidents: (currentResidents: number) => {
    // Only update if the resident count actually changed to prevent unnecessary updates
    const currentActivePatients = get().therapyStats.activePatients;
    if (currentActivePatients !== currentResidents) {
      console.log('Resident count changed, updating therapy stats', { 
        from: currentActivePatients, 
        to: currentResidents 
      });
      get().fetchTherapyStats(currentResidents);
    }
  },
}));
