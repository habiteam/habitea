import { activityAtom } from '@atoms/activity-dialog';
import { activityReloader } from '@atoms/reloaders';
import DateInput from '@commonComponents/DateInput/DateInput';
import DurationInput from '@commonComponents/DurationInput/DurationInput';
import FullscreenDialog from '@commonComponents/FullscreenDialog/FullscreenDialog';
import Input from '@commonComponents/Input/Input';
import Stopwatch from '@commonComponents/Stopwatch/Stopwatch';
import Tabs from '@commonComponents/Tabs/Tabs';
import CategorySelector from '@components/CategorySelector/CategorySelector';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivitiesService } from '@services/activities';
import { getDateInputFormatFromDate } from '@utils/date';
import getErrorMessage from '@utils/firebase-error';
import { useAddNotification } from '@utils/notifications';
import { Timestamp } from 'firebase/firestore';
import { useAtomValue, useSetAtom } from 'jotai';
import { MutableRefObject, useEffect, useState } from 'react';

export interface ActivityDialogProps {
  openActivityModal: boolean;
  handleClose: () => void;
  buttonRef?: MutableRefObject<null>;
  selectedCategoryValue?: ActivityCategory;
}

export default function ActivityDialog({
  openActivityModal,
  handleClose,
  buttonRef,
  selectedCategoryValue,
}: ActivityDialogProps) {
  const activity = useAtomValue(activityAtom);
  const [selectedCategory, setSelectedCategory] = useState<
    ActivityCategory | undefined
  >(undefined);
  const [value, setValue] = useState<number>(1);
  const [duration, setDuration] = useState<string>('00:00:00'); // TODO input for duration
  const [date, setDate] = useState<string>(
    getDateInputFormatFromDate(new Date()),
  );
  const [currentTab, setCurrentTab] = useState('Stopwatch');
  const addNotification = useAddNotification();
  const setReloader = useSetAtom(activityReloader);

  useEffect(() => {
    if (activity) {
      setSelectedCategory(activity.category);
      setValue(activity.value);
      setDuration(activity.duration);
      setDate(getDateInputFormatFromDate(activity.activityDate.toDate()));
    } else {
      setSelectedCategory(undefined);
      setValue(1);
      setDuration('00:00:00');
      setDate(getDateInputFormatFromDate(new Date()));
    }
  }, [activity]);

  useEffect(() => {
    setSelectedCategory(selectedCategoryValue);
  }, [selectedCategoryValue]);

  return (
    <>
      <FullscreenDialog
        anchorRef={buttonRef}
        title={activity ? activity.category?.name : 'Start Activity'}
        open={openActivityModal}
        handleClose={() => {
          handleClose();
        }}
        actions={[
          {
            text: 'Cancel',
            fillType: 'regular',
            onClick: () => {
              handleClose();
            },
          },
          {
            text: activity ? 'Update' : 'Create',
            fillType: 'filled',
            onClick: async () => {
              const activityDate = Timestamp.fromDate(new Date(date));

              const activityRequest: Partial<Activity> = {
                id: activity?.id as string,
                value,
                duration,
                activityDate,
              };

              if (selectedCategory) {
                try {
                  await ActivitiesService.update(
                    activityRequest,
                    selectedCategory,
                  );
                  addNotification({
                    message: activity ? 'Activity updated' : 'Activity created',
                    type: 'success',
                  });
                  setReloader(activityRequest);
                  handleClose();
                } catch (e: any) {
                  addNotification({
                    message: getErrorMessage(e),
                    type: 'danger',
                  });
                }
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
          <div>
            {selectedCategory.unitType === 'QUANTITY' ? (
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Input
                  title="Value"
                  id="value"
                  name="value"
                  value={value}
                  type="number"
                  onChange={(e) => setValue(Number(e.target.value))}
                  style={{ width: '200px' }}
                ></Input>
                <span>
                  of {selectedCategory?.goalValue} {selectedCategory?.unit}
                </span>
              </div>
            ) : (
              <div
                style={{
                  marginTop: '16px',
                }}
              >
                <Tabs
                  tabs={[
                    { key: 'Stopwatch', title: 'Stopwatch' },
                    { key: 'Manual', title: 'Manual' },
                  ]}
                  activeTab={currentTab}
                  setActiveTab={(key: string): void => {
                    setCurrentTab(key);
                  }}
                ></Tabs>

                {currentTab === 'Stopwatch' ? (
                  <div
                    style={{
                      marginTop: '16px',
                      maxWidth: '400px',
                    }}
                  >
                    <Stopwatch
                      value={duration}
                      onChange={(stopwatchValue: string) => {
                        setDuration(stopwatchValue);
                      }}
                    ></Stopwatch>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <DurationInput
                      id="duration"
                      name="duration"
                      title="Duration"
                      value={duration}
                      style={{ width: '200px' }}
                      onChange={(e) => setDuration(e.target.value)}
                    ></DurationInput>
                    <span>of {selectedCategory?.duration}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '16px' }}>
          <DateInput
            label="Date"
            value={date}
            onChange={(val) => {
              setDate(val);
            }}
          ></DateInput>
        </div>
      </FullscreenDialog>
    </>
  );
}
