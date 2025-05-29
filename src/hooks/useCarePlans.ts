
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CarePlan {
  id: string;
  resident_id: string;
  problem: string;
  goal: string;
  target_date?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'met' | 'discontinued' | 'on_hold';
  progress: number;
  start_date: string;
  assigned_to?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  notes?: string;
  interventions?: CarePlanIntervention[];
  outcomes?: CarePlanOutcome[];
}

export interface CarePlanIntervention {
  id: string;
  care_plan_id: string;
  intervention: string;
  frequency: string;
  status: 'active' | 'completed' | 'discontinued';
  last_completed?: string;
  created_at: string;
  updated_at: string;
}

export interface CarePlanOutcome {
  id: string;
  care_plan_id: string;
  outcome_date: string;
  outcome_text: string;
  recorded_by?: string;
  created_at: string;
}

export interface CreateCarePlanData {
  resident_id: string;
  problem: string;
  goal: string;
  target_date?: string;
  priority: 'low' | 'medium' | 'high';
  assigned_to?: string;
  notes?: string;
  interventions: string[];
}

export interface UpdateCarePlanData extends Partial<CreateCarePlanData> {
  id: string;
  status?: 'active' | 'met' | 'discontinued' | 'on_hold';
  progress?: number;
}

export const useCarePlans = (residentId?: string) => {
  return useQuery({
    queryKey: ['care-plans', residentId],
    queryFn: async () => {
      let query = supabase
        .from('care_plans')
        .select(`
          *,
          interventions:care_plan_interventions(*),
          outcomes:care_plan_outcomes(*)
        `)
        .order('created_at', { ascending: false });

      if (residentId) {
        query = query.eq('resident_id', residentId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching care plans:', error);
        throw error;
      }

      return data as CarePlan[];
    },
  });
};

export const useCarePlanStats = () => {
  return useQuery({
    queryKey: ['care-plan-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('care_plans')
        .select('status, priority');

      if (error) {
        console.error('Error fetching care plan stats:', error);
        throw error;
      }

      const stats = data.reduce((acc, plan) => {
        acc.total = (acc.total || 0) + 1;
        acc[plan.status] = (acc[plan.status] || 0) + 1;
        acc[`${plan.priority}_priority`] = (acc[`${plan.priority}_priority`] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        total: stats.total || 0,
        active: stats.active || 0,
        met: stats.met || 0,
        discontinued: stats.discontinued || 0,
        on_hold: stats.on_hold || 0,
        high_priority: stats.high_priority || 0,
        medium_priority: stats.medium_priority || 0,
        low_priority: stats.low_priority || 0,
      };
    },
  });
};

export const useCreateCarePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCarePlanData) => {
      const { interventions, ...carePlanData } = data;

      // Create the care plan
      const { data: carePlan, error: carePlanError } = await supabase
        .from('care_plans')
        .insert([carePlanData])
        .select()
        .single();

      if (carePlanError) {
        console.error('Error creating care plan:', carePlanError);
        throw carePlanError;
      }

      // Create interventions if provided
      if (interventions.length > 0) {
        const interventionData = interventions.map(intervention => ({
          care_plan_id: carePlan.id,
          intervention,
          frequency: 'Daily', // Default frequency
        }));

        const { error: interventionError } = await supabase
          .from('care_plan_interventions')
          .insert(interventionData);

        if (interventionError) {
          console.error('Error creating interventions:', interventionError);
          throw interventionError;
        }
      }

      return carePlan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['care-plans'] });
      queryClient.invalidateQueries({ queryKey: ['care-plan-stats'] });
    },
  });
};

export const useUpdateCarePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCarePlanData) => {
      const { id, ...updateData } = data;

      const { data: carePlan, error } = await supabase
        .from('care_plans')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating care plan:', error);
        throw error;
      }

      return carePlan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['care-plans'] });
      queryClient.invalidateQueries({ queryKey: ['care-plan-stats'] });
    },
  });
};

export const useDeleteCarePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carePlanId: string) => {
      const { error } = await supabase
        .from('care_plans')
        .delete()
        .eq('id', carePlanId);

      if (error) {
        console.error('Error deleting care plan:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['care-plans'] });
      queryClient.invalidateQueries({ queryKey: ['care-plan-stats'] });
    },
  });
};
