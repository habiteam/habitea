import {
  ActivityCategoryRepeatTypeOptions,
  ActivityUnitType,
} from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { getDurationFromString, getSecondsFromDuration } from '@utils/duration';

export function summariseActivities(
  activities: Activity[],
  unitType: ActivityUnitType = 'QUANTITY',
): number {
  if (unitType === 'TIME') {
    return activities.reduce((t, v) => t + getSecondsFromDuration(v.value), 0);
  }
  return activities.reduce((t, v) => t + parseInt(v.value, 10), 0);
}

export function getCategoryGoalString(category: ActivityCategory): string {
  if (category.unitType === 'TIME') {
    const duration = getDurationFromString(category.duration);
    return `${duration.hours} hours, ${duration.minutes} minutes, ${
      duration.seconds
    } seconds ${ActivityCategoryRepeatTypeOptions[category.repeatType]}`;
  }

  return `${category.goalValue} ${category.unit} ${
    ActivityCategoryRepeatTypeOptions[category.repeatType]
  }`;
}
