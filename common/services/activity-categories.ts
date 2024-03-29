import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
  updateDoc,
  runTransaction,
  orderBy,
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

  static async update(
    category: Partial<ActivityCategoryCreateFormType>,
  ): Promise<void> {
    return setDoc(
      doc(database, this.collectionName, category.id || generateUUID()),
      {
        ...category,
        goalValue: category.goalValue ? Number(category.goalValue) : null,
        createdDate: Timestamp.now(),
        createdBy: auth.currentUser?.uid,
      },
    );
  }

  static async patchStatus(
    categoryId: string,
    newStatus: ActivityCategoryStatus,
  ): Promise<void> {
    return updateDoc(doc(database, this.collectionName, categoryId), {
      status: newStatus,
    });
  }

  static async patchPinned(
    categoryId: string,
    newPinned: number,
  ): Promise<void> {
    return updateDoc(doc(database, this.collectionName, categoryId), {
      pinned: newPinned,
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
    const q = query(
      categoriesRef,
      where('createdBy', '==', userId),
      orderBy('pinned', 'desc'),
    );

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
