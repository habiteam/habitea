import Button from '@commonComponents/Button/Button';
import FullscreenDialog from '@commonComponents/FullscreenDialog/FullscreenDialog';
import Input from '@commonComponents/Input/Input';
import CategorySelector from '@components/CategorySelector/CategorySelector';
import { ActivitiesService } from '@services/activities';
import { useRef, useState } from 'react';

export default function Activity() {
  const [openActivityModal, setOpenActivityModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [value, setValue] = useState<string>('');
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
              ActivitiesService.create({
                value,
                categoryRef: selectedCategoryId,
              });
              setOpenActivityModal(false);
            },
          },
        ]}
      >
        <h4>Select category</h4>
        <CategorySelector
          value={selectedCategoryId}
          onSelect={(category) => setSelectedCategoryId(category.id)}
        ></CategorySelector>
        <div style={{ marginTop: '16px' }}>
          <Input
            title="Value"
            id="value"
            name="value"
            value={value}
            type="number"
            onChange={(e) => setValue(e.target.value)}
            color="primary"
            style={{ width: '200px' }}
          ></Input>
        </div>
      </FullscreenDialog>
    </>
  );
}
