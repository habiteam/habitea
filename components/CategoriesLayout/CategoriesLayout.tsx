import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import Dialog from '../../common/components/Dialog/Dialog';
import { getAppLayout } from '../AppLayout/AppLayout';
import { activityCategoriesMock } from './categories.mocks';
import CategoriesItem from './CategoriesItem/CategoriesItem';
import styles from './CategoriesLayout.module.scss';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function CategoriesLayout(props: AppLayoutProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  return (
    <div className={styles.layout}>
      <aside>
        <div className={styles.headline}>Categories</div>
        <button
          className={styles['add-button']}
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} width={14}></FontAwesomeIcon>
          Add category
        </button>
        <Dialog
          open={isCreateDialogOpen}
          handleClose={() => setIsCreateDialogOpen(false)}
        >
          Basic dialog title Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nulla quam ut laudantium. Expedita, repudiandae id reprehenderit
          veniam, reiciendis minus eligendi deserunt tempore pariatur numquam
          quae delectus error, repellendus quia minima.
        </Dialog>
        <ul className={styles.list}>
          {activityCategoriesMock.map((category, i) => (
            <li key={i}>
              <CategoriesItem {...category}></CategoriesItem>
            </li>
          ))}
        </ul>
      </aside>
      <main>{props.children}</main>
    </div>
  );
}

export function getCategoriesLayout(page: ReactElement) {
  return getAppLayout(<CategoriesLayout>{page}</CategoriesLayout>);
}
