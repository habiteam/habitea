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
  runTransaction,
} from 'firebase/firestore';
import {
  ActivityCategory,
  ActivityCategoryCreateFormType,
} from '@schemas/activity-category';
import { generateUUID } from '@utils/uuid';
import { auth, database } from '@services/firebase';
import { DatabaseCollection } from '@constants/collections';
import { ActivityCategoryStatus } from '@constants/dictionaries';
import { ActivitiesService } from './activities';

export class ActivityCategoriesService {
  static readonly collectionName = DatabaseCollection.ActivityCategories;

  static update(category: Partial<ActivityCategoryCreateFormType>): void {
    setDoc(doc(database, this.collectionName, category.id || generateUUID()), {
      ...category,
      goalValue: category.goalValue ? Number(category.goalValue) : null,
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

  static async deleteById(categoryId: string, userId: string): Promise<void> {
    // get all activities for this category
    const activities = await ActivitiesService.getByCategoryId(
      categoryId,
      userId,
    );
    await runTransaction(database, async (transaction) => {
      const category = await transaction.get(
        doc(database, this.collectionName, categoryId),
      );
      if (!category.exists()) {
        throw new Error('Category does not exist!');
      }
      activities.forEach((activity) => {
        transaction.delete(
          doc(database, ActivitiesService.collectionName, activity.id),
        );
      });
      transaction.delete(category.ref);
    });
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
