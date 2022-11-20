import { ButtonPropSchema } from '@commonComponents/Button/Button';
import { RefObject } from 'react';

export interface DialogPropsSchema {
  title?: string;
  actions?: ButtonPropSchema[];
  children: React.ReactNode;
  open: boolean;
  handleClose?: () => void;
  anchorRef?: RefObject<HTMLElement>;
}
