import { categoriesAtom } from '@atoms/categories';
import { activityReloader } from '@atoms/reloaders';
import { userAtom } from '@atoms/user';
import {
  findIconDefinition,
  IconName,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoryProgress } from '@schemas/category-progress';
import { CategoryProgressService } from '@services/category-progress';
import { getCategoryGoalString, getProgressValue } from '@utils/habits';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import styles from './HabitSummary.module.scss';

export default function HabitSummary() {
  const activityCategories = useAtomValue(categoriesAtom);
  const reloader = useAtomValue(activityReloader);
  const [categoryProgresses, setCategoryProgresses] = useState<
    CategoryProgress[]
  >([]);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const fetchCategoryProgresses = async () => {
      if (user && activityCategories) {
        // filter out inactive categories
        const activeCategories = activityCategories.filter(
          (cat) => cat.status === 'ACTIVE',
        );
        // fetch category progresses
        const results = await Promise.all(
          activeCategories.map(async (category) => {
            const progresses =
              await CategoryProgressService.getByCategoryForPeriod(
                category,
                new Date(),
              );
            return progresses;
          }),
        );
        setCategoryProgresses(results.flat());
      }
    };
    fetchCategoryProgresses();
  }, [reloader, user, activityCategories]);

  return (
    <div className={styles['container-container']}>
      <div className={styles.container}>
        {categoryProgresses &&
          categoryProgresses.map((progress) => (
            <div
              key={progress.id}
              className={classNames(
                styles.item,
                {
                  [styles['item--bad']]:
                    progress.category.goalType === 'MAX' &&
                    !progress.isGoalCompleted,
                },
                {
                  [styles['item--good']]:
                    progress.category.goalType === 'MIN' &&
                    progress.isGoalCompleted,
                },
              )}
            >
              <div className={classNames(styles['item-header'])}>
                <span className={classNames(styles['category-name'])}>
                  {progress.category.name}
                </span>
                {`${progress.value} out of ${getCategoryGoalString(
                  progress.category,
                )}`}
              </div>
              <div className={classNames(styles['item-content'])}>
                <FontAwesomeIcon
                  className={classNames(styles['item-icon'])}
                  icon={findIconDefinition({
                    prefix: 'fas',
                    iconName: progress.category?.icon as IconName,
                  })}
                  width={48}
                ></FontAwesomeIcon>
                <div className={classNames(styles['activity-progress'])}>
                  {getProgressValue(progress)}%
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
