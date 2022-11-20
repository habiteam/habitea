import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Color } from '@constants/palette';
import styles from './Chip.module.scss';

export interface ChipPropSchema {
  text: string;
  color?: Color;
  icon?: IconDefinition;
}

export default function Chip(props: ChipPropSchema) {
  return (
    <div
      className={classNames(
        styles.chip,
        styles[`chip--${props.color ?? 'default'}`],
      )}
    >
      {props.icon && (
        <FontAwesomeIcon
          icon={props.icon}
          className={styles['chip-icon']}
        ></FontAwesomeIcon>
      )}
      <span>{props.text}</span>
    </div>
  );
}
