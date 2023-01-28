import { getAppLayout } from '@components/AppLayout/AppLayout';
import ActivityDialog from '@commonComponents/ActivityDialog/ActivityDialog';
import { Activity } from '@schemas/activity';
import { userAtom } from '@atoms/user';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ActivityCategoriesService } from '@services/activity-categories';
import { categoriesAtom } from '@atoms/categories';
import { ActivitiesService } from '@services/activities';
import Journal from '@components/Journal/Journal';
import Block from '@commonComponents/Block/Block';
import classNames from 'classnames';
import Daily from '@components/Daily/Daily';
import styles from './Home.module.scss';

export default function Home() {
  const user = useAtomValue(userAtom);
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const setActivityCategories = useSetAtom(categoriesAtom);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        // get categories
        const categories = await ActivityCategoriesService.getActiveByUserId(
          user?.uid as string,
        );
        setActivityCategories(categories);

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
        setActivityList(recentActivities);
      };
      fetchData();
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Home - Habitea</title>
      </Head>
      <div className={classNames(styles.header)}>
        <h2>Welcome {user?.displayName ?? user?.email}</h2>
        <div className={classNames(styles.spacer)}></div>
        <ActivityDialog></ActivityDialog>{' '}
      </div>

      <div className={classNames(styles['blocks-container'])}>
        <Block title="Daily">
          <Daily></Daily>
        </Block>
        <Block title="Timeline"></Block>
        <Block title="Journal">
          {activityList.length > 0 && (
            <Journal activities={activityList}></Journal>
          )}
        </Block>
      </div>
    </>
  );
}

Home.getLayout = getAppLayout;
