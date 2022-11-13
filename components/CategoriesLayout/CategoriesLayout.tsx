import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState, useEffect } from 'react';
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
import Select from '../../common/components/Select/Select';
import Textarea from '../../common/components/Textarea/Textarea';
import { ActivityCategory } from '../../common/schemas/activity-category';
import { ActivityCategoriesService } from '../../common/services/activity-categories';
import { auth } from '../../common/services/firebase';

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
  const [form, setForm] = useState<Partial<ActivityCategory>>({
    name: '',
    description: '',
    status: 'ACTIVE',
    goalValue: '1',
    goalType: 'MIN',
    repeatType: 'DAILY',
    unit: '',
  });

  function handleFormChange(event: any) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSelectFormChange(value: any, name: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    setForm({
      name: '',
      description: '',
      status: 'ACTIVE',
      goalValue: '1',
      goalType: 'MIN',
      repeatType: 'DAILY',
      unit: '',
    });
  }, [isCreateDialogOpen]);

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
            ActivityCategoriesService.create(form);
            setIsCreateDialogOpen(false);
          },
        },
      ]}
    >
      <form className={styles.form}>
        <Input
          title="Name"
          id="name"
          name="name"
          value={form.name}
          onChange={handleFormChange}
          required
          autoFocus
          color="primary"
        ></Input>
        <Textarea
          title="Description"
          id="description"
          name="description"
          value={form.description}
          onChange={handleFormChange}
          color="primary"
          rows={6}
        ></Textarea>
        <Input
          title="Goal"
          id="goalValue"
          name="goalValue"
          value={form.goalValue?.toLocaleString()}
          onChange={handleFormChange}
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
        ></Input>
        <Input
          title="Unit"
          id="unit"
          name="unit"
          value={form.unit}
          onChange={handleFormChange}
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
        ></Input>
        <Select
          title="Goal Type"
          id="goalType"
          name="goalType"
          value={form.goalType}
          onChange={(val) => handleSelectFormChange(val, 'goalType')}
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
          options={{ MIN: 'Minimum', MAX: 'Maximum' }}
        ></Select>
        <Select
          title="Repeats"
          id="repeatType"
          name="repeatType"
          value={form.repeatType}
          onChange={(val) => handleSelectFormChange(val, 'repeatType')}
          color="primary"
          options={{ DAILY: 'Daily', WEEKLY: 'Weekly', MONTHLY: 'Monthly' }}
        ></Select>
        <Input
          title="Valid from"
          id="validFrom"
          name="validFrom"
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
        ></Input>
        <Input
          title="Valid to"
          id="validTo"
          name="validTo"
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
        ></Input>
      </form>
    </Dialog>
  );
}

export default function CategoriesLayout(props: AppLayoutProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const router = useRouter();
  const width = useAtomValue(screenWidth);

  function updateCategoriesList() {
    if (auth.currentUser) {
      ActivityCategoriesService.getByUserId(auth.currentUser.uid).then(
        (response) => {
          setcategoryList(response);
        },
      );
    }
  }

  useEffect(() => {
    updateCategoriesList();
  }, []);

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
            setIsCreateDialogOpen={(value) => {
              updateCategoriesList();
              setIsCreateDialogOpen(value);
            }}
          ></CreateDialog>

          <ul className={styles.list}>
            {categoryList.map((category, i) => (
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
