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
import { calculateProgress, getCategoryGoalString } from '@utils/habits';
import classNames from 'classnames';
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

  return (
    <div>
      <div className={styles.journal}>
        {activityList.map((collection, key) => (
          <div key={key}>
            <h2 className={styles.title}>
              {Months[collection.month]} {collection.year}
            </h2>

            <h3>Habit goals</h3>

            <div className={styles.summary}>
              {collection.categories?.map((category) => (
                <div
                  className={classNames(styles.habit, {
                    [styles['habit--good']]:
                      (category.progress >= 100 &&
                        category.goalType === 'MIN') ||
                      (category.progress < 100 && category.goalType === 'MAX'),
                    [styles['habit--bad']]:
                      category.progress > 100 && category.goalType === 'MAX',
                  })}
                  key={category.name}
                >
                  <span>
                    {category.name} -
                    {category.goalType === 'MAX' && ' at most '}
                    {category.goalType === 'MIN' && ' at least '}
                    {getCategoryGoalString(category)}
                    {' - '}
                    {category.progress}%
                  </span>
                </div>
              ))}
            </div>

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
