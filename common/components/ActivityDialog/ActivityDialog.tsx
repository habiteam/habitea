import { activityAtom, openActivityModalAtom } from '@atoms/activity-dialog';
import Button from '@commonComponents/Button/Button';
import DateInput from '@commonComponents/DateInput/DateInput';
import DurationInput from '@commonComponents/DurationInput/DurationInput';
import FullscreenDialog from '@commonComponents/FullscreenDialog/FullscreenDialog';
import Input from '@commonComponents/Input/Input';
import CategorySelector from '@components/CategorySelector/CategorySelector';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivitiesService } from '@services/activities';
import { useAddNotification } from '@utils/notifications';
import { Timestamp } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

export default function ActivityDialog() {
  const [openActivityModal, setOpenActivityModal] = useAtom(
    openActivityModalAtom,
  );
  const [activity, setActivity] = useAtom(activityAtom);
  const [selectedCategory, setSelectedCategory] = useState<
    ActivityCategory | undefined
  >(undefined);
  const [value, setValue] = useState<number>(1);
  const [duration, setDuration] = useState<string>('00:00:00'); // TODO input for duration
  const [date, setDate] = useState<string>('');
  const buttonRef = useRef(null);
  const addNotifcation = useAddNotification();

  useEffect(() => {
    if (activity) {
      setSelectedCategory(activity.category);
      setValue(activity.value);
      setDuration(activity.duration);
      setDate(activity.activityDate.toDate().toISOString().split('T')[0]);
    } else {
      setSelectedCategory(undefined);
      setValue(1);
      setDuration('00:00:00');
      setDate('');
    }
  }, [activity]);

  return (
    <>
      <div style={{ width: 'max-content' }} ref={buttonRef}>
        <Button
          fillType="filled"
          color="info"
          onClick={() => {
            setActivity(null);
            setOpenActivityModal(true);
          }}
        >
          Start Activity
        </Button>
      </div>

      <FullscreenDialog
        anchorRef={buttonRef}
        title="Start Activity"
        open={openActivityModal}
        handleClose={() => setOpenActivityModal(false)}
        actions={[
          {
            text: 'Cancel',
            fillType: 'regular',
            color: 'primary',
            onClick: () => {
              setOpenActivityModal(false);
            },
          },
          {
            text: activity ? 'Update' : 'Create',
            fillType: 'regular',
            color: 'primary',
            onClick: () => {
              if (selectedCategory) {
                ActivitiesService.update(
                  {
                    id: activity?.id,
                    value,
                    duration,
                    activityDate: date
                      ? Timestamp.fromDate(new Date(date))
                      : Timestamp.now(),
                  },
                  selectedCategory,
                );
                addNotifcation({
                  message: 'Activity updated',
                  type: 'success',
                });
                setOpenActivityModal(false);
              }
            },
          },
        ]}
      >
        <h4>Select category</h4>

        <CategorySelector
          value={selectedCategory?.id}
          onSelect={(category) => setSelectedCategory(category)}
        ></CategorySelector>

        {selectedCategory && (
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {selectedCategory.unitType === 'QUANTITY' ? (
              <>
                <Input
                  title="Value"
                  id="value"
                  name="value"
                  value={value}
                  type="number"
                  onChange={(e) => setValue(Number(e.target.value))}
                  color="primary"
                  style={{ width: '200px' }}
                ></Input>
                <span>
                  of {selectedCategory?.goalValue} {selectedCategory?.unit}
                </span>
              </>
            ) : (
              <>
                <DurationInput
                  id="duration"
                  name="duration"
                  title="Duration"
                  value={duration}
                  style={{ width: '200px' }}
                  onChange={(e) => setDuration(e.target.value)}
                ></DurationInput>
                <span>of {selectedCategory?.duration}</span>
              </>
            )}
          </div>
        )}

        <div style={{ marginTop: '16px' }}>
          <DateInput
            label="Date"
            value={date}
            onSelect={(val) => setDate(val)}
          ></DateInput>
        </div>
      </FullscreenDialog>
    </>
  );
}
