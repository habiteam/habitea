import {
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { ActivityCategory } from './activity-category';

export class Activity {
  id: string;

  categoryRef: DocumentReference;

  category?: ActivityCategory;

  value: number;

  duration: string;

  activityDate: Timestamp;

  createdDate: Timestamp;

  createdBy: string;

  constructor(
    id: string,
    categoryRef: DocumentReference,
    value: number,
    duration: string,
    activityDate: Timestamp,
    createdDate: Timestamp,
    createdBy: string,
  ) {
    this.id = id;
    this.categoryRef = categoryRef;
    this.value = value;
    this.duration = duration;
    this.activityDate = activityDate;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
  }

  static fromFirestore(snapshot: DocumentSnapshot): Activity {
    const data = snapshot.data();
    if (data) {
      return new Activity(
        snapshot.id,
        data.categoryRef,
        data.value,
        data.duration,
        data.activityDate,
        data.createdDate,
        data.createdBy,
      );
    }
    throw new Error('Activity not found');
  }
}
