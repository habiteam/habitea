import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { Color } from '../../constants/Color';

export interface ButtonPropSchema {
  children?: React.ReactNode;
  fillType: 'regular' | 'filled' | 'outlined';
  size?: 'md' | 'lg';
  onClick?: (event?: any) => void;
  disabled?: boolean;
  color?: Color;
}

/**
 * @param props
 * @returns
 */
export default function Button(props: ButtonPropSchema) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={classNames(
        styles.button,
        styles[`button--${props.color ?? 'default'}`],
        styles[`button--${props.fillType}`],
        styles[`button--${props.size ?? 'md'}`],
      )}
    >
      {props.children}
    </button>
  );
}
