import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { useAtomValue } from 'jotai';
import Dialog from '../../common/components/Dialog/Dialog';
import Input from '../../common/components/Input/Input';
import { getAppLayout } from '../AppLayout/AppLayout';
import { activityCategoriesMock } from './categories.mocks';
import CategoriesItem from './CategoriesItem/CategoriesItem';
import styles from './CategoriesLayout.module.scss';
import {
  MOBILE_BREAKPOINT,
  screenWidth,
} from '../../common/atoms/screen-width';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export function CreateDialog({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
}: {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
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
  );
}

export default function CategoriesLayout(props: AppLayoutProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const width = useAtomValue(screenWidth);

  return (
    <div className={styles.layout}>
      {(width > MOBILE_BREAKPOINT || !router.query.id) && (
        <aside>
          <div className={styles.headline}>Categories</div>
          <button
            className={styles['add-button']}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} width={14}></FontAwesomeIcon>
            Add category
          </button>

          <CreateDialog
            isCreateDialogOpen={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
          ></CreateDialog>

          <ul className={styles.list}>
            {activityCategoriesMock.map((category, i) => (
              <li key={i}>
                <CategoriesItem {...category}></CategoriesItem>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {(width > MOBILE_BREAKPOINT || router.query.id) && (
        <main>{props.children}</main>
      )}
    </div>
  );
}

export function getCategoriesLayout(page: ReactElement) {
  return getAppLayout(<CategoriesLayout>{page}</CategoriesLayout>);
}
