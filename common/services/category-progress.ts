import { DatabaseCollection } from '@constants/collections';
import { ActivityCategory } from '@schemas/activity-category';
import { CategoryProgress } from '@schemas/category-progress';
import { getWheresForPeriod } from '@utils/time';
import { generateUUID } from '@utils/uuid';
import {
  doc,
  Timestamp,
  setDoc,
  collection,
  where,
  query,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { auth, database } from './firebase';

export class CategoryProgressService {
  static readonly collectionName = DatabaseCollection.CategoryProgress;

  static update(categoryProgress: Partial<CategoryProgress>): void {
    setDoc(
      doc(database, this.collectionName, categoryProgress.id || generateUUID()),
      {
        ...categoryProgress,
        category: { ...categoryProgress.category },
        createdBy: auth.currentUser?.uid,
      },
    );
  }

  static async getByCategory(categoryId: string): Promise<CategoryProgress[]> {
    const progressRef = collection(database, this.collectionName);
    const q = query(
      progressRef,
      where('createdBy', '==', auth.currentUser?.uid),
      where('categoryRef', '==', categoryId),
      orderBy('activityDate', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      CategoryProgress.fromFirestore(response),
    );
  }

  static async getByCategoryForPeriod(
    category: ActivityCategory,
    from: Date,
  ): Promise<CategoryProgress[]> {
    const progressRef = collection(database, this.collectionName);
    const categoryRef = doc(
      database,
      DatabaseCollection.ActivityCategories,
      category.id,
    );
    const q = query(
      progressRef,
      where('createdBy', '==', auth.currentUser?.uid),
      where('categoryRef', '==', categoryRef),
      ...getWheresForPeriod(category.repeatType, from),
      orderBy('activityDate', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((response) =>
      CategoryProgress.fromFirestore(response),
    );
  }
}
