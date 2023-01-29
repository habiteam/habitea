import React from 'react';
import classNames from 'classnames';
import { Days } from '@constants/dictionaries';
import styles from './DatepickerCalendar.module.scss';
import {
  getFirstDayOfMonth,
  getDaysInMonth,
  getLastDayOfPreviousMonth,
} from '../Datepicker.utils';
import {
  DatepickerCalendarSelectedDateSchema,
  DatepickerCalendarViewSchema,
} from './Datepicker-calendar-schema';

export interface DatepickerCalendarPropSchema {
  currentlyViewed: DatepickerCalendarViewSchema;
  selectedDate: DatepickerCalendarSelectedDateSchema;
  onChange: (selectedDate: DatepickerCalendarSelectedDateSchema) => void;
}

export function DatepickerCalendar({
  currentlyViewed,
  selectedDate,
  onChange,
}: DatepickerCalendarPropSchema) {
  const weekdays = Days.short;

  const emptiesBefore: any[] = [];
  const days: any[] = [];
  const emptiesAfter: any[] = [];

  for (
    let i = 0;
    i < getFirstDayOfMonth(currentlyViewed.year, currentlyViewed.month);
    i += 1
  ) {
    emptiesBefore.push(
      <button
        className={classNames(styles.cell, styles['cell--inactive'])}
        key={`empty-${i}`}
        disabled
      >
        {getLastDayOfPreviousMonth(
          currentlyViewed.year,
          currentlyViewed.month,
        ) - i}
      </button>,
    );
  }

  for (
    let i = 1;
    i <= getDaysInMonth(currentlyViewed.year, currentlyViewed.month);
    i += 1
  ) {
    days.push(
      <button
        className={classNames(styles.cell, styles['cell--clickable'], {
          [styles['cell--selected']]:
            i === selectedDate.day &&
            currentlyViewed.month === selectedDate.month &&
            currentlyViewed.year === selectedDate.year,
        })}
        key={`day-${i}`}
        onClick={(event) => {
          event.preventDefault();
          onChange({
            day: i,
            month: currentlyViewed.month,
            year: currentlyViewed.year,
          });
        }}
      >
        {i}
      </button>,
    );
  }

  for (let i = 1; i <= 42 - (emptiesBefore.length + days.length); i += 1) {
    emptiesAfter.push(
      <button
        className={classNames(styles.cell, styles['cell--inactive'])}
        key={`empty-${i}`}
        disabled
      >
        {i}
      </button>,
    );
  }

  const total = [...emptiesBefore.reverse(), ...days, ...emptiesAfter];
  const rows: any[] = [];
  let cells: any[] = [];

  total.forEach((day, i) => {
    if (i % 7 === 0 && cells.length > 0) {
      rows.push(cells);
      cells = [];
    }

    cells.push(day);

    if (i === total.length - 1) {
      rows.push(cells);
    }
  });

  return (
    <div className={styles.calendar}>
      <div className={classNames(styles.row)}>
        {weekdays.map((day, i) => (
          <div className={styles.cell} key={i}>
            {day}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} className={classNames(styles.row)}>
          {row}
        </div>
      ))}
    </div>
  );
}
