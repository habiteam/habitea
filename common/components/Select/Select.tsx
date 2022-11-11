import { CSSProperties, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { Color } from '../../constants/Palette';

export interface SelectPropsSchema {
  title: string;
  disabled?: boolean;
  color?: Color;
  type?: 'text' | 'password';
  options: { [key: string]: string };
  id: string;
  name?: string;
  onChange?: (key: string) => void;
  style?: CSSProperties | undefined;
  required?: boolean;
}

export default function Select(props: SelectPropsSchema) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  function getHighlightedText(text: string) {
    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={i} className={styles.highlighted}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // props.onClose();
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    function handleTabPress(event: KeyboardEvent) {
      if (event.code === 'Tab') {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsFocused(false);
        }
      }
    }
    document.addEventListener('keyup', handleTabPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keyup', handleTabPress);
    };
  }, [ref]);

  return (
    <>
      <div
        ref={ref}
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
            value={isFocused ? searchValue : selectValue}
            id={props.id}
            autoComplete="off"
            required={props.required}
            onFocus={() => {
              setIsFocused(true);
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);

              if (selectValue.length > 0) {
                setHasValue(true);
              } else {
                setHasValue(false);
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
            {Object.keys(props.options)
              .filter(
                (key) =>
                  props.options[key]
                    .toLocaleLowerCase()
                    .indexOf(searchValue.toLocaleLowerCase()) !== -1,
              )
              .map((key, i) => (
                <button
                  onClick={() => {
                    if (props.onChange) {
                      props.onChange(key);
                    }
                    setSelectValue(props.options[key]);
                    setIsFocused(false);
                    setHasValue(true);
                  }}
                  className={classNames(styles.option)}
                  key={i}
                >
                  {getHighlightedText(props.options[key])}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
