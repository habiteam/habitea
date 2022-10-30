import React from 'react';
import styles from './Card.module.scss';
import { Color } from '../../constants/Color';

export type CardAppearance = 'outlined' | 'elevated' | 'filled';

export interface CardPropSchema {
  children: React.ReactNode;
  appearance?: CardAppearance;
  maxWidth?: string;
  color?: Color;
}

export default function Card(props: CardPropSchema) {
  return (
    <div
      style={{ maxWidth: props.maxWidth ?? '100%' }}
      className={`${styles.card} ${
        styles[`card--${props.appearance ?? 'outlined'}`]
      } ${styles[`card--color-${props.color ?? 'default'}`]}`}
    >
      {props.children}
    </div>
  );
}
