import {
  getDateFromDayOfYear,
  getDayOfYear,
  getFirstDayOfMonth,
  getFirstDayOfWeek,
  getFirstDayOfYear,
  getLastDayOfMonth,
  getLastDayOfWeek,
  getLastDayOfYear,
  getNextMonth,
  getPreviousMonth,
  getSevenDaysAgo,
  getWeekOfYear,
} from './date';

const firstDayOfYear = new Date('2023-01-01');
const lastDayOfYear = new Date('2023-12-31');
const firstDayofSomeMonth = new Date('2023-03-01');
const lastDayofSomeMonth = new Date('2023-03-31');
const firstDayofSomeWeek = new Date('2023-02-06');
const lastDayofSomeWeek = new Date('2023-02-12');

test('getPreviousMonth', () => {
  expect(getPreviousMonth(firstDayOfYear)).toEqual(new Date('2022-12-01'));
  expect(getPreviousMonth(lastDayOfYear)).toEqual(new Date('2023-11-01'));
  expect(getPreviousMonth(firstDayofSomeMonth)).toEqual(new Date('2023-02-01'));
  expect(getPreviousMonth(lastDayofSomeMonth)).toEqual(new Date('2023-02-01'));
  expect(getPreviousMonth(firstDayofSomeWeek)).toEqual(new Date('2023-01-01'));
  expect(getPreviousMonth(lastDayofSomeWeek)).toEqual(new Date('2023-01-01'));
});

test('getNextMonth', () => {
  expect(getNextMonth(firstDayOfYear)).toEqual(new Date('2023-02-01'));
  expect(getNextMonth(lastDayOfYear)).toEqual(new Date('2024-01-01'));
  expect(getNextMonth(firstDayofSomeMonth)).toEqual(new Date('2023-04-01'));
  expect(getNextMonth(lastDayofSomeMonth)).toEqual(new Date('2023-04-01'));
  expect(getNextMonth(firstDayofSomeWeek)).toEqual(new Date('2023-03-01'));
  expect(getNextMonth(lastDayofSomeWeek)).toEqual(new Date('2023-03-01'));
});

test('getFirstDayOfMonth', () => {
  expect(getFirstDayOfMonth(firstDayOfYear)).toEqual(new Date('2023-01-01'));
  expect(getFirstDayOfMonth(lastDayOfYear)).toEqual(new Date('2023-12-01'));
  expect(getFirstDayOfMonth(firstDayofSomeMonth)).toEqual(
    new Date('2023-03-01'),
  );
  expect(getFirstDayOfMonth(lastDayofSomeMonth)).toEqual(
    new Date('2023-03-01'),
  );
  expect(getFirstDayOfMonth(firstDayofSomeWeek)).toEqual(
    new Date('2023-02-01'),
  );
  expect(getFirstDayOfMonth(lastDayofSomeWeek)).toEqual(new Date('2023-02-01'));
});

test('getLastDayOfMonth', () => {
  expect(getLastDayOfMonth(firstDayOfYear)).toEqual(new Date('2023-01-31'));
  expect(getLastDayOfMonth(lastDayOfYear)).toEqual(new Date('2023-12-31'));
  expect(getLastDayOfMonth(firstDayofSomeMonth)).toEqual(
    new Date('2023-03-31'),
  );
  expect(getLastDayOfMonth(lastDayofSomeMonth)).toEqual(new Date('2023-03-31'));
  expect(getLastDayOfMonth(firstDayofSomeWeek)).toEqual(new Date('2023-02-28'));
  expect(getLastDayOfMonth(lastDayofSomeWeek)).toEqual(new Date('2023-02-28'));
});

