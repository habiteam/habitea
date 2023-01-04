import {
  findIconDefinition,
  IconName,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { SELECTABLE_ICONS } from '@utils/fontawesome-icons';
import Input from '@commonComponents/Input/Input';
import styles from './CategoryIconSelector.module.scss';

export interface CategoryIconSelectorPropSchema {
  value: IconName;
  style?: CSSProperties;
  onSelect: (value: IconName) => void;
}

export default function CategoryIconSelector(
  props: CategoryIconSelectorPropSchema,
) {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [iconsFilter, setIconsFilter] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsMenuOpened(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div style={props.style} ref={ref}>
      <button
        className={classNames(styles['selector-button-container'])}
        onClick={(event) => {
          event.preventDefault();
          setIsMenuOpened(!isMenuOpened);
        }}
      >
        <FontAwesomeIcon
          className={classNames(styles['selector-button'], {
            [styles['selector-button--focued']]: isMenuOpened,
          })}
          icon={findIconDefinition({
            prefix: 'fas',
            iconName: props.value,
          })}
        ></FontAwesomeIcon>
      </button>
      {isMenuOpened && (
        <div className={styles['icons-wrapper']}>
          <Input
            title="Search"
            id={'iconsFilter'}
            onChange={(e) => {
              setIconsFilter(e.target.value);
            }}
          ></Input>
          <div className={classNames(styles.icons)}>
            {SELECTABLE_ICONS.map((icon, i) =>
              iconsFilter === '' ||
              icon.match(new RegExp(iconsFilter, 'gi')) ? (
                <FontAwesomeIcon
                  key={i}
                  className={classNames(styles['icon--selectable'], {
                    [styles['icon--selected']]: props.value === icon,
                  })}
                  icon={findIconDefinition({
                    prefix: 'fas',
                    iconName: icon,
                  })}
                  width={20}
                  onClick={() => {
                    props.onSelect(icon);
                    setIsMenuOpened(!isMenuOpened);
                  }}
                ></FontAwesomeIcon>
              ) : null,
            )}
          </div>
        </div>
      )}
    </div>
  );
}
