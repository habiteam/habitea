import { DatabaseCollection } from '@constants/collections';
import { Activity } from '@schemas/activity';
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
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
  }

  static async getByCategory(categoryId: string): Promise<Activity[]> {
    const activitiesRef = collection(database, this.collectionName);
    const categoryRef = doc(
      database,
      DatabaseCollection.ActivityCategories,
      categoryId,
    );
    const q = query(activitiesRef, where('categoryRef', '==', categoryRef));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) => ({
      ...(response.data() as Activity),
      id: response.id,
    }));
  }
}
