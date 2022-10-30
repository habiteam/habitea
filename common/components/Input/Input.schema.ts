import { Color } from '../../constants/Color';

export interface InputPropsSchema {
  id: string;
  title: string;
  disabled?: boolean;
  color?: Color;
  type?: 'text' | 'password';
  onChange?: (text: string) => void;
}
