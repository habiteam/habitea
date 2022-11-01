import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ActivityCategoryStatus = 'ACTIVE' | 'ARCHIVED';

export type ActivityCategoryGoalType = 'MIN' | 'MAX' | 'RANGE';

export type ActivityCategoryRepeatType = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface ActivityCategory {
  name: string;
  icon?: IconDefinition;
  description?: string;
  status: ActivityCategoryStatus;
  goalValue: number;
  goalType: ActivityCategoryGoalType;
  repeatType: ActivityCategoryRepeatType;
  unit: string;
}
