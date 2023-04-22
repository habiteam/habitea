import React, { useEffect, useState } from 'react';
import { ActivityCategory } from '@schemas/activity-category';
import { useAtomValue } from 'jotai';
import { userAtom } from '@atoms/user';
import { ActivitiesService } from '@services/activities';
import { Activity } from '@schemas/activity';
import { useAddNotification } from '@utils/notifications';
import classNames from 'classnames';
import { calculateProgress } from '@utils/habits';
import styles from './MontlhyProgressChart.module.scss';

export interface MontlhyProgressChartProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  date: Date;
  category: ActivityCategory;
}

interface MonthlyProgress {
  day: number;
  value: number;
}

export default function MontlhyProgressChart(props: MontlhyProgressChartProps) {
  const user = useAtomValue(userAtom);
  const [monthlyProgress, setMonthlyProgress] = useState<MonthlyProgress[]>([]);
  const addNotifcation = useAddNotification();

  const groupByDay = (activities: Activity[]): MonthlyProgress[] => {
    const progresses: MonthlyProgress[] = [];

    activities.forEach((activity) => {
      const findProgressIndex = progresses.findIndex(
        (prog) => prog.day === activity.activityDate.toDate().getDate(),
      );

      if (findProgressIndex !== -1) {
        progresses[findProgressIndex].value += calculateProgress(
          [activity],
          props.category,
        );
      } else {
        progresses.push({
          day: activity.activityDate.toDate().getDate(),
          value: calculateProgress([activity], props.category),
        });
      }
    });

    return progresses;
  };

  useEffect(() => {
    if (user) {
      // fetch activities for current month
      const fetchActivities = async () => {
        try {
          const fetchedActivities =
            await ActivitiesService.getByCategoryForMonth(
              props.category,
              props.date,
              user.uid,
              'asc',
            );

          setMonthlyProgress(groupByDay(fetchedActivities));
        } catch (e) {
          addNotifcation({
            type: 'danger',
            message: 'Could not fetch activities',
          });
        }
      };

      fetchActivities();
    }
  }, [props.category]);

  return (
    <>
      {monthlyProgress.length > 0 && (
        <div>
          <h2>Monthly progress</h2>
          <div className={classNames(styles.chart)}>
            {monthlyProgress.map((progress) => (
              <div className={classNames(styles.day)} key={progress.day}>
                <div className={classNames(styles.day__number)}>
                  {progress.day}
                </div>
                <div className={classNames(styles.day__track)}>
                  <div
                    className={classNames(styles.day__bar)}
                    style={{ height: `${Math.min(progress.value, 100)}%` }}
                  >
                    <span> {progress.value.toFixed(0)} </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
