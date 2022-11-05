import classNames from 'classnames';
import { useAtom } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { NotificationPropsSchema } from './Notification.schema';
import styles from './Notification.module.scss';
import { Color } from '../../constants/Color';
import Button from '../Button/Button';
import notifications from '../../atoms/notifications';

export function Notification(props: NotificationPropsSchema) {
  const [, setNotificationList] = useAtom(notifications);
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
        <>{props.id}</>
        <Button onClick={handleClose} fillType="regular" color={props.type}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </Button>
      </div>

      <div style={{ width: `${100 - time}%` }} className={styles.bar}></div>
    </div>
  );
}
