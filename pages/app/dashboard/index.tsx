import { getAppLayout } from '@components/AppLayout/AppLayout';
import Tabs from '@commonComponents/Tabs/Tabs';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import userAtom from '@atoms/user';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { ActivityCategoriesService } from '@services/activity-categories';
import { ActivityCategory } from '@schemas/activity-category';
import Head from 'next/head';
import { ActivitiesService } from '@services/activities';
import { calculateProgress } from '@utils/habits';
import { Activity } from '@schemas/activity';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState('Categories');
  const user = useAtomValue(userAtom);
  const [activityCategories, setActivityCategories] = useState<
    ActivityCategory[]
  >([]);
  const [habitProgress, setHabitProgress] = useState(0);
  const [activityList, setAtivityList] = useState<Activity[]>([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        // get categories
        const categories = await ActivityCategoriesService.getActiveByUserId(
          user?.uid as string,
        );

        setActivityCategories(categories);

        // get activities for each category
        const currentActivities: Activity[] = [];
        const promises = categories.map(async (category) => {
          const activities = await ActivitiesService.getByCategoryForPeriod(
            category,
            new Date(),
            user?.uid,
          );
          // calculate progress for each category
          const progress = calculateProgress(activities, category);

          currentActivities.push(...activities);
          return progress;
        });
        // calculate overall progress when all activities are fetched
        const results = await Promise.all(promises);
        setHabitProgress(results.reduce((t, v) => t + v, 0) / results.length);

        // get recent activities
        let recentActivities = await ActivitiesService.getForMonth(
          new Date(),
          user?.uid,
        );

        // assign categories to activity object for easier display
        recentActivities = recentActivities.map((activity) => ({
          ...activity,
          category: categories.find((c) => c.id === activity.categoryRef.id),
        }));
        setAtivityList(recentActivities);
      };
      fetchData();
    }
  }, [user]);

  const tabContent = (tab: string) => {
    switch (tab) {
      case 'Categories':
        return <div className={styles.tab}>Tab 1 content</div>;
      case 'Calendar':
        return <div className={styles.tab}>Tab 2 content</div>;
      case 'Journal':
        return (
          <div className={styles.tab}>
            {activityList.map((activity) => (
              <div key={activity.id}>
                <span>
                  {activity.category?.name} {activity.value}{' '}
                  {activity.category?.unit}
                </span>
              </div>
            ))}
          </div>
        );
      default:
        return <div className={styles.tab}>Tab 1 content</div>;
    }
  };

  return (
    <div className={classnames(styles.container)}>
      <Head>
        <title>Dashboard - Habitea</title>
      </Head>
      <div className={classnames(styles.summary)}>
        <Image
          src={user?.photoURL ?? '/cat.jpg'}
          alt="Card header image"
          width={96}
          height={96}
          className={classnames(styles.avatar)}
        ></Image>
        <div className={classnames(styles['user-info'])}>
          <h2>{user?.displayName ?? user?.email}</h2>
          <span>Tracking {activityCategories.length} habits</span>
          <span>Current habit progress: {habitProgress.toFixed(0)}%</span>
        </div>
      </div>
      <p>Here you can see your progress and manage your goals.</p>
      <p>Click on the tabs to see more.</p>
      <br />
      <br />
      <Tabs
        tabs={[
          { key: 'Categories', title: 'Categories' },
          { key: 'Calendar', title: 'Calendar' },
          { key: 'Journal', title: 'Journal' },
        ]}
        activeTab={currentTab}
        setActiveTab={(key: string): void => {
          setCurrentTab(key);
        }}
      ></Tabs>
      {tabContent(currentTab)}
    </div>
  );
}

Dashboard.getLayout = getAppLayout;
