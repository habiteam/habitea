import { DatabaseCollection } from '@constants/collections';
import { ActivityCategoryRepeatType } from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { getWheresForPeriod } from '@utils/time';
import { generateUUID } from '@utils/uuid';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { auth, database } from './firebase';

export class ActivitiesService {
  static readonly collectionName = DatabaseCollection.Activities;

  static create(activity: Partial<Activity>) {
    setDoc(doc(database, this.collectionName, generateUUID()), {
      ...activity,
      categoryRef: doc(
        database,
        `${DatabaseCollection.ActivityCategories}/${activity.categoryRef}`,
      ),
      activityDate: Timestamp.now(),
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
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
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }

  static async getByCategoryForPeriod(
    categoryId: string,
    period: ActivityCategoryRepeatType,
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
      ...getWheresForPeriod(period, new Date()),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }
}
