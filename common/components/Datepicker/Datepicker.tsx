import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from './Datepicker.module.scss';
import {
  DatepickerCalendar,
  DatepickerCalendarSelectedDateSchema,
  DatepickerCalendarViewSchema,
} from './DatepickerCalendar/DatepickerCalendar';
import { getMonthName, months, years } from './Datepicker.utils';
import { DatepickerSelect } from './DatepickerSelect/DatepickerSelect';

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
    useState<DatepickerCalendarSelectedDateSchema>({
      day: 0,
      month: 0,
      year: 0,
    });

  const [view, setView] = useState<DatepickerView>('Calendar');

  const monthButton = (
    <button key="monthButton" onClick={() => setView('Months')}>
      {getMonthName(currentlyViewed.month)}
    </button>
  );

  const yearButton = (
    <button key="yearButton" onClick={() => setView('Years')}>
      {currentlyViewed.year}
    </button>
  );

  const calendarButton = (
    <button key="calendarButton" onClick={() => setView('Calendar')}>
      <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
    </button>
  );

  const buttons: Record<DatepickerView, any> = {
    Calendar: <>{[monthButton, yearButton]}</>,
    Months: <>{[calendarButton, yearButton]}</>,
    Years: <>{[monthButton, calendarButton]}</>,
  };

  return (
    <div className={styles.datepicker}>
      <div className={styles['buttons-container']}>{buttons[view]}</div>
      {view === 'Months' && (
        <DatepickerSelect
          list={months}
          selectedValue={currentlyViewed.month}
          onSelect={(value) => {
            setCurrentlyViewed((prev) => ({ ...prev, month: value as number }));
            setView('Calendar');
          }}
        ></DatepickerSelect>
      )}

      {view === 'Years' && (
        <DatepickerSelect
          list={years()}
          selectedValue={currentlyViewed.year}
          onSelect={(value) => {
            setCurrentlyViewed((prev) => ({ ...prev, year: value as number }));
            setView('Calendar');
          }}
        ></DatepickerSelect>
      )}

      {view === 'Calendar' && (
        <DatepickerCalendar
          currentlyViewed={currentlyViewed}
          selectedDate={selectedDate}
          onChange={(value) => {
            setSelectedDate(value);
            onSelect(`${value.year}-${value.month}-${value.day}`);
          }}
        ></DatepickerCalendar>
      )}
    </div>
  );
}
