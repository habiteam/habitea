import { useAtomValue } from 'jotai';
import { useTransition, animated, config } from 'react-spring';
import styles from './NotificationProvider.module.scss';
import notifications from '../../atoms/notifications';
import { Notification } from './Notification';

export interface NotificationProviderPropSchema {
  children?: React.ReactNode;
}

export function NotificationProvider(props: NotificationProviderPropSchema) {
  const notificationList = useAtomValue(notifications);

  const transitions = useTransition(notificationList, {
    from: { opacity: 0, transform: 'translateY(100px) scaleY(0.2)' },
    enter: { opacity: 1, transform: 'translateY(0) scaleY(1)' },
    leave: { opacity: 0 },
    config: config.gentle,
  });

  return (
    <>
      <div className={styles.list}>
        {transitions((style, notification) => (
          <animated.div style={style} key={notification.id}>
            <Notification {...notification} />
          </animated.div>
        ))}
      </div>
      {props.children}
    </>
  );
}
