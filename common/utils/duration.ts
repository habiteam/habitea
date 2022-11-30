/* eslint-disable no-restricted-globals */

export interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
}

export function getSecondsFromDuration(value: string): number {
  const [hours, minutes, seconds] = value.split(':').map(Number);

  if (!isNaN(hours) && isNaN(minutes) && isNaN(seconds)) {
    return hours;
  }

  if (!isNaN(hours) && !isNaN(minutes) && isNaN(seconds)) {
    return hours * 60 + minutes;
  }

  if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    return hours * 60 * 60 + minutes * 60 + seconds;
  }

  return 0;
}

// seconds to duration string HH:MM:SS
export function toDurationString(value: number): string {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor(value / 60) % 60;
  const seconds = value % 60;

  return [hours, minutes, seconds]
    .map((element) => element.toString().padStart(2, '0'))
    .join(':');
}

// seconds to duration object
export function toDuration(value: number): Duration {
  return {
    hours: Math.floor(value / 3600),
    minutes: Math.floor(value / 60) % 60,
    seconds: value % 60,
  };
}
