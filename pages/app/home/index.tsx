import { getAppLayout } from '@components/AppLayout/AppLayout';
import ActivityDialog from '@commonComponents/ActivityDialog/ActivityDialog';
import { Activity } from '@schemas/activity';
import { userAtom } from '@atoms/user';
import { useAtomValue, useSetAtom } from 'jotai';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ActivityCategoriesService } from '@services/activity-categories';
import { categoriesAtom } from '@atoms/categories';
import { ActivitiesService } from '@services/activities';
import Journal from '@components/Journal/Journal';
import Block from '@commonComponents/Block/Block';
import classNames from 'classnames';
import Daily from '@components/Daily/Daily';
import Timeline from '@components/Timeline/Timeline';
import { activityReloader } from '@atoms/reloaders';
import { useAddNotification } from '@utils/notifications';
import styles from './Home.module.scss';

export default function Home() {
  const user = useAtomValue(userAtom);
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const setActivityCategories = useSetAtom(categoriesAtom);
  const reloader = useAtomValue(activityReloader);
  const addNotifcation = useAddNotification();

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
      fetchData().catch(() => {
        addNotifcation({
          type: 'danger',
          message: 'Could not fetch activities',
        });
      });
    }
  }, [user, reloader]);

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
        <Block header={new Date().toISOString().split('T')[0]}>
          <Daily></Daily>
        </Block>
        <Block header="Timeline">
          <Timeline></Timeline>
        </Block>
        <Block header="Journal">
          {activityList.length > 0 && (
            <Journal activities={activityList}></Journal>
          )}
        </Block>
      </div>
    </>
  );
}

Home.getLayout = getAppLayout;
