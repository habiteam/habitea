import { ActivityCategoryRepeatType } from '@constants/dictionaries';
import { QueryConstraint, Timestamp, where } from 'firebase/firestore';

/**
 *
 * @param period Category repeat type
 * @param date will create query for period containing this date
 * @returns
 */
export function getWheresForPeriod(
  period: ActivityCategoryRepeatType,
  date: Date,
): QueryConstraint[] {
  switch (period) {
    case 'DAILY':
      return [
        where(
          'activityDate',
          '>=',
          Timestamp.fromMillis(new Date(date).setHours(0, 0, 0, 0)),
        ),
        where(
          'activityDate',
          '<',
          Timestamp.fromMillis(new Date(date).setHours(24, 0, 0, 0)),
        ),
      ];

    case 'WEEKLY':
      return [
        where(
          'activityDate',
          '>=',
          Timestamp.fromMillis(
            new Date(
              new Date(date).setDate(
                new Date(date).getDate() - ((new Date(date).getDay() + 6) % 7),
              ),
            ).setHours(0, 0, 0, 0),
          ),
        ),
        where(
          'activityDate',
          '<',
          Timestamp.fromMillis(
            new Date(
              new Date(date).setDate(
                new Date(date).getDate() + (7 - new Date(date).getDay()),
              ),
            ).setHours(24, 0, 0, 0),
          ),
        ),
      ];

    case 'MONTHLY':
      return [
        where(
          'activityDate',
          '>=',
          Timestamp.fromMillis(
            new Date(new Date(date).setDate(1)).setHours(0, 0, 0, 0),
          ),
        ),
        where(
          'activityDate',
          '<',
          Timestamp.fromMillis(
            new Date(
              new Date(date).getFullYear(),
              new Date(date).getMonth() + 1,
              0,
            ).setHours(24, 0, 0, 0),
          ),
        ),
      ];

    default:
      return [
        where(
          'activityDate',
          '>=',
          Timestamp.fromMillis(new Date().setHours(0, 0, 0, 0)),
        ),
        where(
          'activityDate',
          '<',
          Timestamp.fromMillis(new Date().setHours(24, 0, 0, 0)),
        ),
      ];
  }
}
