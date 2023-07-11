import { DatabaseCollection } from '@constants/collections';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
import { CategoryProgress } from '@schemas/category-progress';
import {
  getFirstDayOfYear,
  getLastDayOfYear,
  getSixDaysAgo,
} from '@utils/date';
import { getSecondsFromDuration, toDurationString } from '@utils/duration';
import { checkIfGoalCompleted } from '@utils/habits';
import { getWheresForPeriod } from '@utils/time';
import { generateUUID } from '@utils/uuid';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  OrderByDirection,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { CategoryProgressService } from './category-progress';
import { auth, database } from './firebase';

export class ActivitiesService {
  static readonly collectionName = DatabaseCollection.Activities;

  /**
   * TODO: When changing category, update progress of old category
   *
   * @param activity
   * @param category
   * @returns
   */
  static async update(
    activity: Partial<Activity>,
    category: ActivityCategory,
  ): Promise<void> {
    const categoryRef = doc(
      database,
      `${DatabaseCollection.ActivityCategories}/${category.id}`,
    );
    // update category progress
    CategoryProgressService.getByCategoryForPeriod(
      category,
      activity.activityDate?.toDate() ?? new Date(),
    ).then((response) => {
      let progress: Partial<CategoryProgress> = {};
      if (response.length > 0) {
        progress = response[0];
        // update progress record if exists
        if (activity.id) {
          // when editing activity, we need to subtract the previous value
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
        // create new progress record if not exists
        progress = {
          categoryRef,
          category,
          value: activity.value,
          duration: activity.duration,
          activityDate: activity.activityDate,
        };
      }

      // check if goal is completed
      progress.isGoalCompleted = checkIfGoalCompleted(category, progress);
      // save progress
      CategoryProgressService.update(progress);
    });

    // update activity
    return setDoc(
      doc(database, this.collectionName, activity.id ?? generateUUID()),
      {
        ...activity,
        id: null,
        categoryRef,
        activityDate: activity.activityDate ?? Timestamp.now(),
        createdDate: Timestamp.now(),
        createdBy: auth.currentUser?.uid,
      },
    );
  }

  static async deleteById(id: string): Promise<void> {
    const activity = await this.getById(id);
    // delete activity after getting it's data so we can get the category and update the progress
    deleteDoc(doc(database, this.collectionName, id));
    const categorySnapshot = await getDoc(
      doc(
        database,
        DatabaseCollection.ActivityCategories,
        activity.categoryRef.id,
      ),
    );
    const category = ActivityCategory.fromFirestore(categorySnapshot);
    if (!category) return;
    const response = await CategoryProgressService.getByCategoryForPeriod(
      category,
      activity.activityDate?.toDate() ?? new Date(),
    );
    let progress: Partial<CategoryProgress> = {};
    if (response.length > 0) {
      progress = response[0];
      if (category.unitType === 'QUANTITY' && progress.value) {
        progress.value -= activity.value as number;
      } else if (category.unitType === 'TIME' && progress.duration) {
        progress.duration = toDurationString(
          getSecondsFromDuration(progress.duration) -
            getSecondsFromDuration(activity.duration as string),
        );
      }
      // check if goal is completed
      progress.isGoalCompleted = checkIfGoalCompleted(category, progress);
      // save progress
      CategoryProgressService.update(progress);
    }
  }

  static async getById(id: string): Promise<Activity> {
    return Activity.fromFirestore(
      await getDoc(doc(database, this.collectionName, id)),
    );
  }

  static async getByCategoryId(
    categoryId: string,
    userId: string,
    sort: OrderByDirection = 'desc',
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
      orderBy('activityDate', sort),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }

  static async getByCategoryForMonth(
    category: ActivityCategory,
    from: Date,
    userId: string,
    sort: OrderByDirection = 'desc',
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
      ...getWheresForPeriod('MONTHLY', from),
      orderBy('activityDate', sort),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }

  static async getByCategoryForYear(
    category: ActivityCategory,
    from: Date,
    userId: string,
    sort: OrderByDirection = 'desc',
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
      where('activityDate', '>=', Timestamp.fromDate(getFirstDayOfYear(from))),
      where('activityDate', '<=', Timestamp.fromDate(getLastDayOfYear(from))),
      orderBy('activityDate', sort),
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
    sort: OrderByDirection = 'desc',
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
      orderBy('activityDate', sort),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }

  static async getForMonth(
    from: Date,
    userId: string,
    sort: OrderByDirection = 'desc',
  ): Promise<Activity[]> {
    const activitiesRef = collection(database, this.collectionName);
    const q = query(
      activitiesRef,
      where('createdBy', '==', userId),
      ...getWheresForPeriod('MONTHLY', from),
      orderBy('activityDate', sort),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }

  static async getForDate(
    from: Date,
    userId: string,
    sort: OrderByDirection = 'desc',
  ): Promise<Activity[]> {
    const activitiesRef = collection(database, this.collectionName);
    const q = query(
      activitiesRef,
      where('createdBy', '==', userId),
      ...getWheresForPeriod('DAILY', from),
      orderBy('activityDate', sort),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }

  static async getForLastSixDays(
    from: Date,
    userId: string,
    sort: OrderByDirection = 'desc',
  ): Promise<Activity[]> {
    const activitiesRef = collection(database, this.collectionName);
    const q = query(
      activitiesRef,
      where('createdBy', '==', userId),
      where('activityDate', '>=', Timestamp.fromDate(getSixDaysAgo(from))),
      where(
        'activityDate',
        '<=',
        Timestamp.fromDate(new Date(from.setHours(24, 0, 0))),
      ),
      orderBy('activityDate', sort),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }
}
