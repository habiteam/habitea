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
  static readonly collectionName = 'activities';

  static create(activity: Partial<Activity>) {
    setDoc(doc(database, this.collectionName, generateUUID()), {
      ...activity,
      categoryRef: doc(database, `activityCategories/${activity.categoryRef}`),
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
  }

  static async get() {
    const querySnapshot = await getDocs(
      collection(database, this.collectionName),
    );

    return querySnapshot.docs.map((response) => response.data());
  }

  static async getByCategory(categoryId: string) {
    const activitiesRef = collection(database, this.collectionName);
    const categoryRef = doc(database, 'activityCategories', categoryId);
    const q = query(activitiesRef, where('categoryRef', '==', categoryRef));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) => ({
      ...response.data(),
      id: response.id,
    }));
  }
}
