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
  for (let i = 1922; i < 2122; i += 1) {
    list.push({ label: i.toString(), value: i });
  }
  return list;
};
