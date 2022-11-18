import NextLink from 'next/link';
import React from 'react';
import { UrlObject } from 'url';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Color } from '@constants/Palette';
import styles from './NavLink.module.scss';

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
        className={classNames(
          styles.link,
          styles[`link--${props.color ?? 'default'}`],
          router.pathname.indexOf(props.href as string) !== -1
            ? styles['link--active']
            : '',
        )}
      >
        {router.pathname.indexOf(props.href as string) !== -1 &&
        props.activeIcon ? (
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
