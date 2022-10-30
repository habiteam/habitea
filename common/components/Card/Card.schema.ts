import React from 'react';
import { Color } from '../../constants/Color';

export type CardAppearance = 'outlined' | 'elevated' | 'filled';

export interface CardPropSchema {
  children: React.ReactNode;
  appearance?: CardAppearance;
  maxWidth?: string;
  color?: Color;
}
