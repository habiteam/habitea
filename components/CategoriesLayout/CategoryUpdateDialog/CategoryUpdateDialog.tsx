import Input from '@commonComponents/Input/Input';
import Select from '@commonComponents/Select/Select';
import Textarea from '@commonComponents/Textarea/Textarea';
import {
  ActivityCategory,
  ActivityCategoryCreateFormType,
} from '@schemas/activity-category';
import {
  ActivityCategoryGoalTypeOptions,
  ActivityCategoryRepeatTypeOptions,
  ActivityUnitTypeOptions,
} from '@constants/dictionaries';
import ResponsiveDialog from '@commonComponents/ResponsiveDialog/ResponsiveDialog';
import DurationInput from '@commonComponents/DurationInput/DurationInput';
import { getSecondsFromDuration, toDurationString } from '@utils/duration';
import { useEffect, useState } from 'react';
import { ActivityCategoriesService } from '@services/activity-categories';
import { useAddNotification } from '@utils/notifications';
import CategoryIconSelector from './CategoryIconSelector/CategoryIconSelector';
import styles from './CategoryUpdateDialog.module.scss';

const defaultCreateValues: ActivityCategoryCreateFormType = {
  id: '',
  name: '',
  icon: 'person-running',
  description: '',
  status: 'ACTIVE',
  goalValue: 0,
  goalType: 'MIN',
  repeatType: 'DAILY',
  unit: '',
  unitType: 'QUANTITY',
  duration: '00:00:00',
};

export function CategoryUpdateDialog({
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  activityCategory,
}: {
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityCategory?: ActivityCategory;
}) {
  const [form, setForm] = useState<ActivityCategoryCreateFormType>(
    activityCategory ?? defaultCreateValues,
  );

  const addNotifcation = useAddNotification();

  function handleFormChange(event: any) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSelectFormChange(value: any, name: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const updateCategory = () => {
    const tempForm = form;

    if (tempForm.name.length === 0) {
      addNotifcation({
        message: "Can't create category without a name",
        type: 'danger',
      });
      return;
    }

    // fallback safety for duration
    if (tempForm.duration) {
      tempForm.duration = toDurationString(
        Math.max(0, getSecondsFromDuration(tempForm.duration)),
      );
    }

    ActivityCategoriesService.update(form);
    setIsUpdateDialogOpen(false);
  };

  useEffect(() => {
    setForm(activityCategory ?? defaultCreateValues);
  }, [isUpdateDialogOpen, activityCategory]);

  return (
    <ResponsiveDialog
      title={activityCategory?.id ? 'Edit category' : 'Create new category'}
      open={isUpdateDialogOpen}
      handleClose={() => setIsUpdateDialogOpen(false)}
      actions={[
        {
          text: 'Cancel',
          fillType: 'regular',
          color: 'primary',
          onClick: () => {
            setIsUpdateDialogOpen(false);
          },
        },
        {
          text: activityCategory?.id ? 'Edit' : 'Create',
          fillType: 'filled',
          color: 'primary',
          onClick: updateCategory,
        },
      ]}
    >
      <form className={styles.form}>
        <CategoryIconSelector
          value={form.icon ?? 'person-running'}
          style={{ width: 'calc(13% - 6px)' }}
          onSelect={(icon) => setForm((prev) => ({ ...prev, icon }))}
        ></CategoryIconSelector>

        <Input
          title="Name"
          id="name"
          name="name"
          value={form.name}
          onChange={handleFormChange}
          style={{ width: 'calc(87% - 6px)' }}
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
              type="number"
              value={form.goalValue}
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
      </form>
    </ResponsiveDialog>
  );
}
