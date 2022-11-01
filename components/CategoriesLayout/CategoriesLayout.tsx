import React, { ReactElement } from 'react';
import { getAppLayout } from '../AppLayout/AppLayout';
import styles from './CategoriesLayout.module.scss';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function CategoriesLayout(props: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <h1>Categories</h1>
      <div className={styles['categories-wrapper']}>
        <div className={styles['categories-list']}></div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export function getCategoriesLayout(page: ReactElement) {
  return getAppLayout(<CategoriesLayout>{page}</CategoriesLayout>);
}
