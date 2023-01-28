import { openActivityModalAtom, activityAtom } from '@atoms/activity-dialog';
import { journalReloader } from '@atoms/reloaders';
import Button from '@commonComponents/Button/Button';
import Dialog from '@commonComponents/Dialog/Dialog';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Activity } from '@schemas/activity';
import { ActivitiesService } from '@services/activities';
import { getDateInputFormatFromDate } from '@utils/date';
import { useAddNotification } from '@utils/notifications';
import { getDateStringFromTimestamp } from '@utils/time';
import classNames from 'classnames';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import styles from './ActivityItem.module.scss';

interface ActivityItemProps {
  activity: Activity;
}
export default function ActivityItem(props: ActivityItemProps) {
  const setOpenActivityModal = useSetAtom(openActivityModalAtom);
  const setActivity = useSetAtom(activityAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const addNotification = useAddNotification();
  const setReloader = useSetAtom(journalReloader);

  const deleteActivity = (): void => {
    ActivitiesService.deleteById(props.activity.id as string);
    addNotification({ message: 'Activity deleted', type: 'info' });
    setReloader(props.activity.activityDate.toDate());
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className={classNames(styles.item)}>
        <div
          className={classNames(styles.header, {
            [styles['header--good']]:
              props.activity.category?.goalType === 'MIN',
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
            ></FontAwesomeIcon>
          )}
          &nbsp;
          {props.activity.category?.name}
          <div className={styles.spacer}></div>
          <div className={styles.actions}>
            <Button
              fillType="regular"
              color="dark"
              onClick={() => {
                setActivity(props.activity);
                setOpenActivityModal(true);
              }}
            >
              <FontAwesomeIcon icon={faEdit} width={14}></FontAwesomeIcon>
            </Button>
            <Button
              fillType="regular"
              color="dark"
              onClick={() => {
                setDeleteDialogOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faTrash} width={14}></FontAwesomeIcon>
            </Button>
          </div>
        </div>
        <div className={classNames(styles.body)}>
          <span className={classNames(styles.value)}>
            {props.activity.category?.unitType === 'QUANTITY'
              ? `${props.activity.value} ${props.activity.category?.unit}`
              : props.activity.duration}
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
