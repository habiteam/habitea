import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityCategoriesService } from '@services/activity-categories';
import { auth } from '@services/firebase';
import { categoryListReloader } from '@atoms/reloaders';
import Button from '@commonComponents/Button/Button';
import getErrorMessage from '@utils/firebase-error';
import { useAddNotification } from '@utils/notifications';
import { getAppLayout } from '../AppLayout/AppLayout';
import CategoriesItem from './CategoriesItem/CategoriesItem';
import styles from './CategoriesLayout.module.scss';
import { MOBILE_BREAKPOINT, screenWidthAtom } from '../../common/atoms/screen';
import { CategoryUpdateDialog } from './CategoryUpdateDialog/CategoryUpdateDialog';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function CategoriesLayout(props: AppLayoutProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const router = useRouter();
  const width = useAtomValue(screenWidthAtom);
  const categoryListReloaderValue = useAtomValue(categoryListReloader);
  const addNotifcation = useAddNotification();

  function updateCategoriesList() {
    if (auth.currentUser) {
      ActivityCategoriesService.getByUserId(auth.currentUser.uid)
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

  useEffect(() => {
    if (categoryListReloaderValue) {
      updateCategoriesList();
    }
  }, [categoryListReloaderValue]);

  return (
    <div className={styles.layout}>
      {(width > MOBILE_BREAKPOINT || !router.query.id) && (
        <aside>
          <Button
            color="tertiary"
            fillType="filled"
            isElevated={true}
            className={styles['add-button']}
            onClick={() => setIsUpdateDialogOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} width={14}></FontAwesomeIcon>
            Add category
          </Button>

          <CategoryUpdateDialog
            isUpdateDialogOpen={isUpdateDialogOpen}
            setIsUpdateDialogOpen={(value) => {
              updateCategoriesList();
              setIsUpdateDialogOpen(value);
            }}
          ></CategoryUpdateDialog>

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
