import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DropdownMenu.module.scss';
import { Color } from '../../constants/Color';

export interface DropdownMenuItem {
  text: string;
  icon?: IconDefinition;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: DropdownMenuItem[];
  color?: Color;
}

function DropdownItem(props: { item: DropdownMenuItem }) {
  return (
    <>
      {props.item.icon && (
        <FontAwesomeIcon icon={props.item.icon}></FontAwesomeIcon>
      )}
      {props.item.text}
    </>
  );
}

export default function DropdownMenu(props: DropdownMenuProps) {
  const dialogRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        props.onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dialogRef]);

  return (
    <>
      {props.isOpen && (
        <div className={styles.dropdown}>
          <ul
            ref={dialogRef}
            className={classNames(
              styles['dropdown-list'],
              styles[`dropdown-list--${props.color ?? 'default'}`],
            )}
          >
            {props.items.map((item, i) => (
              <React.Fragment key={i}>
                {item.href ? (
                  <Link href={item.href}>
                    <li>
                      <DropdownItem item={item}></DropdownItem>
                    </li>
                  </Link>
                ) : (
                  <li
                    tabIndex={0}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      props.onClose();
                    }}
                  >
                    <DropdownItem item={item}></DropdownItem>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
