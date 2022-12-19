import { Timestamp } from 'firebase/firestore';

export class Activity {
  id: string;

  categoryRef: string;

  value: string;

  activityDate: Timestamp;

  createdDate: Timestamp;

  createdBy: string;

  constructor(
    id: string,
    categoryRef: string,
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
