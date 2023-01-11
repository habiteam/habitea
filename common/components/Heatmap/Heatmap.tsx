import userAtom from '@atoms/user';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivitiesService } from '@services/activities';
import { getLastDayOfMonth } from '@utils/date';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import styles from './Heatmap.module.scss';

interface HeatmapProps {
  date: Date;
  category: ActivityCategory;
}

export default function Heatmap(props: HeatmapProps) {
  const [currentDate, setCurrentDate] = useState(props.date);
  const [activities, setActivities] = useState<Activity[]>([]);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        // TODO Fetch more than just last period
        const fetchedActivities =
          await ActivitiesService.getByCategoryForPeriod(
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
    const day = activity.activityDate.toDate().getDate();
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
  const lastDayIndex = getLastDayOfMonth(currentDate).getDate();
  for (let i = 1; i <= lastDayIndex; i += 1) {
    // TODO add tooltips showing dates and maybe activities
    days.push(
      <div key={i} className={styles['item-wrapper']}>
        {activityStrengthsByDay[i] ? (
          <div
            key={i}
            className={classNames(styles.item, {
              [styles['item--good']]: props.category?.goalType === 'MIN',
              [styles['item--bad']]: props.category?.goalType === 'MAX',
            })}
            style={{
              opacity: activityStrengthsByDay[i] / props.category.goalValue,
              // TODO more vibrant colors
            }}
          ></div>
        ) : (
          <div className={classNames(styles.item, styles['item--empty'])}></div>
        )}
      </div>,
    );
  }
  return <div className={styles.heatmap}>{days.map((day) => day)}</div>;
}
