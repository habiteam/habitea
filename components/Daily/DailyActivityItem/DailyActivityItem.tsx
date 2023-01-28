import {
  findIconDefinition,
  IconName,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTimeFromDate } from '@utils/date';
import classNames from 'classnames';
import { DailyActivity } from '../Daily.schema';
import styles from './DailyActivityItem.module.scss';

interface DailyActivityItemProps extends React.HTMLAttributes<HTMLDivElement> {
  activity?: DailyActivity;
}

export default function DailyActivityItem({
  activity,
}: DailyActivityItemProps) {
  return (
    <div className={classNames(styles.item)}>
      {activity ? (
        <>
          <div className={classNames(styles['item-header'])}>
            {activity.category && <h2>{activity.category.name}</h2>}
            {getTimeFromDate(activity.activityDate.toDate())}
          </div>

          <div className={classNames(styles['item-content'])}>
            <FontAwesomeIcon
              className={classNames(styles['item-icon'])}
              icon={findIconDefinition({
                prefix: 'fas',
                iconName: activity.category?.icon as IconName,
              })}
              width={48}
            ></FontAwesomeIcon>
            {activity.progress && <h2>{activity.progress.toPrecision(2)}%</h2>}
          </div>
        </>
      ) : (
        <h2> No Activity today</h2>
      )}
    </div>
  );
}
