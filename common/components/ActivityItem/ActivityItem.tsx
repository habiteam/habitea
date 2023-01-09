import { openActivityModalAtom, activityAtom } from '@atoms/activity-dialog';
import Button from '@commonComponents/Button/Button';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Activity } from '@schemas/activity';
import { getDateStringFromTimestamp } from '@utils/time';
import classNames from 'classnames';
import { useSetAtom } from 'jotai';
import styles from './ActivityItem.module.scss';

interface ActivityItemProps {
  activity: Activity;
}
export default function ActivityItem(props: ActivityItemProps) {
  const setOpenActivityModal = useSetAtom(openActivityModalAtom);
  const setActivity = useSetAtom(activityAtom);

  return (
    <div className={classNames(styles.item)}>
      <div
        className={classNames(styles.header, {
          [styles['header--good']]: props.activity.category?.goalType === 'MIN',
          [styles['header--bad']]: props.activity.category?.goalType === 'MAX',
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
        <div className={styles.icons}>
          <Button
            fillType="regular"
            onClick={() => {
              setActivity(props.activity);
              setOpenActivityModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} width={14}></FontAwesomeIcon>
          </Button>
        </div>
      </div>
      <div className={classNames(styles.body)}>
        <span className={classNames(styles.value)}>
          {props.activity.value} {props.activity.category?.unit}
        </span>
        <span className={classNames(styles.date)}>
          {getDateStringFromTimestamp(props.activity.activityDate)}
        </span>
      </div>
    </div>
  );
}
