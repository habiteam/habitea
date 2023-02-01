import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { getWeekOfYear } from './date';

export function getActivityValue(
  activity: Activity,
  category: ActivityCategory,
): string {
  return category.unitType === 'QUANTITY'
    ? `${activity.value} ${category.unit}`
    : activity.duration;
}

export function checkIfDatesAreInPeriod(
  date1: Date,
  date2: Date,
  category: ActivityCategory,
): boolean {
  if (category.repeatType === 'MONTHLY') {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  if (category.repeatType === 'WEEKLY') {
    return (
      getWeekOfYear(date1) === getWeekOfYear(date2) &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
