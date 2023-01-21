import Button from '@commonComponents/Button/Button';
import { Activity } from '@schemas/activity';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import userAtom from '@atoms/user';
import { getPreviousMonth } from '@utils/date';
import { ActivitiesService } from '@services/activities';
import categoriesAtom from '@atoms/categories';
import ActivityItem from '@commonComponents/ActivityItem/ActivityItem';
import { Months } from '@constants/dictionaries';
import { ActivityCategory } from '@schemas/activity-category';
import { calculateProgress, getCategoryGoalString } from '@utils/habits';
import classNames from 'classnames';
import { journalReloader } from '@atoms/reloaders';
import styles from './Journal.module.scss';

interface JournalProps {
  activities: Activity[];
}

interface ActivityCategoryProgress extends ActivityCategory {
  progress: number;
}

interface MonthCollection {
  year: number;
  month: number;
  activities: Activity[];
  categories?: ActivityCategoryProgress[];
}

export default function Journal(props: JournalProps) {
  const user = useAtomValue(userAtom);
  const activityCategories = useAtomValue(categoriesAtom);
  const reloader = useAtomValue(journalReloader);

  const [activityList, setActivityList] = useState<MonthCollection[]>([
    {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      activities: props.activities,
      categories: activityCategories.map((category) => {
        const activities = props.activities.filter(
          (a) => a.categoryRef.id === category.id,
        );
        return {
          ...category,
          progress: calculateProgress(activities, category),
        };
      }),
    },
  ]);
  const [lastLoadedMonth, setLastLoadedMonth] = useState(new Date());

  function mapToMonthCollection(
    activities: Activity[],
    month: Date,
  ): MonthCollection {
    const activitiesWithCategory = activities.map((activity) => ({
      ...activity,
      category: activityCategories.find(
        (c) => c.id === activity.categoryRef.id,
      ),
    }));

    const categoryProgresses = activityCategories.map((category) => ({
      ...category,
      progress: calculateProgress(
        activitiesWithCategory.filter((a) => a.categoryRef.id === category.id),
        category,
      ),
    }));

    return {
      year: month.getFullYear(),
      month: month.getMonth(),
      activities: activitiesWithCategory,
      categories: categoryProgresses,
    };
  }

  async function loadMoreActivities() {
    if (user) {
      const newMonth = getPreviousMonth(lastLoadedMonth);

      const monthCollection = mapToMonthCollection(
        await ActivitiesService.getForMonth(newMonth, user?.uid),
        newMonth,
      );

      setActivityList((prev) => [...prev, monthCollection]);
      setLastLoadedMonth(newMonth);
    }
  }

  useEffect(() => {
    if (reloader && user) {
      const fetchData = async () =>
        mapToMonthCollection(
          await ActivitiesService.getForMonth(reloader, user?.uid),
          reloader,
        );

      fetchData().then((response) => {
        setActivityList((prev) => {
          const index = prev.findIndex(
            (el) => el.year === response.year && el.month === response.month,
          );

          const temp = [...prev];

          if (index !== -1) {
            temp[index].activities = response.activities;
          }

          return temp;
        });
      });
    }
  }, [reloader]);

  return (
    <div>
      <div className={styles.journal}>
        {activityList.map((collection, key) => (
          <div key={key}>
            <h2 className={styles.title}>
              {Months[collection.month]} {collection.year}
            </h2>
            <h3>Activities</h3>
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

      <Button onClick={() => loadMoreActivities()} fillType={'regular'}>
        Load more activities
      </Button>
    </div>
  );
}
