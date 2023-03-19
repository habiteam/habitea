import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ActivityCategory } from '@schemas/activity-category';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import styles from './CategoriesItem.module.scss';

export default function CategoriesItem(props: ActivityCategory) {
  const router = useRouter();
  const href = `/app/categories/${props.id}`;

  return (
    <Link
      className={classNames(
        styles.item,
        router.asPath.indexOf(href) !== -1 ? styles['item--active'] : '',
      )}
      href={href}
    >
      {props.icon && (
        <FontAwesomeIcon
          icon={findIconDefinition({
            prefix: 'fas',
            iconName: props.icon,
          })}
          width={14}
        ></FontAwesomeIcon>
      )}
      <span>{props.name}</span>
      {props.pinned > 0 && (
        <FontAwesomeIcon
          icon={faThumbtack}
          width={14}
          className={classNames(styles['pinned-icon'])}
        ></FontAwesomeIcon>
      )}
    </Link>
  );
}
