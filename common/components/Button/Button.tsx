import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { Color } from '@constants/palette';
import styles from './Button.module.scss';

export interface ButtonPropSchema
  extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: React.ReactNode;
  fillType: 'regular' | 'filled' | 'outlined';
  size?: 'md' | 'lg';
  onClick?: (event?: any) => void;
  disabled?: boolean;
  color?: Color;
  style?: CSSProperties;
  isElevated?: boolean;
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
        props.className,
        styles.button,
        styles[`button--${props.color ?? 'default'}`],
        styles[`button--${props.fillType}`],
        styles[`button--${props.size ?? 'md'}`],
        { [styles[`button--elevated`]]: props?.isElevated },
      )}
      style={props.style}
    >
      {props.text}
      {props.children}
    </button>
  );
}
