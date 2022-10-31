import NextLink from 'next/link';
import React from 'react';
import { UrlObject } from 'url';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import styles from './NavLink.module.scss';
import { Color } from '../../constants/Color';

export interface NavLinkPropSchema {
  icon: IconDefinition;
  activeIcon?: IconDefinition;
  text?: string;
  href: string | UrlObject;
  color?: Color;
}

export default function NavLink(props: NavLinkPropSchema) {
  const router = useRouter();

  return (
    <NextLink href={props.href} legacyBehavior>
      <a
        className={`${styles.link} ${
          styles[`link--${props.color ?? 'default'}`]
        } ${router.pathname === props.href ? styles['link--active'] : ''}`}
      >
        {router.pathname === props.href && props.activeIcon ? (
          <FontAwesomeIcon
            className={styles['link-icon']}
            icon={props.activeIcon}
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            className={styles['link-icon']}
            icon={props.icon}
          ></FontAwesomeIcon>
        )}

        {props.text && (
          <span className={styles['link-text']}>{props.text}</span>
        )}
      </a>
    </NextLink>
  );
}
