import {
  ActivityCategoryRepeatTypeOptions,
  ActivityUnitType,
} from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { CategoryProgress } from '@schemas/category-progress';
import {
  getDurationFromString,
  getSecondsFromDuration,
  toDurationString,
} from '@utils/duration';

/**
 *
 * @param activities
 * @param unitType
 * @returns total value of activities
 */
function summariseActivities(
  activities: Activity[],
  unitType: ActivityUnitType = 'QUANTITY',
): number {
  if (unitType === 'TIME') {
    return activities.reduce(
      (t, v) => t + getSecondsFromDuration(v.duration),
      0,
    );
  }
  return activities.reduce((t, v) => t + v.value, 0);
}

export function getSummarisedActivities(
  activities: Activity[],
  unitType: ActivityUnitType = 'QUANTITY',
): string {
  const total = summariseActivities(activities, unitType);
  if (unitType === 'TIME') {
    return toDurationString(total);
  }
  return total.toString();
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

export function getProgressValue(progress: CategoryProgress): string {
  return progress.category.unitType === 'QUANTITY'
    ? (100 * (progress.value / progress.category.goalValue)).toFixed(0)
    : (
        100 *
        (getSecondsFromDuration(progress.duration) /
          getSecondsFromDuration(progress.category.duration))
      ).toFixed(0);
}
