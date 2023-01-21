export type Color =
  | 'primary'
  | 'success'
  | 'info'
  | 'default'
  | 'warning'
  | 'danger'
  | 'inactive';

export interface Theme {
  name: string;
  value: string;
  primary: string;
}

export const THEMES: Theme[] = [
  { name: 'Habi tea', value: 'habitea', primary: '#be5c07' },
  { name: 'Habi coffee', value: 'coffee', primary: '#71341f' },
  { name: 'Coffee with milk', value: 'milky', primary: '#766850' },
  { name: 'Kale smoothie', value: 'kale', primary: '#47bd08' },
  { name: 'Spearmint', value: 'mint', primary: '#14c3de' },
  { name: 'Blue Lemonade', value: 'raspberry', primary: '#1c5575' },
  { name: 'Blackberry juice', value: 'blackberry', primary: '#a160dd' },
  { name: 'Bubblegum', value: 'bubblegum', primary: '#de14ca' },
  { name: 'Borsch', value: 'beetroot', primary: '#d65a5a' },
];
