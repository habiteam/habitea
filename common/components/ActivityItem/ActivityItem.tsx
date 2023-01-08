import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Activity } from '@schemas/activity';
import { getDateStringFromTimestamp } from '@utils/time';
import classNames from 'classnames';
import styles from './ActivityItem.module.scss';

interface ActivityItemProps {
  activity: Activity;
}
export default function ActivityItem(props: ActivityItemProps) {
  return (
    <div className={classNames(styles.item)}>
      <div className={classNames(styles.header)}>
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
