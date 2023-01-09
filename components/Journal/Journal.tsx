import Button from '@commonComponents/Button/Button';
import { Activity } from '@schemas/activity';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import userAtom from '@atoms/user';
import { getPreviousMonth } from '@utils/date';
import { ActivitiesService } from '@services/activities';
import categoriesAtom from '@atoms/categories';
import ActivityItem from '@commonComponents/ActivityItem/ActivityItem';
import { Months } from '@constants/dictionaries';
import { ActivityCategory } from '@schemas/activity-category';
import { calculateProgress } from '@utils/habits';
import styles from './Journal.module.scss';

interface JournalProps {
  activities: Activity[];
}

interface MonthCollection {
  year: number;
  month: number;
  activities: Activity[];
  categories?: ActivityCategory[];
}

export default function Journal(props: JournalProps) {
  const user = useAtomValue(userAtom);
  const activityCategories = useAtomValue(categoriesAtom);

  const [activityList, setAtivityList] = useState<MonthCollection[]>([
    {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      activities: props.activities,
    },
  ]);
  const [lastLoadedMonth, setLastLoadedMonth] = useState(new Date());
  const loadMoreActivities = async () => {
    if (user) {
      const newMonth = getPreviousMonth(lastLoadedMonth);
      let newActivities = await ActivitiesService.getForMonth(
        newMonth,
        user?.uid,
      );
      newActivities = newActivities.map((activity) => ({
        ...activity,
        category: activityCategories.find(
          (c) => c.id === activity.categoryRef.id,
        ),
      }));
      const monthCollection = {
        year: newMonth.getFullYear(),
        month: newMonth.getMonth(),
        activities: newActivities,
      };
      setAtivityList((prev) => [...prev, monthCollection]);
      setLastLoadedMonth(newMonth);
    }
  };
  return (
    <div>
      <div className={styles.journal}>
        {activityList.map((collection, key) => (
          <div key={key}>
            {' '}
            <h2 className={styles.title}>
              {Months[collection.month]} {collection.year}
            </h2>
            <div className={styles['activity-list']}>
              {collection.activities.map((activity) => (
                <ActivityItem
                  activity={activity}
                  key={activity.id}
                ></ActivityItem>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={loadMoreActivities} fillType={'regular'}>
        Load more activities
      </Button>
    </div>
  );
}
