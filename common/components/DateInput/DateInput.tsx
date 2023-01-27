import Datepicker from '@commonComponents/Datepicker/Datepicker';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './DateInput.module.scss';
import TimeInput from './TimeInput/TimeInput';

export interface DateInputPropSchema {
  label?: string;
  value: string;
  onChange: (date: string) => void;
  position?: 'top' | 'bottom';
}

export default function DateInput(props: DateInputPropSchema) {
  const [isDatepickerOpened, setIsDatepickerOpened] = useState<boolean>(false);

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

  function handleOnChange(d: string, t: string) {
    props.onChange(`${d} ${t}`);
  }

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsDatepickerOpened(false);
      document.removeEventListener('click', handleClickOutside);
    }
  }

  useEffect(() => {
    if (props.value) {
      const initialDate = props.value.split(' ');

      setDate(initialDate[0]);
      setTime(initialDate[1]);
    }
  }, [props.value]);

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={classNames(styles['selector-button'], {
          [styles['selector-button--focued']]: isDatepickerOpened,
        })}
        onClick={(event) => {
          event.preventDefault();
          setIsDatepickerOpened(!isDatepickerOpened);
          document.addEventListener('click', handleClickOutside);
        }}
      >
        {`${date} ${time}` || props.label}
      </button>
      {isDatepickerOpened && (
        <div
          className={classNames(
            styles['date-picker-wrapper'],
            styles[props.position ?? 'bottom'],
          )}
        >
          <Datepicker
            date={date}
            onSelect={(val) => {
              handleOnChange(val, time);
            }}
          ></Datepicker>
          <TimeInput
            value={time}
            onChange={(val) => {
              handleOnChange(date, val);
            }}
          ></TimeInput>
        </div>
      )}
    </div>
  );
}
