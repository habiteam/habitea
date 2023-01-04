import { DocumentReference, Timestamp } from 'firebase/firestore';
import { ActivityCategory } from './activity-category';

export class Activity {
  id: string;

  categoryRef: DocumentReference;

  category?: ActivityCategory;

  value: string;

  activityDate: Timestamp;

  createdDate: Timestamp;

  createdBy: string;

  constructor(
    id: string,
    categoryRef: DocumentReference,
    value: string,
    activityDate: Timestamp,
    createdDate: Timestamp,
    createdBy: string,
  ) {
    this.id = id;
    this.categoryRef = categoryRef;
    this.value = value;
    this.activityDate = activityDate;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
  }

  static fromFirestore(snapshot: any): Activity {
    const data = snapshot.data();
    return new Activity(
      snapshot.id,
      data.categoryRef,
      data.value,
      data.activityDate,
      data.createdDate,
      data.createdBy,
    );
  }
}
