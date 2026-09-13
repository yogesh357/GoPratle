'use client';

import React from 'react';
import { RequirementFormData } from '@/lib/types';
import PlannerFields from './PlannerFields';
import PerformerFields from './PerformerFields';
import CrewFields from './CrewFields';

interface Step2Props {
  formData: RequirementFormData;
  updateFormData: (updates: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

export default function Step2CategorySpecific({
  formData,
  updateFormData,
  errors,
}: Step2Props) {
  if (formData.category === 'planner') {
    return (
      <PlannerFields
        step={2}
        plannerDetails={formData.plannerDetails}
        updatePlannerDetails={(updates) =>
          updateFormData({
            plannerDetails: {
              ...(formData.plannerDetails as any),
              ...updates,
            },
          })
        }
        errors={errors}
      />
    );
  }

  if (formData.category === 'performer') {
    return (
      <PerformerFields
        step={2}
        performerDetails={formData.performerDetails}
        updatePerformerDetails={(updates) =>
          updateFormData({
            performerDetails: {
              ...(formData.performerDetails as any),
              ...updates,
            },
          })
        }
        errors={errors}
      />
    );
  }

  return (
    <CrewFields
      step={2}
      crewDetails={formData.crewDetails}
      updateCrewDetails={(updates) =>
        updateFormData({
          crewDetails: {
            ...(formData.crewDetails as any),
            ...updates,
          },
        })
      }
      errors={errors}
    />
  );
}