test('getFirstDayOfWeek', () => {
  expect(getFirstDayOfWeek(firstDayOfYear)).toEqual(new Date('2022-12-26'));
  expect(getFirstDayOfWeek(lastDayOfYear)).toEqual(new Date('2023-12-25'));
  expect(getFirstDayOfWeek(firstDayofSomeMonth)).toEqual(
    new Date('2023-02-27'),
  );
  expect(getFirstDayOfWeek(lastDayofSomeMonth)).toEqual(new Date('2023-03-27'));
  expect(getFirstDayOfWeek(firstDayofSomeWeek)).toEqual(new Date('2023-02-06'));
  expect(getFirstDayOfWeek(lastDayofSomeWeek)).toEqual(new Date('2023-02-06'));
});
test('getLastDayOfWeek', () => {
  expect(getLastDayOfWeek(firstDayOfYear)).toEqual(new Date('2023-01-01'));
  expect(getLastDayOfWeek(lastDayOfYear)).toEqual(new Date('2023-01-02'));
  expect(getLastDayOfWeek(firstDayofSomeMonth)).toEqual(new Date('2023-03-05'));
  expect(getLastDayOfWeek(lastDayofSomeMonth)).toEqual(new Date('2023-04-02'));
  expect(getLastDayOfWeek(firstDayofSomeWeek)).toEqual(new Date('2023-02-12'));
  expect(getLastDayOfWeek(lastDayofSomeWeek)).toEqual(new Date('2023-02-12'));
});
test('getFirstDayOfYear', () => {
  expect(getFirstDayOfYear(firstDayOfYear)).toEqual(new Date('2023-01-01'));
  expect(getFirstDayOfYear(lastDayOfYear)).toEqual(new Date('2023-01-01'));
  expect(getFirstDayOfYear(firstDayofSomeMonth)).toEqual(
    new Date('2023-01-01'),
  );
  expect(getFirstDayOfYear(lastDayofSomeMonth)).toEqual(new Date('2023-01-01'));
  expect(getFirstDayOfYear(firstDayofSomeWeek)).toEqual(new Date('2023-01-01'));
  expect(getFirstDayOfYear(lastDayofSomeWeek)).toEqual(new Date('2023-01-01'));
});
test('getLastDayOfYear', () => {
  expect(getLastDayOfYear(firstDayOfYear)).toEqual(new Date('2023-12-31'));
  expect(getLastDayOfYear(lastDayOfYear)).toEqual(new Date('2023-12-31'));
  expect(getLastDayOfYear(firstDayofSomeMonth)).toEqual(new Date('2023-12-31'));
  expect(getLastDayOfYear(lastDayofSomeMonth)).toEqual(new Date('2023-12-31'));
  expect(getLastDayOfYear(firstDayofSomeWeek)).toEqual(new Date('2023-12-31'));
  expect(getLastDayOfYear(lastDayofSomeWeek)).toEqual(new Date('2023-12-31'));
});

test('getDayOfYear', () => {
  expect(getDayOfYear(firstDayOfYear)).toEqual(1);
  expect(getDayOfYear(lastDayOfYear)).toEqual(365);
  expect(getDayOfYear(firstDayofSomeMonth)).toEqual(60);
  expect(getDayOfYear(lastDayofSomeMonth)).toEqual(90);
  expect(getDayOfYear(firstDayofSomeWeek)).toEqual(37);
  expect(getDayOfYear(lastDayofSomeWeek)).toEqual(43);
});

test('getDateFromDayOfYear', () => {
  expect(getDateFromDayOfYear(2023, 1)).toEqual(firstDayOfYear);
  expect(getDateFromDayOfYear(2023, 365)).toEqual(lastDayOfYear);
  expect(getDateFromDayOfYear(2023, 60)).toEqual(firstDayofSomeMonth);
  expect(getDateFromDayOfYear(2023, 90)).toEqual(lastDayofSomeMonth);
  expect(getDateFromDayOfYear(2023, 37)).toEqual(firstDayofSomeWeek);
  expect(getDateFromDayOfYear(2023, 43)).toEqual(lastDayofSomeWeek);
});

test('getWeekOfYear', () => {
  expect(getWeekOfYear(firstDayOfYear)).toEqual(1);
  expect(getWeekOfYear(lastDayOfYear)).toEqual(53);
  expect(getWeekOfYear(firstDayofSomeMonth)).toEqual(10);
  expect(getWeekOfYear(lastDayofSomeMonth)).toEqual(14);
  expect(getWeekOfYear(firstDayofSomeWeek)).toEqual(6);
  expect(getWeekOfYear(lastDayofSomeWeek)).toEqual(7);
});

test('getSevenDaysAgo', () => {
  expect(getSevenDaysAgo(firstDayOfYear)).toEqual(new Date('2022-12-25'));
  expect(getSevenDaysAgo(lastDayOfYear)).toEqual(new Date('2023-12-24'));
  expect(getSevenDaysAgo(firstDayofSomeMonth)).toEqual(new Date('2023-02-22'));
  expect(getSevenDaysAgo(lastDayofSomeMonth)).toEqual(new Date('2023-03-24'));
  expect(getSevenDaysAgo(firstDayofSomeWeek)).toEqual(new Date('2023-01-30'));
  expect(getSevenDaysAgo(lastDayofSomeWeek)).toEqual(new Date('2023-02-05'));
});
