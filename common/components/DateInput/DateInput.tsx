import Datepicker from '@commonComponents/Datepicker/Datepicker';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import styles from './DateInput.module.scss';

export interface DateInputPropSchema {
  label?: string;
  value?: string;
  onSelect: (date: string) => void;
  position?: 'top' | 'bottom';
}

export default function DateInput(props: DateInputPropSchema) {
  const [isDatepickerOpened, setIsDatepickerOpened] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsDatepickerOpened(false);
      document.removeEventListener('click', handleClickOutside);
    }
  }

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
        {props.value || props.label}
      </button>
      {isDatepickerOpened && (
        <div
          className={classNames(
            styles['date-picker-wrapper'],
            styles[props.position ?? 'bottom'],
          )}
        >
          <Datepicker date={props.value} onSelect={props.onSelect}></Datepicker>
        </div>
      )}
    </div>
  );
}
