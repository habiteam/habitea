import {
  faHandshake,
  faMound,
  faPersonBiking,
  faPersonRunning,
} from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement } from 'react';
import Chip from '../../common/components/Chip/Chip';
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
        <div className={styles['categories-list']}>
          <Chip text="Bieganie" icon={faPersonRunning} color="primary"></Chip>
          <Chip
            text="Jazda na rowerze Jazda na rowerze Jazda na rowerze Jazda na rowerze Jazda na rowerze Jazda na rowerze Jazda na rowerze Jazda na rowerze Jazda na rowerze Jazda na rowerze Jazda na rowerze"
            icon={faPersonBiking}
            color="primary"
          ></Chip>
          <Chip text="Sraka" icon={faMound} color="primary"></Chip>
          <Chip text="Spotkania" icon={faHandshake} color="primary"></Chip>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export function getCategoriesLayout(page: ReactElement) {
  return getAppLayout(<CategoriesLayout>{page}</CategoriesLayout>);
}
