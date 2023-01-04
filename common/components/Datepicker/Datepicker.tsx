import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useTransition, animated, easings } from 'react-spring';
import styles from './Datepicker.module.scss';
import { DatepickerCalendar } from './DatepickerCalendar/DatepickerCalendar';
import { getDateObject, getMonthName, months, years } from './Datepicker.utils';
import { DatepickerSelect } from './DatepickerSelect/DatepickerSelect';
import {
  DatepickerCalendarSelectedDateSchema,
  DatepickerCalendarViewSchema,
} from './DatepickerCalendar/Datepicker-calendar-schema';

export type DatepickerView = 'Calendar' | 'Months' | 'Years';

export interface DatepickerPropSchema {
  date?: string;
  onSelect: (date: string) => void;
}

export default function Datepicker({ date, onSelect }: DatepickerPropSchema) {
  const viewDate = date ? new Date(date) : new Date();

  const [currentlyViewed, setCurrentlyViewed] =
    useState<DatepickerCalendarViewSchema>({
      month: viewDate.getUTCMonth(),
      year: viewDate.getUTCFullYear(),
    });

  const [selectedDate, setSelectedDate] =
    useState<DatepickerCalendarSelectedDateSchema>(getDateObject(date));

  const [view, setView] = useState<DatepickerView>('Calendar');

  const commonTransitionStyles = {
    from: { opacity: 0.2, scale: 0.9 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0.2, scale: 1.1 },
    exitBeforeEnter: true,
    config: { duration: 150, easing: easings.easeInOutQuad },
  };

  const monthTransition = useTransition(
    view === 'Months',
    commonTransitionStyles,
  );
  const yearTransition = useTransition(
    view === 'Years',
    commonTransitionStyles,
  );
  const calendarTransition = useTransition(
    view === 'Calendar',
    commonTransitionStyles,
  );

  const monthButton = (
    <button
      onClick={(event) => {
        event.preventDefault();
        setView('Months');
      }}
    >
      {getMonthName(currentlyViewed.month)}
    </button>
  );

  const yearButton = (
    <button
      onClick={(event) => {
        event.preventDefault();
        setView('Years');
      }}
    >
      {currentlyViewed.year}
    </button>
  );

  const calendarButton = (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setView('Calendar');
      }}
    >
      <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
    </button>
  );

  const buttons: Record<DatepickerView, [JSX.Element, JSX.Element]> = {
    Calendar: [monthButton, yearButton],
    Months: [calendarButton, yearButton],
    Years: [monthButton, calendarButton],
  };

  return (
    <div className={styles.datepicker}>
      <div className={styles['buttons-container']}>
        {buttons[view].map((el, index) => ({ ...el, key: index }))}
      </div>
      {monthTransition(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <DatepickerSelect
                list={months}
                selectedValue={currentlyViewed.month}
                onSelect={(value) => {
                  setCurrentlyViewed((prev) => ({
                    ...prev,
                    month: value as number,
                  }));
                  setView('Calendar');
                }}
              ></DatepickerSelect>
            </animated.div>
          ),
      )}

      {yearTransition(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <DatepickerSelect
                list={years()}
                selectedValue={currentlyViewed.year}
                onSelect={(value) => {
                  setCurrentlyViewed((prev) => ({
                    ...prev,
                    year: value as number,
                  }));
                  setView('Calendar');
                }}
              ></DatepickerSelect>
            </animated.div>
          ),
      )}

      {calendarTransition(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <DatepickerCalendar
                currentlyViewed={currentlyViewed}
                selectedDate={selectedDate}
                onChange={(value) => {
                  setSelectedDate(value);
                  onSelect(`${value.year}-${value.month + 1}-${value.day}`);
                }}
              ></DatepickerCalendar>
            </animated.div>
          ),
      )}
    </div>
  );
}
