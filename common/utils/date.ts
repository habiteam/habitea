export function getPreviousMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

export function getNextMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function getPreviousYear(date: Date): Date {
  return new Date(date.getFullYear() - 1, date.getMonth(), 1);
}

export function getNextYear(date: Date): Date {
  return new Date(date.getFullYear() + 1, date.getMonth(), 1);
}

export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getLastDayOfWeek(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + (6 - date.getDay()),
  );
}

export function getFirstDayOfWeek(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay(),
  );
}

export function getLastDayOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 11, 31);
}

export function getFirstDayOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

export function getDayOfYear(date: Date): number {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24,
  );
}

export function getDateFromDayOfYear(year: number, day: number): Date {
  return new Date(year, 0, day);
}
