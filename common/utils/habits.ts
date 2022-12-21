import { ActivityCategoryRepeatTypeOptions } from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { getDurationFromString } from '@utils/duration';

export function summariseActivities(activities: Activity[]): number {
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
