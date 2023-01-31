import NextLink from 'next/link';
import React from 'react';
import { UrlObject } from 'url';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './Contributor.module.scss';

export interface ContributorPropSchema {
  href: string | UrlObject;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  img?: string;
  name: string;
  onMouseEnter: (name: string) => any;
  onMouseLeave: () => any;
}

export default function Contributor(props: ContributorPropSchema) {
  return (
    <NextLink href={props.href} legacyBehavior>
      <a target={props.target} rel={props.rel}>
        <Image
          src={props.img ?? '/cat.jpg'}
          alt={props.name}
          width={200}
          height={200}
          className={classNames(styles.avatar)}
          onMouseEnter={() => props.onMouseEnter(props.name)}
          onMouseLeave={() => props.onMouseLeave()}
        ></Image>
      </a>
    </NextLink>
  );
}
