import {
  ActivityCategoryGoalType,
  ActivityCategoryRepeatType,
  ActivityCategoryStatus,
  ActivityUnitType,
} from '@constants/dictionaries';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Timestamp } from 'firebase/firestore';

export interface ActivityCategory {
  id: string;
  name: string;
  icon: IconName;
  description?: string;
  status: ActivityCategoryStatus;
  goalValue: string | number;
  goalType: ActivityCategoryGoalType;
  repeatType: ActivityCategoryRepeatType;
  unit: string;
  unitType: ActivityUnitType;
  duration: string;
  createdDate: Timestamp;
  createdBy: string;
  validFrom?: string;
  validTo?: string;
}

export type ActivityCategoryCreateFormType = Omit<
  ActivityCategory,
  'id' | 'createdDate' | 'createdBy'
>;
