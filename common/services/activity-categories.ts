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
import { ActivityCategory } from '../schemas/activity-category';
import { generateUUID } from '../utils/uuid';

export class ActivityCategoriesService {
  static readonly collectionName = 'ActivityCategories';

  static create(category: Partial<ActivityCategory>) {
    setDoc(doc(database, this.collectionName, generateUUID()), {
      ...category,
      id: generateUUID(),
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
  }

  // static async get() {
  //   const querySnapshot = await getDocs(
  //     collection(database, 'activityCategories'),
  //   );

  //   return querySnapshot.docs.map((response) => response.data());
  // }

  static async getByUserId(userId: string) {
    const categoriesRef = collection(database, this.collectionName);
    const q = query(categoriesRef, where('createdBy', '==', userId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) => response.data());
  }
}
