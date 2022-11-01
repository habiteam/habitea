import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';
import { Color } from '../../constants/Color';

export type CardAppearance = 'outlined' | 'filled';

export interface CardPropSchema {
  children: React.ReactNode;
  appearance?: CardAppearance;
  elevated?: boolean;
  rounded?: boolean;
  maxWidth?: string;
  color?: Color;
}

export default function Card(props: CardPropSchema) {
  return (
    <div
      style={{ maxWidth: props.maxWidth ?? '100%' }}
      className={classNames(
        styles.card,
        styles[`card--${props.appearance ?? 'outlined'}`],
        styles[`card--color-${props.color ?? 'default'}`],
        { [styles['card--elevated']]: props.elevated },
        { [styles['card--rounded']]: props.rounded },
      )}
    >
      {props.children}
    </div>
  );
}
