import { userAtom } from '@atoms/user';
import Button from '@commonComponents/Button/Button';
import { Months } from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { CategoryProgress } from '@schemas/category-progress';
import { ActivitiesService } from '@services/activities';
import { CategoryProgressService } from '@services/category-progress';
import {
  checkIfDatesAreInPeriod,
  getActivityValue,
} from '@utils/activity-utils';
import {
  getDateFromDayOfYear,
  getDayOfYear,
  getLastDayOfYear,
  getFirstDayOfYear,
  getPreviousYear,
  getNextYear,
  getTimeFromDate,
} from '@utils/date';
import { useAddNotification } from '@utils/notifications';
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
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const addNotifcation = useAddNotification();

  const loadPreviousYear = () => {
    setCurrentDate(getPreviousYear(currentDate));
  };

  const loadNextYear = () => {
    setCurrentDate(getNextYear(currentDate));
  };

  useEffect(() => {
    if (user) {
      // fetch activities and progress for current year
      const fetchActivities = async () => {
        try {
          const fetchedActivities =
            await ActivitiesService.getByCategoryForYear(
              props.category,
              currentDate,
              user.uid,
            );
          setActivities(fetchedActivities);
        } catch (e) {
          addNotifcation({
            type: 'danger',
            message: 'Could not fetch activities',
          });
        }
      };
      const fetchProgress = async () => {
        const fetchedProgress =
          await CategoryProgressService.getByCategoryForYear(
            props.category,
            currentDate,
          );
        setProgress(fetchedProgress);
      };
      fetchActivities();
      fetchProgress();
    }
  }, [currentDate, props.category]);

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      let additionalY = 0;
      if (document.getElementById('appLayout')) {
        additionalY = document.getElementById('appLayout')?.scrollTop ?? 0;
      }

      setCoords({
        x: event.clientX + 12,
        y: event.clientY + 12 + additionalY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

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

  // pad beggining of heatmap so monday is always on top
  const emptyDays = [];
  const firstDayIndex = (getFirstDayOfYear(currentDate).getDay() || 7) - 1;
  for (let i = 0; i < firstDayIndex; i += 1) {
    emptyDays.push(
      <div
        key={i}
        className={classNames(
          styles['item-wrapper'],
          styles['item-wrapper--invisible'],
        )}
      >
        <div className={classNames(styles.item)}></div>
      </div>,
    );
  }
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
            <div
              className={styles.tooltip}
              style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
            >
              {getDateFromDayOfYear(
                currentDate.getFullYear(),
                i,
              ).toDateString()}
              {activitiesByDay[i] && (
                <div>
                  {activitiesByDay[i].map((activity) => (
                    <span key={activity.id}>
                      {getTimeFromDate(activity.createdDate.toDate())} -{' '}
                      {getActivityValue(activity, props.category)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={classNames(styles.item, styles['item--empty'])}>
            <div
              className={styles.tooltip}
              style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
            >
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
        <div className={styles['heatmap-months']}>
          {Months.map((month) => (
            <div key={month} className={styles['heatmap-month']}>
              {month}
            </div>
          ))}
        </div>
        <div className={styles.heatmap}>
          {emptyDays.map((day) => day)}
          {days.map((day) => day)}
        </div>
      </div>
    </div>
  );
}
