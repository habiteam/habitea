import {
  faCode,
  faHandshake,
  faMound,
  faMusic,
  faPersonBiking,
  faPersonRunning,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement } from 'react';
import Chip from '../../common/components/Chip/Chip';
import { getAppLayout } from '../AppLayout/AppLayout';
import styles from './CategoriesLayout.module.scss';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function CategoriesLayout(props: AppLayoutProps) {
  const chips = [];

  for (let i = 0; i < 10; i += 1) {
    chips.push(
      <>
        <Chip text="Running" icon={faPersonRunning} color="default"></Chip>
        <Chip text="Bike" icon={faPersonBiking} color="primary"></Chip>
        <Chip text="Poop" icon={faMound} color="warning"></Chip>
        <Chip text="Meetings" icon={faHandshake} color="danger"></Chip>
        <Chip text="Music" icon={faMusic} color="success"></Chip>
        <Chip text="Coding" icon={faCode} color="info"></Chip>
      </>,
    );
  }

  return (
    <div className={styles.layout}>
      <h1>Categories</h1>
      <div className={styles['categories-wrapper']}>
        <div className={styles['categories-list']}>
          {chips}
          <Chip text="Add new category" icon={faPlus} color="primary"></Chip>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export function getCategoriesLayout(page: ReactElement) {
  return getAppLayout(<CategoriesLayout>{page}</CategoriesLayout>);
}
