import { useAtomValue } from 'jotai';
import styles from './NotificationProvider.module.scss';
import notifications from '../../atoms/notifications';
import { Notification } from './Notification';

export interface NotificationProviderPropSchema {
  children?: React.ReactNode;
}

export function NotificationProvider(props: NotificationProviderPropSchema) {
  const notificationList = useAtomValue(notifications);

  return (
    <>
      <div className={styles.list}>
        {notificationList.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
      {props.children}
    </>
  );
}
