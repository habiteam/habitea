import React, { useState } from 'react';
import buttonStyles from './Input.module.scss';
import { InputPropsSchema } from './Input.schema';
import colors from '../../../styles/colors.module.scss';

export default function Input(props: InputPropsSchema) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div
      style={
        {
          '--color': colors[props.color ?? 'default'],
        } as React.CSSProperties
      }
      className={`${buttonStyles.wrapper} ${
        isFocused || hasValue ? buttonStyles['wrapper--focused'] : ''
      }`}
    >
      <label htmlFor={props.id}>{props.title}</label>

      <div className={buttonStyles.input__container}>
        <input
          // TODO name property?
          id={props.id}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={(event) => {
            if (event.target.value.length > 0) {
              setHasValue(true);
            } else {
              setHasValue(false);
            }

            if (props.onChange) {
              props.onChange(event.target.value);
            }
          }}
          type={props.type ?? 'text'}
        ></input>

        <fieldset>
          <legend>
            <span>{props.title}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
}
