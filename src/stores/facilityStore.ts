
import { useFacilityStatsStore } from './facilityStatsStore';
import { useTherapyStatsStore } from './therapyStatsStore';
import { useCallback } from 'react';

// Combined store that provides both facility and therapy stats
// This maintains the existing API for backward compatibility
export const useFacilityStore = () => {
  const facilityStore = useFacilityStatsStore();
  const therapyStore = useTherapyStatsStore();

  // Create stable function references using useCallback
  const fetchTherapyStats = useCallback(() => {
    therapyStore.fetchTherapyStats(facilityStore.stats.currentResidents);
  }, [facilityStore.stats.currentResidents, therapyStore.fetchTherapyStats]);

  const fetchFacilityStats = useCallback(async () => {
    // Call the underlying facility store's fetch function
    await facilityStore.fetchFacilityStats();
    // Then update therapy stats based on the new facility data
    therapyStore.updateTherapyStatsFromResidents(facilityStore.stats.currentResidents);
  }, [facilityStore.fetchFacilityStats, facilityStore.stats.currentResidents, therapyStore.updateTherapyStatsFromResidents]);

  const updateResidentCount = useCallback((change: number) => {
    // Call the underlying facility store's update function
    facilityStore.updateResidentCount(change);
    // Calculate the new count and update therapy stats
    const newResidentCount = Math.max(0, facilityStore.stats.currentResidents + change);
    therapyStore.updateTherapyStatsFromResidents(newResidentCount);
  }, [facilityStore.updateResidentCount, facilityStore.stats.currentResidents, therapyStore.updateTherapyStatsFromResidents]);

  return {
    // Facility stats
    stats: facilityStore.stats,
    isLoading: facilityStore.isLoading,
    error: facilityStore.error,
    
    // Therapy stats
    therapyStats: therapyStore.therapyStats,
    
    // Stable function references
    fetchFacilityStats,
    fetchTherapyStats,
    updateResidentCount,
    updateAdmissions: facilityStore.updateAdmissions,
    resetError: facilityStore.resetError,
  };
};
