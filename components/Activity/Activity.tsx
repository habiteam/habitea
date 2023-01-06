import Button from '@commonComponents/Button/Button';
import DateInput from '@commonComponents/DateInput/DateInput';
import FullscreenDialog from '@commonComponents/FullscreenDialog/FullscreenDialog';
import Input from '@commonComponents/Input/Input';
import CategorySelector from '@components/CategorySelector/CategorySelector';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivitiesService } from '@services/activities';
import { Timestamp } from 'firebase/firestore';
import { useRef, useState } from 'react';

export default function Activity() {
  const [openActivityModal, setOpenActivityModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ActivityCategory | undefined
  >(undefined);
  const [value, setValue] = useState<number>(1);
  const [duration, setDuration] = useState<string>('00:00:00'); // TODO input for duration
  const [date, setDate] = useState<string>('');
  const buttonRef = useRef(null);

  return (
    <>
      <div style={{ width: 'max-content' }} ref={buttonRef}>
        <Button
          fillType="filled"
          color="info"
          onClick={() => setOpenActivityModal(true)}
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
            text: 'Create',
            fillType: 'regular',
            color: 'primary',
            onClick: () => {
              if (selectedCategory) {
                ActivitiesService.update(
                  {
                    value,
                    duration,
                    activityDate: date
                      ? Timestamp.fromDate(new Date(date))
                      : Timestamp.now(),
                  },
                  selectedCategory,
                );
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

        <div style={{ marginTop: '16px' }}>
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
        </div>

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
