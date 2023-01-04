import NextLink from 'next/link';
import React from 'react';
import { UrlObject } from 'url';
import { Color } from '@constants/palette';
import styles from './Link.module.scss';

export interface LinkPropSchema {
  children: React.ReactNode;
  href: string | UrlObject;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  disabled?: boolean;
  color?: Color;
}

export default function Link(props: LinkPropSchema) {
  return (
    <NextLink href={props.href} legacyBehavior>
      <a
        target={props.target}
        rel={props.rel}
        className={`${styles.link} ${
          styles[`link--${props.color ?? 'default'}`]
        }`}
      >
        {props.children}
      </a>
    </NextLink>
  );
}
