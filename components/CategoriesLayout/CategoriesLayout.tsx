import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityCategoriesService } from '@services/activity-categories';
import { auth } from '@services/firebase';
import { categoryListReloader } from '@atoms/reloaders';
import { getAppLayout } from '../AppLayout/AppLayout';
import CategoriesItem from './CategoriesItem/CategoriesItem';
import styles from './CategoriesLayout.module.scss';
import { MOBILE_BREAKPOINT, screenWidth } from '../../common/atoms/screen';
import { CategoryUpdateDialog } from './CategoryUpdateDialog/CategoryUpdateDialog';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function CategoriesLayout(props: AppLayoutProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
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
            onClick={() => setIsUpdateDialogOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} width={14}></FontAwesomeIcon>
            Add category
          </button>

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
