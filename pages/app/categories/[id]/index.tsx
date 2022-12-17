import notifications from '@atoms/notifications';
import { categoryListReloader } from '@atoms/reloaders';
import { MOBILE_BREAKPOINT, screenWidth } from '@atoms/screen';
import Button from '@commonComponents/Button/Button';
import Chip from '@commonComponents/Chip/Chip';
import Dialog from '@commonComponents/Dialog/Dialog';
import DropdownMenu, {
  DropdownMenuItem,
} from '@commonComponents/DropdownMenu/DropdownMenu';
import { getCategoriesLayout } from '@components/CategoriesLayout/CategoriesLayout';
import {
  ActivityCategoryRepeatType,
  ActivityCategoryRepeatTypeOptions,
} from '@constants/dictionaries';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivitiesService } from '@services/activities';
import { ActivityCategoriesService } from '@services/activity-categories';
import { getDurationFromString } from '@utils/duration';
import { generateUUID } from '@utils/uuid';
import classNames from 'classnames';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Category.module.scss';

function getCategoryGoalString(category: ActivityCategory): string {
  if (category.unitType === 'TIME') {
    const duration = getDurationFromString(category.duration);
    return `${duration.hours} hours, ${duration.minutes} minutes, ${
      duration.seconds
    } seconds ${ActivityCategoryRepeatTypeOptions[category.repeatType]}`;
  }

  return `${category.goalValue} ${category.unit} ${
    ActivityCategoryRepeatTypeOptions[category.repeatType]
  }`;
}
export default function Category() {
  const router = useRouter();
  const [category, setCategory] = useState<ActivityCategory>();
  const [activities, setActivities] = useState<Activity[]>();
  const [isActionMenuOpened, setIsActionMenuOpened] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const width = useAtomValue(screenWidth);
  const setNotification = useSetAtom(notifications);
  const setCategoryListReloader = useSetAtom(categoryListReloader);

  const actions: DropdownMenuItem[] = [
    {
      icon: faPenToSquare,
      text: 'Edit',
    },
    {
      icon: faTrash,
      text: 'Delete',
      onClick: () => setDeleteDialogOpen(true),
    },
  ];

  const deleteCategory = () => {
    ActivityCategoriesService.deleteById(category?.id as string);
    router.push('/app/categories');
    setNotification((values) => [
      ...values,
      { id: generateUUID(), message: 'Category deleted', type: 'info' },
    ]);
    setCategoryListReloader(generateUUID());
  };

  useEffect(() => {
    if (!router.isReady) return;

    ActivityCategoriesService.getById(router.query.id as string).then(
      (response) => {
        setCategory(response as ActivityCategory);
        ActivitiesService.getByCategoryForPeriod(
          router.query.id as string,
          response?.repeatType as ActivityCategoryRepeatType,
        ).then((responseActivities) => {
          setActivities(responseActivities);
        });
      },
    );
  }, [router.asPath]);

  return (
    <>
      {category && (
        <div className={classNames(styles.header)}>
          {width <= MOBILE_BREAKPOINT ? (
            <Button
              fillType="regular"
              color="default"
              onClick={() => router.push('/app/categories')}
            >
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                width={16}
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
      )}
      <div>
        {activities?.map((el, i) => (
          <>{el.value}</>
        ))}
      </div>
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
    </>
  );
}

Category.getLayout = getCategoriesLayout;
