export type ActivityCategoryStatus = 'ACTIVE' | 'ARCHIVED';

export type ActivityCategoryGoalType = 'MIN' | 'MAX' | 'RANGE';

export type ActivityCategoryRepeatType = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export type ActivityUnitType = 'TIME' | 'QUANTITY';

export const ActivityCategoryGoalTypeOptions: Record<
  ActivityCategoryGoalType,
  string
> = { MIN: 'Minimum', MAX: 'Maximum', RANGE: 'Range' };

export const ActivityCategoryRepeatTypeOptions: Record<
  ActivityCategoryRepeatType,
  string
> = {
  DAILY: 'per day',
  WEEKLY: 'per week',
  MONTHLY: 'per month',
};

export const ActivityCategoryRepeatTypePeriods: Record<
  ActivityCategoryRepeatType,
  string
> = {
  DAILY: 'day',
  WEEKLY: 'week',
  MONTHLY: 'month',
};

export const ActivityUnitTypeOptions: Record<ActivityUnitType, string> = {
  QUANTITY: 'Quantity',
  TIME: 'Time',
};
