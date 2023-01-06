import Button from '@commonComponents/Button/Button';
import { Activity } from '@schemas/activity';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import userAtom from '@atoms/user';
import { getPreviousMonth } from '@utils/date';
import { ActivitiesService } from '@services/activities';
import { getDateStringFromTimestamp } from '@utils/time';
import categoriesAtom from '@atoms/categories';
import styles from './Journal.module.scss';

interface JournalProps {
  activities: Activity[];
}

export default function Journal(props: JournalProps) {
  const user = useAtomValue(userAtom);
  const activityCategories = useAtomValue(categoriesAtom);

  const [activityList, setAtivityList] = useState<Activity[]>(props.activities);
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
      setAtivityList((prev) => [...prev, ...newActivities]);
      setLastLoadedMonth(newMonth);
    }
  };
  return (
    <div>
      {activityList.map((activity) => (
        <div key={activity.id}>
          <span>
            {getDateStringFromTimestamp(activity.activityDate)}
            {activity.category?.name} {activity.value} {activity.category?.unit}
          </span>
        </div>
      ))}
      <Button onClick={loadMoreActivities} fillType={'regular'}>
        Load more activities
      </Button>
    </div>
  );
}
