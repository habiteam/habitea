import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Color } from '@constants/palette';
import styles from './Chip.module.scss';

export interface ChipPropSchema extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  fillType?: 'filled' | 'outlined';
  color?: Color;
  icon?: IconDefinition;
  onClick?: () => void;
}

export default function Chip(props: ChipPropSchema) {
  return (
    <span
      onClick={props.onClick}
      className={classNames(
        props.className,
        styles.chip,
        styles[`chip--${props.color ?? 'default'}`],
        styles[`chip--${props.fillType ?? 'outlined'}`],
        { [styles[`chip--clickable`]]: props.onClick },
      )}
    >
      {props.icon && (
        <FontAwesomeIcon
          icon={props.icon}
          className={styles['chip-icon']}
        ></FontAwesomeIcon>
      )}
      <span>{props.text ?? props.children}</span>
    </span>
  );
}
