export type Color =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'tertiary'
  | 'default';

export interface Theme {
  name: string;
  value: string;
  primary: string;
  secondary: string;
}

export const THEMES: Theme[] = [
  {
    name: 'Habi tea',
    value: 'habitea',
    primary: '#984700',
    secondary: '#ffdbc8',
  },
  {
    name: 'Habi coffee',
    value: 'coffee',
    primary: '#ffb784',
    secondary: '#634224',
  },
  {
    name: 'Coffee with milk',
    value: 'milky',
    primary: '#7e5700',
    secondary: '#ffdeac',
  },
  {
    name: 'Kale smoothie',
    value: 'kale',
    primary: '#48680e',
    secondary: '#c8f088',
  },
  {
    name: 'Spearmint',
    value: 'mint',
    primary: '#006876',
    secondary: '#9fefff',
  },
  {
    name: 'Blue Lemonade',
    value: 'raspberry',
    primary: '#006590',
    secondary: '#c8e6ff',
  },
  {
    name: 'Blackberry juice',
    value: 'blackberry',
    primary: '#7e3db9',
    secondary: '#f1dbff',
  },
  {
    name: 'Bubblegum',
    value: 'bubblegum',
    primary: '#ac009d',
    secondary: '#ffd7f1',
  },
  {
    name: 'Borsch',
    value: 'beetroot',
    primary: '#a7373a',
    secondary: '#ffdad8',
  },
  {
    name: 'Orange peel',
    value: 'orange',
    primary: '#ffa500',
    secondary: '#292b31',
  },
];
