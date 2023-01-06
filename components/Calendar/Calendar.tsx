import { Months } from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import userAtom from '@atoms/user';
import categoriesAtom from '@atoms/categories';

import { ActivitiesService } from '@services/activities';
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getNextMonth,
  getPreviousMonth,
} from '@utils/date';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './Calendar.module.scss';

export interface CalendarProps {
  date: Date;
}

export default function Calendar(props: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(props.date);
  const user = useAtomValue(userAtom);
  const [activities, setActivities] = useState<Activity[]>([]);
  const activityCategories = useAtomValue(categoriesAtom);

  const loadPreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
  };
  const loadNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        let fetchedActivities = await ActivitiesService.getForMonth(
          currentDate,
          user?.uid,
        );
        fetchedActivities = fetchedActivities.map((activity) => ({
          ...activity,
          category: activityCategories.find(
            (c) => c.id === activity.categoryRef.id,
          ),
        }));
        setActivities(fetchedActivities);
      };
      fetchData();
    }
  }, [currentDate]);

  // Group activities by day
  const activitiesByDay: Activity[][] = [];
  activities.forEach((activity) => {
    const day = activity.activityDate.toDate().getDate();
    if (!activitiesByDay[day]) {
      activitiesByDay[day] = [];
    }
    activitiesByDay[day].push(activity);
  });

  // Pad beginning of calendar
  const emptyDays = [];
  const firstDayIndex = (getFirstDayOfMonth(currentDate).getDay() || 7) - 1;
  for (let i = 0; i < firstDayIndex; i += 1) {
    emptyDays.push(
      <div
        key={i}
        className={classNames(styles.days__day, styles['days__day--inactive'])}
      ></div>,
    );
  }

  // Render days
  const days = [];
  const lastDayIndex = getLastDayOfMonth(currentDate).getDate();
  for (let i = 1; i <= lastDayIndex; i += 1) {
    days.push(
      <div
        key={i}
        className={classNames(styles.days__day, {
          [styles['days__day--compact']]:
            activitiesByDay[i] && activitiesByDay[i].length > 4,
        })}
      >
        <span className={classNames(styles['day-nr'])}>{i}</span>
        {activitiesByDay[i] &&
          activitiesByDay[i].map((activity) => (
            <div key={activity.id} className={styles['day-activity']}>
              {activity.category?.icon && (
                <FontAwesomeIcon
                  icon={findIconDefinition({
                    prefix: 'fas',
                    iconName: activity.category?.icon,
                  })}
                  width={14}
                ></FontAwesomeIcon>
              )}
              {/* //TODO handle different unit types */}
              <span className={styles['day-activity__description']}>
                &nbsp;
                {activity.category?.name} {activity.value}{' '}
                {activity.category?.unit}
              </span>
            </div>
          ))}
      </div>,
    );
  }

  // Pad end of calendar
  const padDays = [];
  const endIndex = 7 * 6 - (firstDayIndex + lastDayIndex);
  for (let i = 0; i < endIndex; i += 1) {
    padDays.push(
      <div
        key={i}
        className={classNames(styles.days__day, styles['days__day--inactive'])}
      ></div>,
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div>
          {Months[currentDate.getMonth()]}&nbsp;
          {currentDate.getFullYear()}
        </div>
        <div className={styles.header__controls}>
          <button
            onClick={loadPreviousMonth}
            className={styles.header__control}
          >
            &lt;
          </button>
          <button onClick={loadNextMonth} className={styles.header__control}>
            &gt;
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.days}>
          <div className={styles.weekday}>Mon</div>
          <div className={styles.weekday}>Tue</div>
          <div className={styles.weekday}>Wed</div>
          <div className={styles.weekday}>Thu</div>
          <div className={styles.weekday}>Fri</div>
          <div className={styles.weekday}>Sat</div>
          <div className={styles.weekday}>Sun</div>
          {emptyDays.map((day) => day)}
          {days.map((day) => day)}
          {padDays.map((day) => day)}
        </div>
      </div>
    </div>
  );
}
