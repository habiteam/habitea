import { MOBILE_BREAKPOINT, screenWidth } from '@atoms/screen';
import Button from '@commonComponents/Button/Button';
import Chip from '@commonComponents/Chip/Chip';
import { getCategoriesLayout } from '@components/CategoriesLayout/CategoriesLayout';
import { ActivityCategoryRepeatTypeOptions } from '@constants/dictionaries';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActivityCategory } from '@schemas/activity-category';
import { ActivityCategoriesService } from '@services/activity-categories';
import { getDurationFromString } from '@utils/duration';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
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
  const width = useAtomValue(screenWidth);

  useEffect(() => {
    if (!router.isReady) return;

    ActivityCategoriesService.getById(router.query.id as string).then(
      (response) => setCategory(response as ActivityCategory),
    );
  }, [router.asPath]);

  return (
    <>
      {category && (
        <div className={classNames(styles.header)}>
          {width <= MOBILE_BREAKPOINT ? (
            <Button
              fillType="regular"
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
            <Button
              fillType="regular"
              onClick={() => router.push('/app/categories')}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                width={16}
              ></FontAwesomeIcon>
            </Button>
          ) : null}
        </div>
      )}
    </>
  );
}

Category.getLayout = getCategoriesLayout;
