import React from 'react';
import styles from './Button.module.scss';
import { Color } from '../../constants/Color';

export interface ButtonPropSchema {
  children?: React.ReactNode;
  fillType: 'regular' | 'filled' | 'outlined';
  onClick?: () => void;
  disabled?: boolean;
  color?: Color;
}

/**
 * TODO disabled
 *
 * @param props
 * @returns
 */
export default function Button(props: ButtonPropSchema) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.button}
        ${styles[`button--${props.color ?? 'default'}`]}
        ${styles[`button--${props.fillType}`]}
        `}
    >
      {props.children}
    </button>
  );
}
