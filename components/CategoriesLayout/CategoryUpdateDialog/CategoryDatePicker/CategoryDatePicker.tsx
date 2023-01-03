import Datepicker from '@commonComponents/Datepicker/Datepicker';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './CategoryDatePicker.module.scss';

export interface CategoryDatePickerPropSchema {
  label?: string;
  value?: string;
  onSelect: (date: string) => void;
}

export default function CategoryDatePicker(
  props: CategoryDatePickerPropSchema,
) {
  const [isDatepickerOpened, setIsDatepickerOpened] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setIsDatepickerOpened(false);
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [ref]);

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={classNames(styles['selector-button'], {
          [styles['selector-button--focued']]: isDatepickerOpened,
        })}
        onClick={(event) => {
          event.preventDefault();
          setIsDatepickerOpened(!isDatepickerOpened);
        }}
      >
        {props.value || props.label}
      </button>
      {isDatepickerOpened && (
        <div className={styles['date-picker-wrapper']}>
          <Datepicker date={props.value} onSelect={props.onSelect}></Datepicker>
        </div>
      )}
    </div>
  );
}
