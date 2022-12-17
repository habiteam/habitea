import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { ActivityCategory } from '@schemas/activity-category';
import { generateUUID } from '@utils/uuid';
import { auth, database } from '@services/firebase';
import { DatabaseCollection } from '@constants/collections';
import { ActivitiesService } from './activities';

export class ActivityCategoriesService {
  static readonly collectionName = DatabaseCollection.ActivityCategories;

  static create(category: Partial<ActivityCategory>): void {
    setDoc(doc(database, this.collectionName, generateUUID()), {
      ...category,
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
  }

  static deleteById(categoryId: string): void {
    deleteDoc(doc(database, this.collectionName, categoryId));
  }

  static async getById(categoryId: string): Promise<ActivityCategory | null> {
    const d = await doc(database, this.collectionName, categoryId);
    const q = await getDoc(d);

    return q.exists()
      ? { ...(q.data() as ActivityCategory), id: categoryId }
      : null;
  }

  static async getByUserId(userId: string): Promise<ActivityCategory[]> {
    const categoriesRef = collection(database, this.collectionName);
    const q = query(categoriesRef, where('createdBy', '==', userId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) => ({
      ...(response.data() as ActivityCategory),
      id: response.id,
    }));
  }

  static async getActiveByUserId(userId: string): Promise<ActivityCategory[]> {
    const categoriesRef = collection(database, this.collectionName);
    const q = query(
      categoriesRef,
      where('createdBy', '==', userId),
      where('status', '==', 'ACTIVE'),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) => ({
      ...(response.data() as ActivityCategory),
      id: response.id,
    }));
  }

  // static async getProgressById(categoryId: string): Promise<number> {
  //   const category = await this.getById(categoryId);
  //   const activities = await ActivitiesService.getByCategory(categoryId);
  // }
}
