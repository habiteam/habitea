import { categoryListReloader } from '@atoms/reloaders';
import { MOBILE_BREAKPOINT, screenWidth } from '@atoms/screen';
import Button from '@commonComponents/Button/Button';
import Chip from '@commonComponents/Chip/Chip';
import Dialog from '@commonComponents/Dialog/Dialog';
import DropdownMenu, {
  DropdownMenuItem,
} from '@commonComponents/DropdownMenu/DropdownMenu';
import { getCategoriesLayout } from '@components/CategoriesLayout/CategoriesLayout';
import { ActivityCategoryRepeatTypePeriods } from '@constants/dictionaries';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  summariseActivities,
  getCategoryGoalString,
  calculateProgress,
} from '@utils/habits';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivitiesService } from '@services/activities';
import { ActivityCategoriesService } from '@services/activity-categories';
import { generateUUID } from '@utils/uuid';
import classNames from 'classnames';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import userAtom from '@atoms/user';
import { CategoryUpdateDialog } from '@components/CategoriesLayout/CategoryUpdateDialog/CategoryUpdateDialog';
import Head from 'next/head';
import { useAddNotification } from '@utils/notifications';
import styles from './Category.module.scss';

export default function Category() {
  const router = useRouter();
  const [category, setCategory] = useState<ActivityCategory>();
  const [recentActivities, setRecentActivities] = useState<Activity[]>();
  const [isActionMenuOpened, setIsActionMenuOpened] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const user = useAtomValue(userAtom);

  const width = useAtomValue(screenWidth);
  const addNotifcation = useAddNotification();
  const setCategoryListReloader = useSetAtom(categoryListReloader);

  const actions: DropdownMenuItem[] = [
    {
      icon: faPenToSquare,
      text: 'Edit',
      onClick: () => setIsUpdateDialogOpen(true),
    },
    {
      icon: faTrash,
      text: 'Delete',
      onClick: () => setDeleteDialogOpen(true),
    },
  ];

  const updateCategory = (): void => {
    if (!router.isReady || !user) return;
    ActivityCategoriesService.getById(router.query.id as string).then(
      (response) => {
        setCategory(response as ActivityCategory);
        ActivitiesService.getByCategoryForPeriod(
          response as ActivityCategory,
          new Date(),
          user.uid,
        )
          .then((responseActivities) => {
            setRecentActivities(responseActivities);
          })
          .catch((error) => {
            addNotifcation({ message: error.toString(), type: 'danger' });
          });
      },
    );
  };

  const updateCategoryStatus = (): void => {
    ActivityCategoriesService.patchStatus(
      router.query.id as string,
      category?.status === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE',
    );
    addNotifcation({ message: 'Category status updated', type: 'info' });
    updateCategory();
    setStatusDialogOpen(false);
  };

  const deleteCategory = (): void => {
    ActivityCategoriesService.deleteById(category?.id as string);
    router.push('/app/categories');
    addNotifcation({ message: 'Category deleted', type: 'info' });
    setCategoryListReloader(generateUUID());
  };

  useEffect(() => {
    updateCategory();
  }, [router.asPath, user]);

  return (
    category && (
      <>
        <Head>
          <title>{category.name ?? 'Category'} - Habitea</title>
        </Head>

        <div className={classNames(styles.header)}>
          {width <= MOBILE_BREAKPOINT ? (
            <Button
              fillType="regular"
              color="default"
              onClick={() => router.push('/app/categories')}
            >
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                width={24}
              ></FontAwesomeIcon>
            </Button>
          ) : (
            <div className={classNames(styles.icon)}>
              <FontAwesomeIcon
                icon={findIconDefinition({
                  prefix: 'fas',
                  iconName: category.icon,
                })}
                width={16}
              ></FontAwesomeIcon>
            </div>
          )}

          <div className={classNames(styles.heading)}>
            <div className={classNames(styles.title)}>
              <h1>{category.name}</h1>
              <Chip
                text={category.status}
                color={category.status === 'ACTIVE' ? 'info' : 'inactive'}
                fillType="filled"
                onClick={() => setStatusDialogOpen(true)}
              ></Chip>
            </div>
            <div className={classNames(styles.subtitle)}>
              {getCategoryGoalString(category)}
            </div>
          </div>

          {width <= MOBILE_BREAKPOINT ? (
            <div>
              <Button
                fillType="regular"
                color="default"
                onClick={() => setIsActionMenuOpened(true)}
              >
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  width={16}
                ></FontAwesomeIcon>
              </Button>
              <DropdownMenu
                items={actions}
                color="primary"
                isOpen={isActionMenuOpened}
                onClose={() => setIsActionMenuOpened(false)}
              ></DropdownMenu>
            </div>
          ) : (
            actions.map(
              (action, i) =>
                action.icon && (
                  <Button
                    key={i}
                    fillType="regular"
                    color="default"
                    onClick={action.onClick}
                  >
                    <FontAwesomeIcon
                      icon={action.icon}
                      width={16}
                    ></FontAwesomeIcon>
                  </Button>
                ),
            )
          )}
        </div>

        {/* Main */}

        <div className={classNames(styles.main)}>
          <div>
            <div className={classNames(styles.info)}>
              <h2 className={classNames(styles.label)}>Description</h2>
              <p className={classNames(styles.value)}>
                {category.description ||
                  'This category doesn’t have a description yet.'}
              </p>
            </div>

            <p>
              {summariseActivities(recentActivities ?? [], category.unitType)}{' '}
              {category.unit} this{' '}
              {
                ActivityCategoryRepeatTypePeriods[
                  category.repeatType ?? 'DAILY'
                ]
              }
            </p>
            <p>
              {calculateProgress(recentActivities ?? [], category).toFixed(0)} %
              progress
            </p>
          </div>
          <div>
            {recentActivities?.map((el) => (
              <div key={el.id}>
                date: {el.activityDate.toDate().toString()}, value: {el.value}
              </div>
            ))}
          </div>
        </div>

        {/* Dialogs */}

        <Dialog
          title="Change category status"
          open={statusDialogOpen}
          handleClose={() => setStatusDialogOpen(false)}
          actions={[
            {
              text: 'Cancel',
              fillType: 'regular',
              color: 'primary',
              onClick: () => setStatusDialogOpen(false),
            },
            {
              text: 'Confirm',
              fillType: 'filled',
              color: 'primary',
              onClick: updateCategoryStatus,
            },
          ]}
        >
          <span>Are you sure you want to change this category status?</span>
        </Dialog>

        <Dialog
          title="Delete category"
          open={deleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
          actions={[
            {
              text: 'Cancel',
              fillType: 'regular',
              color: 'primary',
              onClick: () => setDeleteDialogOpen(false),
            },
            {
              text: 'Confirm',
              fillType: 'filled',
              color: 'primary',
              onClick: deleteCategory,
            },
          ]}
        >
          <span>Are you sure you want to delete this category?</span>
        </Dialog>

        <CategoryUpdateDialog
          isUpdateDialogOpen={isUpdateDialogOpen}
          setIsUpdateDialogOpen={(value) => {
            updateCategory();
            setCategoryListReloader(generateUUID());
            setIsUpdateDialogOpen(value);
          }}
          activityCategory={category}
        ></CategoryUpdateDialog>
      </>
    )
  );
}

Category.getLayout = getCategoriesLayout;
