import { useState } from 'react';
import buttonStyles from './Input.module.scss';
import colors from '../../../styles/colors.module.scss';
import { Color } from '../../constants/Color';

export interface InputPropsSchema
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  disabled?: boolean;
  color?: Color;
  type?: 'text' | 'password';
  value?: string;
}

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
          name={props.name}
          value={props.value}
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
              props.onChange(event);
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
