import React from 'react';
import classNames from 'classnames';
import Button from '@commonComponents/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import styles from './Pin.module.scss';

export interface PinProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: number;
  onClick?: () => void;
}

export default function Pin(props: PinProps) {
  return (
    <>
      {props.value > 0 ? (
        <Button {...props} fillType="filled" color="primary-alt">
          <FontAwesomeIcon
            icon={faThumbtack}
            className={classNames(styles.icon)}
          ></FontAwesomeIcon>
        </Button>
      ) : (
        <Button {...props} fillType="regular" color="primary-alt">
          <FontAwesomeIcon
            icon={faThumbtack}
            className={classNames(styles.icon)}
          ></FontAwesomeIcon>
        </Button>
      )}
    </>
  );
}
