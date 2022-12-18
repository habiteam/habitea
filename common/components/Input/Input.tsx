import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Color } from '@constants/palette';
import styles from './Input.module.scss';

export interface InputPropsSchema
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  disabled?: boolean;
  color?: Color;
  type?: 'text' | 'password' | 'number';
  value?: string;
  id: string;
}

export default function Input(props: InputPropsSchema) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (props.value && props.value?.length > 0) {
      setHasValue(true);
    }
  }, []);

  return (
    <div
      style={{
        ...props.style,
      }}
      className={classNames(styles.wrapper, {
        [styles['wrapper--focused']]: isFocused,
        [styles['wrapper--touched']]: hasValue,
      })}
    >
      <label htmlFor={props.id}>
        {props?.title}
        {props.required && '*'}
      </label>

      <div className={styles.input__container}>
        <input
          name={props.name}
          value={props.value}
          id={props.id}
          required={props.required}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={(event) => {
            if (props.onBlur) {
              props.onBlur(event);
            }

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
