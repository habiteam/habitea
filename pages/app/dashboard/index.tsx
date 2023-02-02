import { getAppLayout } from '@components/AppLayout/AppLayout';
import Tabs from '@commonComponents/Tabs/Tabs';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { userAtom } from '@atoms/user';
import { categoriesAtom } from '@atoms/categories';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { ActivityCategoriesService } from '@services/activity-categories';
import Head from 'next/head';
import { ActivitiesService } from '@services/activities';
import { calculateProgress } from '@utils/habits';
import Calendar from '@components/Calendar/Calendar';
import Chip from '@commonComponents/Chip/Chip';
import { useAddNotification } from '@utils/notifications';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState('Calendar');
  const user = useAtomValue(userAtom);
  const [activityCategories, setActivityCategories] = useAtom(categoriesAtom);
  const [habitProgress, setHabitProgress] = useState<number>(0);
  const addNotifcation = useAddNotification();

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        // get categories
        const categories = await ActivityCategoriesService.getActiveByUserId(
          user?.uid as string,
        );

        setActivityCategories(categories);

        // go through categories with MIN goalType and fetch activities
        const promises = categories
          .filter((c) => c.goalType === 'MIN')
          .map(async (category) => {
            const activities = await ActivitiesService.getByCategoryForPeriod(
              category,
              new Date(),
              user?.uid,
            );

            // calculate progress for each category
            const progress = calculateProgress(activities, category);
            return progress;
          });
        // calculate overall progress when all activities are fetched
        const results = await Promise.all(promises);
        setHabitProgress(results.reduce((t, v) => t + v, 0) / results.length);
      };
      fetchData().catch((e) => {
        addNotifcation({
          type: 'danger',
          message: 'Could not fetch categories',
        });
      });
    }
  }, [user]);

  const tabContent = (tab: string) => {
    switch (tab) {
      case 'Categories':
        return <div className={styles.tab}>Work in progress</div>;
      case 'Calendar':
        return (
          <div className={styles.tab}>
            {activityCategories.length > 0 && (
              <Calendar date={new Date()}></Calendar>
            )}
          </div>
        );
      default:
        return <div className={styles.tab}>Work in progress</div>;
    }
  };

  return (
    <div className={classnames(styles.container)}>
      <Head>
        <title>Dashboard - Habitea</title>
      </Head>

      <div className={classnames(styles.summary)}>
        <Image
          src={user?.photoURL?.split('=')[0] ?? '/cat.jpg'}
          alt="Card header image"
          width={200}
          height={200}
          className={classnames(styles.avatar)}
        ></Image>

        <div className={classnames(styles['user-info'])}>
          <h2>{user?.displayName ?? user?.email}</h2>

          <div className={classnames(styles.chips)}>
            <Chip color="info" fillType="filled">
              Tracking <strong>{activityCategories.length}</strong> habits
            </Chip>

            {!Number.isNaN(habitProgress) && (
              <Chip color="primary" fillType="filled">
                Current habit progress:{' '}
                <strong>{habitProgress?.toFixed(0)}</strong>%
              </Chip>
            )}
          </div>
        </div>
      </div>

      <div>
        <Tabs
          tabs={[
            { key: 'Calendar', title: 'Calendar' },
            { key: 'Categories', title: 'Categories' },
          ]}
          activeTab={currentTab}
          setActiveTab={(key: string): void => {
            setCurrentTab(key);
          }}
        ></Tabs>

        {tabContent(currentTab)}
      </div>
    </div>
  );
}

Dashboard.getLayout = getAppLayout;
