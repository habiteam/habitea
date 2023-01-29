import { Activity } from '@schemas/activity';

export function getActivityValue(activity: Activity): string {
  return activity.category?.unitType === 'QUANTITY'
    ? `${activity.value} ${activity.category?.unit}`
    : activity.duration;
}
