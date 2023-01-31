import Button from '@commonComponents/Button/Button';
import { Activity } from '@schemas/activity';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { userAtom } from '@atoms/user';
import { getPreviousMonth } from '@utils/date';
import { ActivitiesService } from '@services/activities';
import { categoriesAtom } from '@atoms/categories';
import ActivityItem from '@commonComponents/ActivityItem/ActivityItem';
import { Months } from '@constants/dictionaries';
import { ActivityCategory } from '@schemas/activity-category';
import { calculateProgress } from '@utils/habits';
import { activityReloader } from '@atoms/reloaders';
import getErrorMessage from '@utils/firebase-error';
import { useAddNotification } from '@utils/notifications';
import { FirebaseError } from 'firebase/app';
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
  const reloader = useAtomValue(activityReloader);
  const addNotifcation = useAddNotification();

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

      try {
        const monthCollection = mapToMonthCollection(
          await ActivitiesService.getForMonth(newMonth, user?.uid),
          newMonth,
        );

        setActivityList((prev) => [...prev, monthCollection]);
        setLastLoadedMonth(newMonth);
      } catch (error: any) {
        addNotifcation({ message: getErrorMessage(error), type: 'danger' });
      }
    }
  }

  useEffect(() => {
    if (reloader && user) {
      const fetchData = async () =>
        mapToMonthCollection(
          await ActivitiesService.getForMonth(
            reloader.activityDate?.toDate() as Date,
            user?.uid,
          ),
          reloader.activityDate?.toDate() as Date,
        );

      fetchData()
        .then((response) => {
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
        })
        .catch((error: FirebaseError) => {
          addNotifcation({ message: getErrorMessage(error), type: 'danger' });
        });
    }
  }, [reloader]);

  return (
    <div>
      <div className={styles.journal}>
        {activityList.map((collection, key) => (
          <div className={styles['month-container']} key={key}>
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

      <Button
        onClick={() => loadMoreActivities()}
        fillType="outlined"
        color="primary"
      >
        Load more activities
      </Button>
    </div>
  );
}
