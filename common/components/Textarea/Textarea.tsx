import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.scss';
import { Color } from '../../constants/Palette';

export interface TextareaPropsSchema
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  title: string;
  disabled?: boolean;
  color?: Color;
  value?: string;
  id: string;
}

export default function Textarea(props: TextareaPropsSchema) {
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
        {props.title}
        {props.required && '*'}
      </label>

      <div className={styles.textarea__container}>
        <textarea
          name={props.name}
          value={props.value}
          id={props.id}
          required={props.required}
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
          rows={props.rows}
        ></textarea>

        <fieldset>
          <legend>
            <span>{props.title}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
}
