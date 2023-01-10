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
  const days = [];
  const lastDayIndex = getLastDayOfMonth(currentDate).getDate();
  for (let i = 1; i <= lastDayIndex; i += 1) {
    // TODO add tooltips showing dates
    days.push(
      <div
        key={i}
        className={classNames(styles.days__day, {
          [styles['days__day--compact']]:
            activitiesByDay[i] && activitiesByDay[i].length > 4,
        })}
      >
        {activitiesByDay[i] ? (
          <div
            key={i}
            className={classNames(styles.item, {
              [styles['item--good']]: props.category?.goalType === 'MIN',
              [styles['item--bad']]: props.category?.goalType === 'MAX',
            })}
          ></div> // TODO calculate "strength" of activities that day
        ) : (
          <div className={classNames(styles.item, styles['item--empty'])}></div>
        )}
      </div>,
    );
  }
  return <div className={styles.heatmap}>{days.map((day) => day)}</div>;
}
