import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { getAppLayout } from '../AppLayout/AppLayout';
import { activityCategoriesMock } from './categories.mocks';
import styles from './CategoriesLayout.module.scss';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function CategoriesLayout(props: AppLayoutProps) {
  const router = useRouter();
  const categoriesRender: any[] = [];

  activityCategoriesMock.forEach((category, i) => {
    const href = `/app/categories/${category.id}`;

    categoriesRender.push(
      <li key={i}>
        <Link
          className={classNames(
            styles['categories-list-item'],
            router.asPath.indexOf(href) !== -1
              ? styles['categories-list-item--active']
              : '',
          )}
          href={href}
        >
          {category.icon && (
            <FontAwesomeIcon
              icon={findIconDefinition({
                prefix: 'fas',
                iconName: category.icon,
              })}
              width={14}
            ></FontAwesomeIcon>
          )}
          <span>{category.name}</span>
        </Link>
      </li>,
    );
  });

  return (
    <div className={styles.layout}>
      <div className={styles['categories-list-container']}>
        <div className={styles['categories-headline']}>Categories</div>
        <button className={styles['categories-list-create-button']}>
          <FontAwesomeIcon icon={faPlus} width={14}></FontAwesomeIcon>
          Add category
        </button>
        <ul className={styles['categories-list']}> {categoriesRender}</ul>
      </div>
      <div className={styles['category-wrapper']}>{props.children}</div>
    </div>
  );
}

export function getCategoriesLayout(page: ReactElement) {
  return getAppLayout(<CategoriesLayout>{page}</CategoriesLayout>);
}
