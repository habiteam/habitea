import { getAppLayout } from '@components/AppLayout/AppLayout';
import CategorySelector from '@components/CategorySelector/CategorySelector';
import { useState } from 'react';

export default function Activity() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  return (
    <>
      <h2>Select category</h2>
      <CategorySelector
        value={selectedCategoryId}
        onSelect={(category) => setSelectedCategoryId(category.id)}
      ></CategorySelector>
    </>
  );
}

Activity.getLayout = getAppLayout;
