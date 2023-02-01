import classNames from 'classnames';
import { ActivityCategory } from '@schemas/activity-category';
import { auth } from '@services/firebase';
import { ActivityCategoriesService } from '@services/activity-categories';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  findIconDefinition,
  IconName,
} from '@fortawesome/fontawesome-svg-core';
import getErrorMessage from '@utils/firebase-error';
import { useAddNotification } from '@utils/notifications';
import styles from './CategorySelector.module.scss';

export interface CategorySelectorPropsSchema {
  value?: string;
  onSelect: (category: ActivityCategory) => void;
}

export default function CategorySelector({
  value,
  onSelect,
}: CategorySelectorPropsSchema) {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const addNotifcation = useAddNotification();

  function updateCategoriesList() {
    if (auth.currentUser) {
      ActivityCategoriesService.getActiveByUserId(auth.currentUser.uid)
        .then((response) => {
          setCategoryList(response);
        })
        .catch((error) => {
          addNotifcation({ message: getErrorMessage(error), type: 'danger' });
        });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => updateCategoriesList());
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className={classNames(styles['category-wrapper'])}>
        {categoryList.map((category: ActivityCategory, i) => (
          <button
            className={classNames(styles.category, {
              [styles['category--selected']]: value === category.id,
            })}
            key={i}
            onClick={() => onSelect(category)}
          >
            <FontAwesomeIcon
              icon={findIconDefinition({
                prefix: 'fas',
                iconName: category.icon as IconName,
              })}
              width={48}
            ></FontAwesomeIcon>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}
