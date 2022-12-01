import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { onAuthStateChanged } from 'firebase/auth';
import Input from '@commonComponents/Input/Input';
import Select from '@commonComponents/Select/Select';
import Textarea from '@commonComponents/Textarea/Textarea';
import { ActivityCategoryCreateFormType } from '@schemas/activity-category';
import { ActivityCategoriesService } from '@services/activity-categories';
import { auth } from '@services/firebase';
import {
  ActivityCategoryGoalTypeOptions,
  ActivityCategoryRepeatTypeOptions,
  ActivityUnitTypeOptions,
} from '@constants/dictionaries';
import ResponsiveDialog from '@commonComponents/ResponsiveDialog/ResponsiveDialog';
import DurationInput from '@commonComponents/DurationInput/DurationInput';
import { getSecondsFromDuration, toDurationString } from '@utils/duration';
import notifications from '@atoms/notifications';
import { generateUUID } from '@utils/uuid';
import { categoryListReloader } from '@atoms/reloaders';
import { getAppLayout } from '../AppLayout/AppLayout';
import CategoriesItem from './CategoriesItem/CategoriesItem';
import styles from './CategoriesLayout.module.scss';
import { MOBILE_BREAKPOINT, screenWidth } from '../../common/atoms/screen';
import CategoryIconSelector from './CategoryIconSelector/CategoryIconSelector';

export interface AppLayoutProps {
  children: React.ReactNode;
}

const defaultCreateValues: ActivityCategoryCreateFormType = {
  name: '',
  icon: 'person-running',
  description: '',
  status: 'ACTIVE',
  goalValue: '0',
  goalType: 'MIN',
  repeatType: 'DAILY',
  unit: '',
  unitType: 'QUANTITY',
  duration: '00:00:00',
  validFrom: '',
  validTo: '',
};

export function CreateDialog({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
}: {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form, setForm] =
    useState<ActivityCategoryCreateFormType>(defaultCreateValues);

  const setNotificationsAtom = useSetAtom(notifications);

  function handleFormChange(event: any) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSelectFormChange(value: any, name: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const createCategory = () => {
    const tempForm = form;

    if (tempForm.name.length === 0) {
      setNotificationsAtom((values) => [
        ...values,
        {
          id: generateUUID(),
          message: "Can't create category without a name",
          type: 'danger',
        },
      ]);
      return;
    }

    // fallback safety for duration
    if (tempForm.duration) {
      tempForm.duration = toDurationString(
        Math.max(0, getSecondsFromDuration(tempForm.duration)),
      );
    }

    ActivityCategoriesService.create(form);
    setIsCreateDialogOpen(false);
  };

  useEffect(() => {
    setForm(defaultCreateValues);
  }, [isCreateDialogOpen]);

  return (
    <ResponsiveDialog
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
          onClick: createCategory,
        },
      ]}
    >
      <form className={styles.form}>
        <CategoryIconSelector
          value={form.icon ?? 'person-running'}
          style={{ width: 'calc(10% - 6px)' }}
          onSelect={(icon) => setForm((prev) => ({ ...prev, icon }))}
        ></CategoryIconSelector>

        <Input
          title="Name"
          id="name"
          name="name"
          value={form.name}
          onChange={handleFormChange}
          style={{ width: 'calc(90% - 6px)' }}
          required
          autoFocus
          color="primary"
          className={styles.control}
        ></Input>

        <Textarea
          title="Description"
          id="description"
          name="description"
          value={form.description}
          onChange={handleFormChange}
          color="primary"
          rows={6}
          className={styles.control}
        ></Textarea>

        <Select
          title="Unit type"
          id="unitType"
          name="unitType"
          value={form.unitType}
          onChange={(val) => handleSelectFormChange(val, 'unitType')}
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
          options={ActivityUnitTypeOptions}
          className={styles.control}
        ></Select>

        {form.unitType === 'QUANTITY' ? (
          <>
            <Input
              title="Unit"
              id="unit"
              name="unit"
              value={form.unit}
              onChange={handleFormChange}
              style={{ width: 'calc(50% - 6px)' }}
              color="primary"
              className={styles.control}
            ></Input>
            <Input
              title="Goal"
              id="goalValue"
              name="goalValue"
              value={form.goalValue?.toLocaleString()}
              onChange={handleFormChange}
              style={{ width: 'calc(50% - 6px)' }}
              color="primary"
              className={styles.control}
            ></Input>
          </>
        ) : (
          <>
            <div style={{ width: 'calc(50% - 6px)' }}></div>
            <DurationInput
              id="duration"
              name="duration"
              title="Duration"
              value={form.duration}
              style={{ width: 'calc(50% - 6px)' }}
              onChange={handleFormChange}
            ></DurationInput>
          </>
        )}

        <Select
          title="Repeats"
          id="repeatType"
          name="repeatType"
          value={form.repeatType}
          onChange={(val) => handleSelectFormChange(val, 'repeatType')}
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
          options={ActivityCategoryRepeatTypeOptions}
          className={styles.control}
        ></Select>

        <Select
          title="Goal Type"
          id="goalType"
          name="goalType"
          value={form.goalType}
          onChange={(val) => handleSelectFormChange(val, 'goalType')}
          color="primary"
          options={ActivityCategoryGoalTypeOptions}
          className={styles.control}
        ></Select>

        <Input
          title="Valid from"
          id="validFrom"
          name="validFrom"
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
          className={styles.control}
        ></Input>

        <Input
          title="Valid to"
          id="validTo"
          name="validTo"
          style={{ width: 'calc(50% - 6px)' }}
          color="primary"
          className={styles.control}
        ></Input>
      </form>
    </ResponsiveDialog>
  );
}

export default function CategoriesLayout(props: AppLayoutProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const router = useRouter();
  const width = useAtomValue(screenWidth);
  const categoryListReloaderValue = useAtomValue(categoryListReloader);

  function updateCategoriesList() {
    if (auth.currentUser) {
      ActivityCategoriesService.getByUserId(auth.currentUser.uid).then(
        (response) => {
          setCategoryList(response);
        },
      );
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      updateCategoriesList(),
    );
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (categoryListReloaderValue) {
      updateCategoriesList();
    }
  }, [categoryListReloaderValue]);

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
