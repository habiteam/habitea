import React from 'react';
import { Color } from '../../constants/Color';

export interface CardPropSchema {
  children: React.ReactNode;
  appearance?: 'outlined' | 'elevated' | 'filled';
  maxWidth?: string;
  color?: Color;
}
