import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { ActivityCategory } from '@schemas/activity-category';
import { generateUUID } from '@utils/uuid';
import { auth, database } from '@services/firebase';
import { DatabaseCollection } from '@constants/collections';

export class ActivityCategoriesService {
  static readonly collectionName = DatabaseCollection.ActivityCategories;

  static create(category: Partial<ActivityCategory>) {
    setDoc(doc(database, this.collectionName, generateUUID()), {
      ...category,
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
  }

  static async getById(categoryId: string) {
    const d = await doc(database, this.collectionName, categoryId);
    const q = await getDoc(d);

    return q.exists() ? q.data() : null;
  }

  static async getByUserId(userId: string) {
    const categoriesRef = collection(database, this.collectionName);
    const q = query(categoriesRef, where('createdBy', '==', userId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) => ({
      ...response.data(),
      id: response.id,
    }));
  }

  static async getActiveByUserId(userId: string) {
    const categoriesRef = collection(database, this.collectionName);
    const q = query(
      categoriesRef,
      where('createdBy', '==', userId),
      where('status', '==', 'ACTIVE'),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) => ({
      ...response.data(),
      id: response.id,
    }));
  }
}
