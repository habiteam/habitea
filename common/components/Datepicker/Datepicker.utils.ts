import { DatepickerCalendarSelectedDateSchema } from './DatepickerCalendar/Datepicker-calendar-schema';
import { DatepickerSelectItem } from './DatepickerSelect/DatepickerSelect';

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getUTCDay();
}

export function getLastDayOfPreviousMonth(year: number, month: number) {
  return new Date(year, month, 1).getUTCDate();
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString('en-US', { month: 'short' });
}

export function getDateObject(
  date?: string,
): DatepickerCalendarSelectedDateSchema {
  if (!date) return { year: 0, month: 0, day: 0 };

  return {
    year: Number(date.split('-')[0]),
    month: Number(date.split('-')[1]) - 1,
    day: Number(date.split('-')[2]),
  };
}

export const months: DatepickerSelectItem[] = [
  { label: 'January', value: 0 },
  { label: 'February', value: 1 },
  { label: 'March', value: 2 },
  { label: 'April', value: 3 },
  { label: 'May', value: 4 },
  { label: 'June', value: 5 },
  { label: 'July', value: 6 },
  { label: 'August', value: 7 },
  { label: 'September', value: 8 },
  { label: 'October', value: 9 },
  { label: 'November', value: 10 },
  { label: 'December', value: 11 },
];

export const years = (): DatepickerSelectItem[] => {
  const list = [];
  for (let i = 2000; i < 2100; i += 1) {
    list.push({ label: i.toString(), value: i });
  }
  return list;
};
