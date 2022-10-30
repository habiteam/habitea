import React from 'react';
import { Color } from '../../constants/Color';

export interface ButtonPropSchema {
  children: React.ReactNode;
  fillType: 'regular' | 'filled' | 'outlined';
  onClick?: () => void;
  disabled?: boolean;
  color?: Color;
}
