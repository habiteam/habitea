import { DatabaseCollection } from '@constants/collections';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { CategoryProgress } from '@schemas/category-progress';
import { getSecondsFromDuration, toDurationString } from '@utils/duration';
import { getWheresForPeriod } from '@utils/time';
import { generateUUID } from '@utils/uuid';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { CategoryProgressService } from './category-progress';
import { auth, database } from './firebase';

export class ActivitiesService {
  static readonly collectionName = DatabaseCollection.Activities;

  static update(activity: Partial<Activity>, category: ActivityCategory): void {
    const categoryRef = doc(
      database,
      `${DatabaseCollection.ActivityCategories}/${category.id}`,
    );

    CategoryProgressService.getByCategoryForPeriod(
      category,
      activity.activityDate?.toDate() ?? new Date(),
    ).then((response) => {
      let progress: Partial<CategoryProgress> = {};

      if (response.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        progress = response[0];

        if (activity.id) {
          this.getById(activity.id).then((activityResponse) => {
            if (category.unitType === 'QUANTITY' && progress.value) {
              progress.value +=
                activityResponse.value - (activity.value as number);
            } else if (category.unitType === 'TIME' && progress.duration) {
              progress.duration = toDurationString(
                getSecondsFromDuration(progress.duration) +
                  getSecondsFromDuration(activityResponse.duration) -
                  getSecondsFromDuration(activity.duration as string),
              );
            }
          });
        } else if (category.unitType === 'QUANTITY' && progress.value) {
          progress.value += activity.value as number;
        } else if (category.unitType === 'TIME' && progress.duration) {
          progress.duration = toDurationString(
            getSecondsFromDuration(progress.duration) +
              getSecondsFromDuration(activity.duration as string),
          );
        }
      } else {
        progress = {
          categoryRef,
          category,
          value: activity.value,
          duration: activity.duration,
          activityDate: activity.activityDate,
        };
      }

      if (category.unitType === 'QUANTITY' && progress.value) {
        progress.isGoalCompleted = progress.value >= category.goalValue;
      } else if (category.unitType === 'TIME' && progress.duration) {
        progress.isGoalCompleted =
          getSecondsFromDuration(progress.duration) >=
          getSecondsFromDuration(category.duration);
      }

      CategoryProgressService.update(progress);
    });

    setDoc(doc(database, this.collectionName, activity.id ?? generateUUID()), {
      ...activity,
      id: null,
      categoryRef,
      activityDate: activity.activityDate ?? Timestamp.now(),
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
  }

  static async getById(id: string): Promise<Activity> {
    return Activity.fromFirestore(
      await getDoc(doc(database, this.collectionName, id)),
    );
  }

  static async getByCategory(
    categoryId: string,
    userId: string,
  ): Promise<Activity[]> {
    const activitiesRef = collection(database, this.collectionName);
    const categoryRef = doc(
      database,
      DatabaseCollection.ActivityCategories,
      categoryId,
    );
    const q = query(
      activitiesRef,
      where('createdBy', '==', userId),
      where('categoryRef', '==', categoryRef),
      orderBy('activityDate', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }

  static async getByCategoryForPeriod(
    category: ActivityCategory,
    from: Date,
    userId: string,
  ): Promise<Activity[]> {
    const activitiesRef = collection(database, this.collectionName);
    const categoryRef = doc(
      database,
      DatabaseCollection.ActivityCategories,
      category.id,
    );
    const q = query(
      activitiesRef,
      where('createdBy', '==', userId),
      where('categoryRef', '==', categoryRef),
      ...getWheresForPeriod(category.repeatType, from),
      orderBy('activityDate', 'desc'),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }

  static async getForMonth(from: Date, userId: string): Promise<Activity[]> {
    const activitiesRef = collection(database, this.collectionName);
    const q = query(
      activitiesRef,
      where('createdBy', '==', userId),
      ...getWheresForPeriod('MONTHLY', from),
      orderBy('activityDate', 'desc'),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }
}
