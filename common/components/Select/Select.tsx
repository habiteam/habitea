import { CSSProperties, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Color } from '@constants/palette';
import styles from './Select.module.scss';

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
  value?: string;
  className?: string | undefined;
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
    if (props.value && props.value?.length > 0) {
      setSelectValue(props.options[props.value]);
      setHasValue(true);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // props.onClose();
        setIsFocused(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    function handleTabPress(event: KeyboardEvent) {
      if (event.code === 'Tab') {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsFocused(false);
        }
      }
    }
    document.addEventListener('keyup', handleTabPress);

    return () => {
      document.removeEventListener('click', handleClickOutside);
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
        className={classNames(props.className, styles.wrapper, {
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
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (props.onChange) {
                      props.onChange(key);
                    }
                    setSelectValue(props.options[key]);
                    setIsFocused(false);
                    setHasValue(true);
                  }}
                  className={classNames(styles.option, {
                    [styles['option--selected']]:
                      selectValue === props.options[key],
                  })}
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
