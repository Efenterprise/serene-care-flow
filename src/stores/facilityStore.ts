
import { useFacilityStatsStore } from './facilityStatsStore';
import { useTherapyStatsStore } from './therapyStatsStore';

// Combined store that provides both facility and therapy stats
// This maintains the existing API for backward compatibility
export const useFacilityStore = () => {
  const facilityStore = useFacilityStatsStore();
  const therapyStore = useTherapyStatsStore();

  // Custom fetchTherapyStats that updates therapy stats based on facility stats
  const fetchTherapyStats = () => {
    therapyStore.fetchTherapyStats(facilityStore.stats.currentResidents);
  };

  // Enhanced fetchFacilityStats that also updates therapy stats
  const fetchFacilityStats = async () => {
    await facilityStore.fetchFacilityStats();
    therapyStore.updateTherapyStatsFromResidents(facilityStore.stats.currentResidents);
  };

  // Enhanced updateResidentCount that also updates therapy stats
  const updateResidentCount = (change: number) => {
    facilityStore.updateResidentCount(change);
    const newResidentCount = facilityStore.stats.currentResidents + change;
    therapyStore.updateTherapyStatsFromResidents(Math.max(0, newResidentCount));
  };

  return {
    // Facility stats
    stats: facilityStore.stats,
    isLoading: facilityStore.isLoading,
    error: facilityStore.error,
    
    // Therapy stats
    therapyStats: therapyStore.therapyStats,
    
    // Combined actions
    fetchFacilityStats,
    fetchTherapyStats,
    updateResidentCount,
    updateAdmissions: facilityStore.updateAdmissions,
    resetError: facilityStore.resetError,
  };
};
