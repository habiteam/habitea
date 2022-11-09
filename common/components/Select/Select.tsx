import { useState } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { Color } from '../../constants/Palette';

export interface InputPropsSchema
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  disabled?: boolean;
  color?: Color;
  type?: 'text' | 'password';
  options: { [key: string]: string };
}

export default function Select(props: InputPropsSchema) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  // const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectValue, setSelectValue] = useState('');

  return (
    <>
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
          {props.title}
          {props.required && '*'}
        </label>

        <div className={styles.input__container}>
          <input
            name={props.name}
            value={selectValue}
            id={props.id}
            required={props.required}
            onClick={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              // 😬️😬️😬️ hackish: closing options too quickly prevents onClick from trigering on option item
              setTimeout(() => {
                setIsFocused(false);
              }, 250);
            }}
            onChange={(event) => {
              if (selectValue.length > 0) {
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
        <div className={styles['options-wrapper']}>
          <div
            className={classNames(styles.options, {
              [styles['options--visible']]: isFocused,
            })}
          >
            {/* TODO make options keyboard accessible */}
            {Object.keys(props.options).map((key, i) => (
              <div
                onClick={() => {
                  console.log(props.options[key]);
                  setSelectValue(props.options[key]);
                  setIsFocused(false);
                  setHasValue(true);
                }}
                className={classNames(styles.option)}
                key={i}
              >
                {props.options[key]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
