import { categoriesAtom } from '@atoms/categories';
import { userAtom } from '@atoms/user';
import { ActivitiesService } from '@services/activities';
import { calculateProgress } from '@utils/habits';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import { Activity } from '@schemas/activity';
import { Days } from '@constants/dictionaries';
import { getSecondsFromDuration } from '@utils/duration';
import styles from './Timeline.module.scss';

interface TimelineProps {}

interface DayCollection {
  day: number;
  activities: Activity[];
}

export default function Timeline(props: TimelineProps) {
  const user = useAtomValue(userAtom);
  const activityCategories = useAtomValue(categoriesAtom);
  const [dayCollection, setDayCollection] = useState<DayCollection[]>([]);
  const divRef = useRef<HTMLDivElement>(null);

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
      await ActivitiesService.getForLastSevenDays(new Date(), user?.uid).then(
        (response) => {
          setDayCollection(mapToDayCollection(response));
        },
      );
    }
  };

  useEffect(() => {
    if (user && activityCategories) {
      fetchActivities();
    }
  }, [user, activityCategories]);

  const hours: number[] = [];

  for (let i = 0; i < 24; i += 1) {
    hours.push(i);
  }

  useEffect(() => {
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

  return (
    <div className={classNames(styles['timeline-wrapper'])}>
      <div ref={divRef} className={classNames(styles.timeline)}>
        <div className={classNames(styles.container)}>
          {dayCollection.map((day, index) => (
            <div className={styles['day-container']} key={index}>
              <span className={styles['day-name']}>{Days.long[day.day]}</span>
              <div className={styles['hour-container']}>
                {hours.map((hour) => (
                  <span className={styles.hour} key={hour}>
                    {hour}
                  </span>
                ))}

                {day.activities.map((activity, activityIndex) => (
                  <div
                    className={styles.activity}
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
                    <span style={{ position: 'sticky', left: '8px' }}>
                      {activity.category?.name}
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
