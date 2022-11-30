import {
  ActivityCategoryGoalType,
  ActivityCategoryRepeatType,
  ActivityCategoryStatus,
  ActivityUnitType,
} from '@constants/dictionaries';
import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface ActivityCategory {
  id: string;
  name: string;
  icon?: IconName;
  description?: string;
  status: ActivityCategoryStatus;
  goalValue: string | number;
  goalType: ActivityCategoryGoalType;
  repeatType: ActivityCategoryRepeatType;
  duration: string;
  unit: string;
  unitType: ActivityUnitType;
  createdDate: string;
  createdBy: string;
  validFrom?: string;
  validTo?: string;
}
