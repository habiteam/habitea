import Button from '@commonComponents/Button/Button';
import Datepicker from '@commonComponents/Datepicker/Datepicker';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './DateInput.module.scss';
import TimeInput from './TimeInput/TimeInput';

export interface DateInputPropSchema {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  position?: 'top' | 'bottom';
}

export default function DateInput(props: DateInputPropSchema) {
  const [isDatepickerOpened, setIsDatepickerOpened] = useState<boolean>(false);

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsDatepickerOpened(false);
      document.removeEventListener('click', handleClickOutside);
    }
  }

  function handleOnChange() {
    if (date && time) props.onChange(new Date(`${date} ${time}`));
  }

  useEffect(() => {
    if (props.value) {
      const initialDate = Intl.DateTimeFormat('sv-SE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(props.value);

      setDate(initialDate.split(' ')[0]);
      setTime(initialDate.split(' ')[1]);
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
              setDate(val);
            }}
          ></Datepicker>
          <TimeInput
            value={time}
            onChange={(val) => {
              setTime(val);
            }}
          ></TimeInput>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}></div>
            <Button
              fillType="filled"
              color="primary"
              onClick={() => {
                handleOnChange();
                setIsDatepickerOpened(false);
              }}
              style={{ marginTop: '24px' }}
            >
              Select
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
