export type Color =
  | 'primary'
  | 'success'
  | 'info'
  | 'default'
  | 'warning'
  | 'danger';

export interface Theme {
  name: string;
  value: string;
  primary: string;
}

export const THEMES: Theme[] = [
  { name: 'Habi tea', value: 'habitea', primary: '#be5c07' },
  { name: 'Habi coffee', value: 'coffee', primary: '#71341f' },
  { name: 'Blackberry juice', value: 'blackberry', primary: '#7c14de' },
  { name: 'Kale smoothie', value: 'kale', primary: '#47bd08' },
  { name: 'Spearmint', value: 'mint', primary: '#14c3de' },
  { name: 'Bubblegum', value: 'pinku', primary: '#de14ca' },
  { name: 'Borsch', value: 'beetroot', primary: '#de1414' },
];
