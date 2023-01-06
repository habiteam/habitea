import { DatabaseCollection } from '@constants/collections';
import { Activity } from '@schemas/activity';
import { ActivityCategory } from '@schemas/activity-category';
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

  static create(activity: Partial<Activity>, categoryId: string): void {
    setDoc(doc(database, this.collectionName, generateUUID()), {
      ...activity,
      categoryRef: doc(
        database,
        `${DatabaseCollection.ActivityCategories}/${categoryId}`,
      ),
      activityDate: activity.activityDate ?? Timestamp.now(),
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
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      Activity.fromFirestore(response),
    );
  }
}
