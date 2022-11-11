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
  { label: 'Jan', value: 0 },
  { label: 'Feb', value: 1 },
  { label: 'Mar', value: 2 },
  { label: 'Apr', value: 3 },
  { label: 'May', value: 4 },
  { label: 'Jun', value: 5 },
  { label: 'Jul', value: 6 },
  { label: 'Aug', value: 7 },
  { label: 'Sep', value: 8 },
  { label: 'Oct', value: 9 },
  { label: 'Nov', value: 10 },
  { label: 'Dec', value: 11 },
];

export const years = (): DatepickerSelectItem[] => {
  const list = [];
  for (let i = 1930; i < 2230; i += 1) {
    list.push({ label: i.toString(), value: i });
  }
  return list;
};
