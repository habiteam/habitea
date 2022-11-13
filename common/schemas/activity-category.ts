import { IconName } from '@fortawesome/fontawesome-svg-core';

export type ActivityCategoryStatus = 'ACTIVE' | 'ARCHIVED';

export type ActivityCategoryGoalType = 'MIN' | 'MAX' | 'RANGE';

export type ActivityCategoryRepeatType = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface ActivityCategory {
  id: string;
  name: string;
  icon?: IconName;
  description?: string;
  status: ActivityCategoryStatus;
  goalValue: string | number;
  goalType: ActivityCategoryGoalType;
  repeatType: ActivityCategoryRepeatType;
  unit: string;
  createdDate: string;
  createdBy: string;
  validFrom?: string;
  validTo?: string;
}
