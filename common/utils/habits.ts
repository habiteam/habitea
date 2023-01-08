import {
  ActivityCategoryRepeatTypeOptions,
  ActivityUnitType,
} from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { getDurationFromString, getSecondsFromDuration } from '@utils/duration';

/**
 *
 * @param activities
 * @param unitType
 * @returns total value of activities
 */
export function summariseActivities(
  activities: Activity[],
  unitType: ActivityUnitType = 'QUANTITY',
): number {
  if (unitType === 'TIME') {
    return activities.reduce(
      (t, v) => t + getSecondsFromDuration(v.duration),
      0,
    );
  }
  return activities.reduce((t, v) => t + parseInt(v.duration, 10), 0);
}

/**
 *
 * @param category
 * @returns goal description like "10 km per week"
 */
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

/**
 *
 * @param activities
 * @param category
 * @returns progress as percentage
 */
export function calculateProgress(
  activities: Activity[],
  category: ActivityCategory | null = null,
): number {
  if (!category) return -1;
  return (
    (category?.unitType === 'QUANTITY'
      ? summariseActivities(activities ?? [], category?.unitType) /
        category.goalValue
      : summariseActivities(activities ?? [], category?.unitType) /
        getSecondsFromDuration(category?.duration as string)) * 100
  );
}
