import classNames from 'classnames';
import { useAtom } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { notificationsAtom } from '@atoms/notifications';
import Button from '@commonComponents/Button/Button';
import { NotificationPropsSchema } from './Notification.schema';
import styles from './Notification.module.scss';

/**
 * @see useAddNotification hook for usage
 *
 * @param props
 * @returns
 */
export function Notification(props: NotificationPropsSchema) {
  const [, setNotificationList] = useAtom(notificationsAtom);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [time, setTime] = useState<number>(0);

  function handlePauseTimer() {
    if (intervalId) clearInterval(intervalId);
  }

  function handleClose() {
    handlePauseTimer();
    setNotificationList((values) => [
      ...values.filter((item) => item.id !== props.id),
    ]);
  }

  function handleTimer() {
    const val = setInterval(() => {
      setTime((prev) => {
        if (prev < 100) {
          return prev + 1;
        }

        handlePauseTimer();
        return prev;
      });
    }, 50);
    setIntervalId(val);
  }

  useEffect(() => {
    if (time >= 100) handleClose();
  }, [time]);

  useEffect(() => {
    handleTimer();
  }, []);

  return (
    <div
      className={classNames(
        styles.notification,
        styles[`notification--${props.type ?? 'default'}`],
      )}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleTimer}
    >
      <div className={styles.content}>
        <>{props.message}</>
        <Button onClick={handleClose} fillType="regular" color={props.type}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </Button>
      </div>

      <div style={{ width: `${100 - time}%` }} className={styles.bar}></div>
    </div>
  );
}
