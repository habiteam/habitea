import { getAppLayout } from '@components/AppLayout/AppLayout';
import ActivityDialog from '@components/ActivityDialog/ActivityDialog';
import { Activity } from '@schemas/activity';

import userAtom from '@atoms/user';
import { useAtom, useAtomValue } from 'jotai';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ActivityCategoriesService } from '@services/activity-categories';
import categoriesAtom from '@atoms/categories';
import { ActivitiesService } from '@services/activities';
import Journal from '@components/Journal/Journal';
import Block from '@commonComponents/Block/Block';

export default function Home() {
  const user = useAtomValue(userAtom);
  const [activityList, setAtivityList] = useState<Activity[]>([]);
  const [, setActivityCategories] = useAtom(categoriesAtom);

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
        setAtivityList(recentActivities);
      };
      fetchData();
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>Home - Habitea</title>
      </Head>
      <h2>Welcome {user?.displayName ?? user?.email}</h2>
      <Block style={{ marginBottom: '16px' }}>
        {activityList.length > 0 && (
          <Journal activities={activityList}></Journal>
        )}
      </Block>
      <ActivityDialog></ActivityDialog>
    </>
  );
}

Home.getLayout = getAppLayout;
