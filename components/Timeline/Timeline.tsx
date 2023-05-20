import { categoriesAtom } from '@atoms/categories';
import { userAtom } from '@atoms/user';
import { ActivitiesService } from '@services/activities';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import { Activity } from '@schemas/activity';
import { Days } from '@constants/dictionaries';
import { getSecondsFromDuration } from '@utils/duration';
import { activityReloader } from '@atoms/reloaders';
import { useAddNotification } from '@utils/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  findIconDefinition,
  IconName,
} from '@fortawesome/fontawesome-svg-core';
import Dropdown from '@commonComponents/Dropdown/Dropdown';
import { ActivityCategory } from '@schemas/activity-category';
import { getActivityValue } from '@utils/activity-utils';
import { getTimeFromDate } from '@utils/date';
import { getDateStringFromTimestamp } from '@utils/time';
import styles from './Timeline.module.scss';

interface DayCollection {
  day: number;
  activities: Activity[];
}

export default function Timeline() {
  const user = useAtomValue(userAtom);
  const activityCategories = useAtomValue(categoriesAtom);
  const [dayCollection, setDayCollection] = useState<DayCollection[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const reloader = useAtomValue(activityReloader);
  const addNotifcation = useAddNotification();
  const [currentTime, setCurrentTime] = useState<string>();
  const [openActivity, setOpenActivity] = useState<string>('');

  function mapToDayCollection(activities: Activity[]): DayCollection[] {
    const activitiesWithCategory = activities.map((activity) => ({
      ...activity,
      category: activityCategories.find(
        (c) => c.id === activity.categoryRef.id,
      ),
    }));

    const arr: DayCollection[] = [];

    for (let i = 0; i < 7; i += 1) {
      arr.push({ day: (new Date().getDay() + i) % 7, activities: [] });
    }

    activitiesWithCategory.forEach((activity) => {
      arr
        .find(
          (collection) =>
            collection.day ===
            (activity.activityDate.toDate().getDay() + 6) % 7,
        )
        ?.activities.push(activity);
    });

    return arr;
  }

  const fetchActivities = async () => {
    if (user && activityCategories) {
      try {
        await ActivitiesService.getForLastSixDays(
          new Date(),
          user?.uid,
          'asc',
        ).then((response) => {
          setDayCollection(mapToDayCollection(response));
        });
      } catch (error: any) {
        addNotifcation({ message: error.message, type: 'danger' });
      }
    }
  };

  useEffect(() => {
    if (user && activityCategories) {
      fetchActivities();
    }
  }, [user, activityCategories, reloader]);

  useEffect(() => {
    // Scroll to current time
    setTimeout(() => {
      if (divRef.current) {
        const today = new Date();

        divRef.current.scrollBy({
          left:
            17280 +
            (120 * today.getHours() + today.getMinutes()) -
            divRef.current.clientWidth / 2,
          behavior: 'smooth',
        });
      }
    }, 1000);
  }, []);

  const hours: number[] = [];
  for (let i = 0; i < 24; i += 1) {
    hours.push(i);
  }

  useEffect(() => {
    // update current time every second
    const interval = setInterval(() => {
      setCurrentTime(
        `${new Date().getHours().toString().padStart(2, '0')}:${new Date()
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${new Date()
          .getSeconds()
          .toString()
          .padStart(2, '0')}`,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classNames(styles['timeline-wrapper'])}>
      <div ref={divRef} className={classNames(styles.timeline)}>
        <div className={classNames(styles.container)}>
          {dayCollection.map((day, index) => (
            <div className={styles['day-container']} key={index}>
              <span className={styles['day-name']}>{Days.long[day.day]}</span>
              <div className={styles['hours-container']}>
                {/* Hours */}
                {hours.map((hour) => (
                  <span className={styles.hour} key={hour}>
                    {hour}
                  </span>
                ))}
                {/* Current time marker */}
                {day.day + 1 === new Date().getDay() && (
                  <div
                    className={classNames(styles['current-time'])}
                    style={{
                      left: `${
                        120 * new Date().getHours() +
                        new Date().getMinutes() * 2
                      }px`,
                    }}
                  >
                    <span className={styles['current-time__text']}>
                      {currentTime && currentTime}
                    </span>
                  </div>
                )}
                {/* Activities */}
                {day.activities.map((activity, activityIndex) => (
                  <div
                    onClick={(): void => {
                      setOpenActivity(activity.id);
                    }}
                    className={classNames(styles.activity, {
                      [styles['activity--bad']]:
                        activity.category?.goalType === 'MAX',
                      [styles['activity--timed']]:
                        activity.category?.unitType === 'TIME',
                      [styles['activity--quantified']]:
                        activity.category?.unitType !== 'TIME',
                    })}
                    style={{
                      top: `${((activityIndex * 48) % 240) + 48}px`,
                      left: `${
                        120 * activity.activityDate.toDate().getHours() +
                        activity.activityDate.toDate().getMinutes() * 2
                      }px`,
                      width:
                        activity.category?.unitType === 'TIME'
                          ? `${
                              getSecondsFromDuration(activity.duration) / 30
                            }px`
                          : 'auto',
                    }}
                    key={activity.id}
                  >
                    <Dropdown
                      isOpen={activity.id === openActivity}
                      color="primary"
                      onClose={(): void => {
                        setOpenActivity('');
                      }}
                    >
                      {activity.category?.name} -{' '}
                      {getActivityValue(
                        activity,
                        activity.category as ActivityCategory,
                      )}
                      <br />
                      {getDateStringFromTimestamp(activity.activityDate)}
                      <br />
                      {getTimeFromDate(activity.activityDate.toDate())}
                    </Dropdown>
                    <span style={{ position: 'sticky', left: '8px' }}>
                      {activity.category?.unitType === 'TIME' ? (
                        <>
                          <FontAwesomeIcon
                            icon={findIconDefinition({
                              prefix: 'fas',
                              iconName: activity.category?.icon as IconName,
                            })}
                          ></FontAwesomeIcon>
                          &nbsp;
                          {activity.category?.name}
                        </>
                      ) : (
                        <FontAwesomeIcon
                          style={{ width: '100%' }}
                          icon={findIconDefinition({
                            prefix: 'fas',
                            iconName: activity.category?.icon as IconName,
                          })}
                        ></FontAwesomeIcon>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
