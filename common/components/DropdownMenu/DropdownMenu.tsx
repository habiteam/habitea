import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Color } from '@constants/palette';
import styles from './DropdownMenu.module.scss';

export interface DropdownMenuItem {
  text: string;
  icon?: IconDefinition;
  image?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: DropdownMenuItem[];
  color?: Color;
  children?: React.ReactNode;
}

function DropdownItem(props: { item: DropdownMenuItem }) {
  return (
    <>
      {props.item.image && (
        <Image
          className={styles['dropdown-item-avatar']}
          src={props.item.image}
          alt={props.item.text}
          width={16}
          height={16}
        ></Image>
      )}
      {props.item.icon && (
        <FontAwesomeIcon icon={props.item.icon}></FontAwesomeIcon>
      )}
      {props.item.text}
    </>
  );
}

export default function DropdownMenu(props: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        props.onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {props.isOpen && (
        <div className={styles.dropdown}>
          {props.children}
          <ul
            ref={dropdownRef}
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
