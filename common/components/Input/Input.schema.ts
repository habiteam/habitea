import { Color } from '../../constants/Color';

export interface InputPropsSchema {
  id: string;
  title: string;
  disabled?: boolean;
  color?: Color;
  onChange?: (text: string) => void;
}
