import { categoryListReloader } from '@atoms/reloaders';
import { MOBILE_BREAKPOINT, screenWidthAtom } from '@atoms/screen';
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
  faEdit,
  faEllipsisVertical,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  getSummarisedActivities,
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
import { userAtom } from '@atoms/user';
import { CategoryUpdateDialog } from '@components/CategoriesLayout/CategoryUpdateDialog/CategoryUpdateDialog';
import Head from 'next/head';
import { useAddNotification } from '@utils/notifications';
import Heatmap from '@commonComponents/Heatmap/Heatmap';
import getErrorMessage from '@utils/firebase-error';
import { FirebaseError } from 'firebase/app';
import Pin from '@commonComponents/Pin/Pin';
import ActivityDialog from '@commonComponents/ActivityDialog/ActivityDialog';
import { activityAtom } from '@atoms/activity-dialog';
import MontlhyProgressChart from '@commonComponents/MontlhyProgressChart/MontlhyProgressChart';
import styles from './Category.module.scss';

export default function Category() {
  const router = useRouter();
  const [category, setCategory] = useState<ActivityCategory>();
  const [recentActivities, setRecentActivities] = useState<Activity[]>();
  const [isActionMenuOpened, setIsActionMenuOpened] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const setActivity = useSetAtom(activityAtom);
  const [openActivityModal, setOpenActivityModal] = useState(false);
  const user = useAtomValue(userAtom);

  const width = useAtomValue(screenWidthAtom);
  const addNotifcation = useAddNotification();
  const setCategoryListReloader = useSetAtom(categoryListReloader);

  const actions: DropdownMenuItem[] = [
    {
      icon: faPlus,
      text: 'Add activity',
      onClick: () => {
        setActivity(null);
        setOpenActivityModal(true);
      },
    },
    {
      icon: faEdit,
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
    ActivityCategoriesService.getById(router.query.id as string)
      .then((response) => {
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
            addNotifcation({ message: getErrorMessage(error), type: 'danger' });
          });
      })
      .catch((error) => {
        addNotifcation({ message: getErrorMessage(error), type: 'danger' });
      });
  };

  const updateCategoryStatus = async () => {
    try {
      await ActivityCategoriesService.patchStatus(
        router.query.id as string,
        category?.status === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE',
      );
      addNotifcation({ message: 'Category status updated', type: 'info' });
      updateCategory();
      setStatusDialogOpen(false);
    } catch (error: any) {
      addNotifcation({ message: getErrorMessage(error), type: 'danger' });
    }
  };

  const updatePinned = async () => {
    try {
      await ActivityCategoriesService.patchPinned(
        router.query.id as string,
        category?.pinned === 0 ? 1 : 0,
      );
      addNotifcation({
        message:
          category?.pinned === 0 ? 'Category pinned' : 'Category unpinned',
        type: 'info',
      });
      updateCategory();
      setCategoryListReloader(generateUUID());
      setStatusDialogOpen(false);
    } catch (error: any) {
      addNotifcation({ message: getErrorMessage(error), type: 'danger' });
    }
  };

  const deleteCategory = (): void => {
    if (user) {
      ActivityCategoriesService.deleteById(category?.id as string, user.uid)
        .then(() => {
          router.push('/app/categories');
          addNotifcation({ message: 'Category deleted', type: 'info' });
          setCategoryListReloader(generateUUID());
        })
        .catch((error: FirebaseError) => {
          addNotifcation({ message: getErrorMessage(error), type: 'danger' });
        });
    }
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
              color="primary-alt"
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
                color={category.status === 'ACTIVE' ? 'info' : 'tertiary'}
                fillType="filled"
                onClick={() => setStatusDialogOpen(true)}
              ></Chip>
            </div>
            <div className={classNames(styles.subtitle)}>
              {getCategoryGoalString(category)}
            </div>
          </div>

          <Pin
            value={category.pinned ?? 0}
            onClick={() => updatePinned()}
          ></Pin>

          {width <= MOBILE_BREAKPOINT ? (
            <div>
              <Button
                fillType="regular"
                color="primary-alt"
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
                    color="primary-alt"
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
            {
              <MontlhyProgressChart
                date={new Date()}
                category={category}
              ></MontlhyProgressChart>
            }
            {<Heatmap date={new Date()} category={category}></Heatmap>}

            <div className={classNames(styles.info)}>
              <h2 className={classNames(styles.label)}>Description</h2>
              <p className={classNames(styles.value)}>
                {category.description ||
                  'This category doesn’t have a description yet.'}
              </p>
            </div>

            <div className={classNames(styles.info)}>
              <h2 className={classNames(styles.label)}>Recently</h2>
              <p className={classNames(styles.value)}>
                {getSummarisedActivities(
                  recentActivities ?? [],
                  category.unitType,
                )}{' '}
                {category.unit} this{' '}
                {
                  ActivityCategoryRepeatTypePeriods[
                    category.repeatType ?? 'DAILY'
                  ]
                }
              </p>
            </div>

            <div className={classNames(styles.info)}>
              <h2 className={classNames(styles.label)}>Progress</h2>
              <p className={classNames(styles.value)}>
                {calculateProgress(recentActivities ?? [], category).toFixed(0)}{' '}
                %
              </p>
            </div>
          </div>
        </div>

        {/* Dialogs */}

        <ActivityDialog
          openActivityModal={openActivityModal}
          handleClose={() => setOpenActivityModal(false)}
          selectedCategoryValue={category}
        ></ActivityDialog>

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
