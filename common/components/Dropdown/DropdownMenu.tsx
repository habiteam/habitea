import React, { useEffect, useRef } from 'react';
import { Color } from '@constants/palette';
import styles from './Dropdown.module.scss';

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  color?: Color;
  children?: React.ReactNode;
}

export default function Dropdown(props: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div ref={dropdownRef} className={styles.dropdown}>
          {props.children}
        </div>
      )}
    </>
  );
}
