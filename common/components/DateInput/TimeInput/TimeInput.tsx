import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './TimeInput.module.scss';

export interface TimeInputPropSchema {
  value?: string;
  onChange: (time: string) => void;
}

export default function TimeInput(props: TimeInputPropSchema) {
  const [hours, setHours] = useState(props.value?.split(':')[0] ?? '00');
  const [minutes, setMinutes] = useState(props.value?.split(':')[1] ?? '00');

  function normalize(num: string, min: number, max: number): string {
    if (Number(num) > max) {
      return max.toString();
    }

    if (Number(num) < min) {
      return min.toString();
    }

    return num;
  }

  function valueChanges(): void {
    if (hours && minutes) props.onChange(`${hours}:${minutes}`);
  }

  useEffect(() => {
    valueChanges();
  }, [hours, minutes]);

  return (
    <div className={classNames(styles.timeinput)}>
      <div className={classNames(styles.header)}>Enter time</div>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles['input-container'])}>
          <input
            id="hours"
            className={classNames(styles.input)}
            maxLength={2}
            autoComplete="false"
            value={hours}
            onChange={(event) => {
              setHours(normalize(event.target.value, 0, 23));
            }}
          ></input>
          <label htmlFor="hours">Hours</label>
        </div>
        <div className={classNames(styles.separator)}>:</div>
        <div className={classNames(styles['input-container'])}>
          <input
            id="minutes"
            className={classNames(styles.input)}
            maxLength={2}
            autoComplete="false"
            value={minutes}
            onChange={(event) => {
              setMinutes(normalize(event.target.value, 0, 59));
            }}
          ></input>
          <label htmlFor="minutes">Minutes</label>
        </div>
      </div>
    </div>
  );
}
