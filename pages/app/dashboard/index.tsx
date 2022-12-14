import { getAppLayout } from '@components/AppLayout/AppLayout';
import Tabs from '@commonComponents/Tabs/Tabs';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import userAtom from '@atoms/user';
import categoriesAtom from '@atoms/categories';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { ActivityCategoriesService } from '@services/activity-categories';
import Head from 'next/head';
import { ActivitiesService } from '@services/activities';
import { calculateProgress } from '@utils/habits';
import Calendar from '@components/Calendar/Calendar';
import Block from '@commonComponents/Block/Block';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState('Calendar');
  const user = useAtomValue(userAtom);
  const [activityCategories, setActivityCategories] = useAtom(categoriesAtom);
  const [habitProgress, setHabitProgress] = useState(0);

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
      fetchData();
    }
  }, [user]);

  const tabContent = (tab: string) => {
    switch (tab) {
      case 'Categories':
        return <div className={styles.tab}>Tab 1 content</div>;
      case 'Calendar':
        return (
          <div className={styles.tab}>
            {activityCategories.length > 0 && (
              <Calendar date={new Date()}></Calendar>
            )}
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
      <Block className={classnames(styles.summary)}>
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
      </Block>
      <p>Here you can see your progress and manage your goals.</p>
      <p>Click on the tabs to see more.</p>
      <br />
      <br />
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
  );
}

Dashboard.getLayout = getAppLayout;
