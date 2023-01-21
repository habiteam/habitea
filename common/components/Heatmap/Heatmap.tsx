import userAtom from '@atoms/user';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivitiesService } from '@services/activities';
import {
  getDateFromDayOfYear,
  getDayOfYear,
  getLastDayOfYear,
  getFirstDayOfYear,
  getPreviousYear,
  getNextYear,
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
  const user = useAtomValue(userAtom);

  const calculateSaturation = (strength: number, goal: number) =>
    (strength * 4) / goal;

  const loadPreviousYear = () => {
    setCurrentDate(getPreviousYear(currentDate));
  };

  const loadNextYear = () => {
    setCurrentDate(getNextYear(currentDate));
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const fetchedActivities = await ActivitiesService.getByCategoryForYear(
          props.category,
          currentDate,
          user.uid,
        );
        setActivities(fetchedActivities);
      };
      fetchData();
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
  const activityStrengthsByDay = activitiesByDay.map((a) => {
    if (!a) {
      return 0;
    }
    return a.reduce((acc, activity) => acc + activity.value, 0);
  });

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
              })}
              style={{
                filter: `saturate(${calculateSaturation(
                  activityStrengthsByDay[i],
                  props.category.goalValue,
                )})`,
              }}
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
          <button onClick={loadPreviousYear} className={styles.header__control}>
            &lt;
          </button>
          <button onClick={loadNextYear} className={styles.header__control}>
            &gt;
          </button>
        </div>
      </div>
      <div className={styles['heatmap-container']}>
        <div className={styles.heatmap}>{days.map((day) => day)}</div>
      </div>
    </div>
  );
}
