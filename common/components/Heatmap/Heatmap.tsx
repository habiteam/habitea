import { userAtom } from '@atoms/user';
import Button from '@commonComponents/Button/Button';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { CategoryProgress } from '@schemas/category-progress';
import { ActivitiesService } from '@services/activities';
import { CategoryProgressService } from '@services/category-progress';
import { checkIfDatesAreInPeriod } from '@utils/activity-utils';
import {
  getDateFromDayOfYear,
  getDayOfYear,
  getLastDayOfYear,
  getFirstDayOfYear,
  getPreviousYear,
  getNextYear,
  getWeekOfYear,
} from '@utils/date';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import styles from './Heatmap.module.scss';

interface HeatmapProps {
  date: Date;
  category: ActivityCategory;
}

export default function Heatmap(props: HeatmapProps) {
  const [currentDate, setCurrentDate] = useState(getFirstDayOfYear(props.date));
  const [activities, setActivities] = useState<Activity[]>([]);
  const [progress, setProgress] = useState<CategoryProgress[]>([]);
  const user = useAtomValue(userAtom);

  const loadPreviousYear = () => {
    setCurrentDate(getPreviousYear(currentDate));
  };

  const loadNextYear = () => {
    setCurrentDate(getNextYear(currentDate));
  };

  useEffect(() => {
    if (user) {
      const fetchActivities = async () => {
        const fetchedActivities = await ActivitiesService.getByCategoryForYear(
          props.category,
          currentDate,
          user.uid,
        );
        setActivities(fetchedActivities);
      };
      const fetchProgress = async () => {
        const fetchedProgress =
          await CategoryProgressService.getByCategoryForYear(
            props.category,
            currentDate,
          );
        setProgress(fetchedProgress);
        // fetchedProgress.forEach((element) => {
        //   console.log(element.activityDate.toDate(), element.isGoalCompleted);
        // });
      };
      fetchActivities();
      fetchProgress();
    }
  }, [currentDate, props.category]);

  // Group activities by day
  const activitiesByDay: Activity[][] = [];
  activities.forEach((activity) => {
    const day = getDayOfYear(activity.activityDate.toDate());
    if (!activitiesByDay[day]) {
      activitiesByDay[day] = [];
    }
    activitiesByDay[day].push(activity);
  });
  // reduce activities in each day to it's strength
  const activityStrengthsByDay: number[] = activitiesByDay.map((a) => {
    if (!a) {
      return 0;
    }
    return a.reduce((acc, activity) => acc + activity.value, 0);
  });

  // console.log(progress);
  // create items for each day
  const days = [];
  const lastDayIndex = getDayOfYear(getLastDayOfYear(currentDate));
  for (let i = 1; i <= lastDayIndex; i += 1) {
    days.push(
      <div key={i} className={styles['item-wrapper']}>
        {activityStrengthsByDay[i] ? (
          <div key={i} className={classNames(styles.item)}>
            <div
              className={classNames(styles.fill, {
                [styles['fill--good']]: props.category?.goalType === 'MIN',
                [styles['fill--bad']]: props.category?.goalType === 'MAX',
                [styles['fill--goal']]: progress.find((p) =>
                  checkIfDatesAreInPeriod(
                    p.activityDate.toDate(),
                    getDateFromDayOfYear(currentDate.getFullYear(), i),
                    p.category,
                  ),
                )?.isGoalCompleted,
              })}
            ></div>
            <div className={styles.tooltip}>
              {getDateFromDayOfYear(
                currentDate.getFullYear(),
                i,
              ).toDateString()}
            </div>
          </div>
        ) : (
          <div className={classNames(styles.item, styles['item--empty'])}>
            <div className={styles.tooltip}>
              {getDateFromDayOfYear(
                currentDate.getFullYear(),
                i,
              ).toDateString()}
            </div>
          </div>
        )}
      </div>,
    );
  }
  return (
    <div className={styles['heatmap-container-container']}>
      <div className={styles.header}>
        <h2>{currentDate.getFullYear()}</h2>

        <div className={styles.header__controls}>
          <Button onClick={loadPreviousYear} fillType="regular">
            &lt;
          </Button>

          <Button onClick={loadNextYear} fillType="regular">
            &gt;
          </Button>
        </div>
      </div>

      <div className={styles['heatmap-container']}>
        <div className={styles.heatmap}>{days.map((day) => day)}</div>
      </div>
    </div>
  );
}
