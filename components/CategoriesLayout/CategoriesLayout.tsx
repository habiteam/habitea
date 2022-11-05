import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import Dialog from '../../common/components/Dialog/Dialog';
import Input from '../../common/components/Input/Input';
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
          title="Create new category"
          open={isCreateDialogOpen}
          handleClose={() => setIsCreateDialogOpen(false)}
          actions={[
            {
              text: 'Cancel',
              fillType: 'regular',
              color: 'primary',
              onClick: () => {
                setIsCreateDialogOpen(false);
              },
            },
            {
              text: 'Create',
              fillType: 'regular',
              color: 'primary',
              onClick: () => {
                setIsCreateDialogOpen(false);
              },
            },
          ]}
        >
          <form className={styles.form}>
            <Input
              title="Name"
              id="name"
              required
              autoFocus
              color="primary"
            ></Input>
            <Input title="Description" id="description" color="primary"></Input>
            <Input
              title="Goal"
              id="goal"
              style={{ width: 'calc(50% - 6px)' }}
              color="primary"
            ></Input>
            <Input
              title="Goal Unit"
              id="goalUnit"
              style={{ width: 'calc(50% - 6px)' }}
              color="primary"
            ></Input>
            <Input
              title="Goal Type"
              id="goalType"
              style={{ width: 'calc(50% - 6px)' }}
              color="primary"
            ></Input>
            <Input title="Repeats" id="repeats" color="primary"></Input>
            <Input
              title="Valid from"
              id="validFrom"
              style={{ width: 'calc(50% - 6px)' }}
              color="primary"
            ></Input>
            <Input
              title="Valid to"
              id="validTo"
              style={{ width: 'calc(50% - 6px)' }}
              color="primary"
            ></Input>
          </form>
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
