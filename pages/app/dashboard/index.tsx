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
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState('Categories');
  const user = useAtomValue(userAtom);
  const [habits, setHabits] = useState<ActivityCategory[]>([]);

  useEffect(() => {
    if (user) {
      ActivityCategoriesService.getActiveByUserId(user?.uid as string).then(
        (categories) => {
          setHabits(categories);
        },
      );
    }
  }, [user]);

  const tabContent = (tab: string) => {
    switch (tab) {
      case 'Categories':
        return <div className={styles.tab}>Tab 1 content</div>;
      case 'Calendar':
        return <div className={styles.tab}>Tab 2 content</div>;
      case 'Journal':
        return <div className={styles.tab}>Tab 3 content</div>;
      default:
        return <div className={styles.tab}>Tab 1 content</div>;
    }
  };

  return (
    <div className={classnames(styles.container)}>
      <Head>
        <title>Dashboard</title>
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
          <span>Tracking {habits.length} habits</span>
          <span>Current habit progress: 69%</span>
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
