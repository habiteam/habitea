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
  updateDoc,
} from 'firebase/firestore';
import {
  ActivityCategory,
  ActivityCategoryCreateFormType,
} from '@schemas/activity-category';
import { generateUUID } from '@utils/uuid';
import { auth, database } from '@services/firebase';
import { DatabaseCollection } from '@constants/collections';
import { ActivityCategoryStatus } from '@constants/dictionaries';

export class ActivityCategoriesService {
  static readonly collectionName = DatabaseCollection.ActivityCategories;

  static update(category: Partial<ActivityCategoryCreateFormType>): void {
    setDoc(doc(database, this.collectionName, category.id || generateUUID()), {
      ...category,
      goalValue: category.goalValue ? Number(category.goalValue) : null,
      validFrom: category.validFrom
        ? Timestamp.fromDate(new Date(category.validFrom as string))
        : null,
      validTo: category.validTo
        ? Timestamp.fromDate(new Date(category.validTo as string))
        : null,
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
  }

  static patchStatus(
    categoryId: string,
    newStatus: ActivityCategoryStatus,
  ): void {
    updateDoc(doc(database, this.collectionName, categoryId), {
      status: newStatus,
    });
  }

  static deleteById(categoryId: string): void {
    deleteDoc(doc(database, this.collectionName, categoryId));
  }

  static async getById(categoryId: string): Promise<ActivityCategory | null> {
    const d = doc(database, this.collectionName, categoryId);
    const q = await getDoc(d);

    return q.exists() ? ActivityCategory.fromFirestore(q) : null;
  }

  static async getByUserId(userId: string): Promise<ActivityCategory[]> {
    const categoriesRef = collection(database, this.collectionName);
    const q = query(categoriesRef, where('createdBy', '==', userId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      ActivityCategory.fromFirestore(response),
    );
  }

  static async getActiveByUserId(userId: string): Promise<ActivityCategory[]> {
    const categoriesRef = collection(database, this.collectionName);
    const q = query(
      categoriesRef,
      where('createdBy', '==', userId),
      where('status', '==', 'ACTIVE'),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      ActivityCategory.fromFirestore(response),
    );
  }
}
