import { getAppLayout } from '@components/AppLayout/AppLayout';
import ActivityDialog from '@commonComponents/ActivityDialog/ActivityDialog';
import { Activity } from '@schemas/activity';
import { userAtom } from '@atoms/user';
import { useAtomValue, useSetAtom } from 'jotai';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
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
import { activityAtom } from '@atoms/activity-dialog';
import Button from '@commonComponents/Button/Button';
import HabitSummary from '@components/HabitSummary/HabitSummary';
import styles from './Home.module.scss';

export default function Home() {
  const user = useAtomValue(userAtom);
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const buttonRef = useRef(null);
  const setActivity = useSetAtom(activityAtom);
  const setActivityCategories = useSetAtom(categoriesAtom);
  const reloader = useAtomValue(activityReloader);
  const addNotifcation = useAddNotification();
  const [openActivityModal, setOpenActivityModal] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        // get categories
        const categories = await ActivityCategoriesService.getByUserId(
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
        <div style={{ width: 'max-content' }} ref={buttonRef}>
          <Button
            fillType="filled"
            color="tertiary"
            onClick={() => {
              setActivity(null);
              setOpenActivityModal(true);
            }}
          >
            Start Activity
          </Button>
        </div>
        <ActivityDialog
          buttonRef={buttonRef}
          openActivityModal={openActivityModal}
          handleClose={() => setOpenActivityModal(false)}
        ></ActivityDialog>
      </div>

      <div className={classNames(styles['blocks-container'])}>
        <Block header="Your current progress">
          <HabitSummary></HabitSummary>
        </Block>
        <Block
          header={`Activities today ${new Date().toISOString().split('T')[0]}`}
        >
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
