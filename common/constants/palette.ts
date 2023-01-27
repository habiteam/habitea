export type Color =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'primary-alt'
  | 'secondary'
  | 'secondary-alt'
  | 'tertiary'
  | 'default'
  | 'light'
  | 'dark';

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
    name: 'Matcha',
    value: 'matcha',
    primary: '#c1d03d',
    secondary: '#444b00',
  },
  {
    name: 'Kale smoothie',
    value: 'kale',
    primary: '#48680e',
    secondary: '#c8f088',
  },
  {
    name: 'Blueberry',
    value: 'blueberry',
    primary: '#004c6d',
    secondary: '#212427',
  },
  {
    name: 'Spearmint',
    value: 'mint',
    primary: '#006876',
    secondary: '#9fefff',
  },
  {
    name: 'Cabbage',
    value: 'cabbage',
    primary: '#48398d',
    secondary: '#242227',
  },
  {
    name: 'Blackberry juice',
    value: 'blackberry',
    primary: '#7e3db9',
    secondary: '#f1dbff',
  },
  {
    name: 'Borsch',
    value: 'beetroot',
    primary: '#822146',
    secondary: '#ffd9e1',
  },
  {
    name: 'Strawberry',
    value: 'strawberry',
    primary: '#a7373a',
    secondary: '#ffdad8',
  },
  {
    name: 'Bubblegum',
    value: 'bubblegum',
    primary: '#ac009d',
    secondary: '#ffd7f1',
  },
  {
    name: 'Orange peel',
    value: 'orange',
    primary: '#ffa500',
    secondary: '#292b31',
  },
  {
    name: 'Lemon zest',
    value: 'lemon',
    primary: '#676000',
    secondary: '#f5e633',
  },
  {
    name: 'Grapefruit',
    value: 'grapefruit',
    primary: '#7d799a',
    secondary: '#f8a2a1',
  },
];
