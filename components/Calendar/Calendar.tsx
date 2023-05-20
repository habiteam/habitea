import { Months } from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { userAtom } from '@atoms/user';
import { categoriesAtom } from '@atoms/categories';

import { ActivitiesService } from '@services/activities';
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getNextMonth,
  getPreviousMonth,
  getTimeFromDate,
} from '@utils/date';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { getActivityValue } from '@utils/activity-utils';
import { useAddNotification } from '@utils/notifications';
import getErrorMessage from '@utils/firebase-error';
import { ActivityCategory } from '@schemas/activity-category';
import Dialog from '@commonComponents/Dialog/Dialog';
import styles from './Calendar.module.scss';

export interface CalendarProps {
  date: Date;
}

export default function Calendar(props: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(props.date);
  const user = useAtomValue(userAtom);
  const [activities, setActivities] = useState<Activity[]>([]);
  const activityCategories = useAtomValue(categoriesAtom);
  const [openedActivity, setOpenedActivity] = useState<Activity | null>(null);
  const [isActivityDialogOpen, setIsActivityDialogOpen] =
    useState<boolean>(false);
  const addNotifcation = useAddNotification();

  const loadPreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
  };
  const loadNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
  };

  useEffect(() => {
    if (user) {
      // fetch activities for current month
      const fetchData = async () => {
        try {
          let fetchedActivities = await ActivitiesService.getForMonth(
            currentDate,
            user?.uid,
            'asc',
          );
          // assign category to each activity
          fetchedActivities = fetchedActivities.map((activity) => ({
            ...activity,
            category: activityCategories.find(
              (c) => c.id === activity.categoryRef.id,
            ),
          }));
          setActivities(fetchedActivities);
        } catch (error: any) {
          addNotifcation({
            message: getErrorMessage(error),
            type: 'danger',
          });
        }
      };
      fetchData();
    }
  }, [currentDate, user, activityCategories]);

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
            <React.Fragment key={activity.id}>
              <div
                onClick={(): void => {
                  setOpenedActivity(activity);
                  setIsActivityDialogOpen(true);
                }}
                className={classNames(styles['day-activity'], {
                  [styles['day-activity--good']]:
                    activity.category?.goalType === 'MIN',
                  [styles['day-activity--bad']]:
                    activity.category?.goalType === 'MAX',
                })}
              >
                {activity.category?.icon && (
                  <FontAwesomeIcon
                    icon={findIconDefinition({
                      prefix: 'fas',
                      iconName: activity.category?.icon,
                    })}
                  ></FontAwesomeIcon>
                )}
              </div>
            </React.Fragment>
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
    <>
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

      <Dialog
        open={isActivityDialogOpen}
        handleClose={(): void => {
          setIsActivityDialogOpen(false);
        }}
      >
        {openedActivity && (
          <div className={classNames(styles['activity-dialog'])}>
            <div className={classNames(styles['icon-container'])}>
              {openedActivity?.category?.icon && (
                <FontAwesomeIcon
                  className={classNames(styles.icon)}
                  icon={findIconDefinition({
                    prefix: 'fas',
                    iconName: openedActivity?.category?.icon,
                  })}
                  width={56}
                ></FontAwesomeIcon>
              )}
            </div>

            <div className={classNames(styles['info-container'])}>
              <h2>{openedActivity?.category?.name}</h2>

              <h3>{getTimeFromDate(openedActivity?.activityDate.toDate())}</h3>

              <div>
                {getActivityValue(
                  openedActivity,
                  openedActivity?.category as ActivityCategory,
                )}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
