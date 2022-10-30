import React from 'react';
import { UrlObject } from 'url';
import { Color } from '../../constants/Color';

export interface LinkPropSchema {
  children: React.ReactNode;
  href: string | UrlObject;
  disabled?: boolean;
  color?: Color;
}
