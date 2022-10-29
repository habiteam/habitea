import React, { useState } from 'react';
import buttonStyles from './Input.module.scss';
import { InputPropsSchema } from './Input.schema';

export default function Input(props: InputPropsSchema) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div
      className={`${buttonStyles.wrapper} ${
        isFocused || hasValue ? buttonStyles['wrapper--focused'] : ''
      }`}
    >
      <label htmlFor={props.id}>{props.title}</label>
      <div className={buttonStyles.input__container}>
        <input
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

            props.onChange(event.target.value);
          }}
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
