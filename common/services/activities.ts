import { Activity } from '@schemas/activity';
import { generateUUID } from '@utils/uuid';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, database } from './firebase';

export class ActivitiesService {
  static readonly collectionName = 'activities';

  static create(activity: Partial<Activity>) {
    setDoc(doc(database, this.collectionName, generateUUID()), {
      ...activity,
      categoryId: doc(database, `activityCategories/${activity.categoryId}`),
      createdDate: Timestamp.now(),
      createdBy: auth.currentUser?.uid,
    });
  }
}
