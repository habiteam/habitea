import { activityAtom } from '@atoms/activity-dialog';
import { activityReloader } from '@atoms/reloaders';
import { MOBILE_BREAKPOINT, screenWidthAtom } from '@atoms/screen';
import ActivityDialog from '@commonComponents/ActivityDialog/ActivityDialog';
import Button from '@commonComponents/Button/Button';
import Dialog from '@commonComponents/Dialog/Dialog';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivitiesService } from '@services/activities';
import { getActivityValue } from '@utils/activity-utils';
import { getDateInputFormatFromDate } from '@utils/date';
import { useAddNotification } from '@utils/notifications';
import classNames from 'classnames';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import styles from './ActivityItem.module.scss';

interface ActivityItemProps {
  activity: Activity;
}
export default function ActivityItem(props: ActivityItemProps) {
  const setActivity = useSetAtom(activityAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const addNotification = useAddNotification();
  const setReloader = useSetAtom(activityReloader);
  const screenWidth = useAtomValue(screenWidthAtom);
  const [openActivityModal, setOpenActivityModal] = useState(false);

  const deleteActivity = async () => {
    try {
      ActivitiesService.deleteById(props.activity.id as string);
      addNotification({ message: 'Activity deleted', type: 'info' });
      setReloader(props.activity);
      setDeleteDialogOpen(false);
    } catch (e) {
      addNotification({ message: 'Error deleting activity', type: 'danger' });
    }
  };

  return (
    <>
      <ActivityDialog
        openActivityModal={openActivityModal}
        handleClose={() => setOpenActivityModal(false)}
      ></ActivityDialog>

      <div className={classNames(styles.item)}>
        <div
          className={classNames(styles.header, {
            [styles['header--bad']]:
              props.activity.category?.goalType === 'MAX',
          })}
        >
          {props.activity.category?.icon && (
            <FontAwesomeIcon
              icon={findIconDefinition({
                prefix: 'fas',
                iconName: props.activity.category?.icon,
              })}
              width={14}
              className={classNames(styles['category-icon'])}
              title={props.activity.category?.name}
            ></FontAwesomeIcon>
          )}
          &nbsp;
          <span className={classNames(styles['category-name'])}>
            {screenWidth >= MOBILE_BREAKPOINT && props.activity.category?.name}
          </span>
          <div className={styles.spacer}></div>
          <div className={styles.actions}>
            <Button
              fillType="regular"
              color="secondary-alt"
              onClick={() => {
                setActivity(props.activity);
                setOpenActivityModal(true);
              }}
            >
              <FontAwesomeIcon icon={faEdit} width={14}></FontAwesomeIcon>
            </Button>

            <Button
              fillType="regular"
              color="secondary-alt"
              onClick={() => {
                setDeleteDialogOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faTrash} width={14}></FontAwesomeIcon>
            </Button>
          </div>
        </div>
        <div className={classNames(styles.body)}>
          <span className={classNames(styles['category-name'])}>
            {screenWidth < MOBILE_BREAKPOINT && props.activity.category?.name}
          </span>
          <span className={classNames(styles.value)}>
            {getActivityValue(
              props.activity,
              props.activity.category as ActivityCategory,
            )}
          </span>
          <span className={classNames(styles.date)}>
            {getDateInputFormatFromDate(props.activity.activityDate.toDate())}
          </span>
        </div>
      </div>
      <Dialog
        title="Delete activity"
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        actions={[
          {
            text: 'Cancel',
            fillType: 'regular',
            onClick: () => setDeleteDialogOpen(false),
          },
          {
            text: 'Confirm',
            fillType: 'filled',
            onClick: deleteActivity,
          },
        ]}
      >
        <span>Are you sure you want to delete this activity?</span>
      </Dialog>
    </>
  );
}
