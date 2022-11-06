import NextLink from 'next/link';
import React from 'react';
import { UrlObject } from 'url';
import styles from './Link.module.scss';
import { Color } from '../../constants/Palette';

export interface LinkPropSchema {
  children: React.ReactNode;
  href: string | UrlObject;
  disabled?: boolean;
  color?: Color;
}

export default function Link(props: LinkPropSchema) {
  return (
    <NextLink href={props.href} legacyBehavior>
      <a
        className={`${styles.link} ${
          styles[`link--${props.color ?? 'default'}`]
        }`}
      >
        {props.children}
      </a>
    </NextLink>
  );
}
