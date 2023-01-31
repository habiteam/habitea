import { categoriesAtom } from '@atoms/categories';
import { activityReloader } from '@atoms/reloaders';
import { userAtom } from '@atoms/user';
import { ActivitiesService } from '@services/activities';
import { calculateProgress } from '@utils/habits';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';
import styles from './Daily.module.scss';
import { DailyActivity } from './Daily.schema';
import DailyActivityItem from './DailyActivityItem/DailyActivityItem';

interface DailyProps {}

export default function Daily(props: DailyProps) {
  const user = useAtomValue(userAtom);
  const activityCategories = useAtomValue(categoriesAtom);
  const [activities, setActivities] = useState<DailyActivity[]>([]);
  const reloader = useAtomValue(activityReloader);

  const fetchActivities = async () => {
    if (user && activityCategories) {
      await ActivitiesService.getForDate(new Date(), user?.uid).then(
        (response) => {
          setActivities(
            response.map((activity) => {
              const activityCategory = activityCategories.find(
                (c) => c.id === activity.categoryRef.id,
              );

              return {
                ...activity,
                category: activityCategory,
                progress: calculateProgress([activity], activityCategory),
              };
            }),
          );
        },
      );
    }
  };

  useEffect(() => {
    if (user && activityCategories) {
      fetchActivities();
    }
  }, [user, activityCategories, reloader]);

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.dailies)}>
        {activities.length < 1 ? (
          <DailyActivityItem></DailyActivityItem>
        ) : (
          activities.map((activity, index) => (
            <DailyActivityItem
              key={index}
              activity={activity}
            ></DailyActivityItem>
          ))
        )}
      </div>
    </div>
  );
}
