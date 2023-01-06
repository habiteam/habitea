import { DocumentReference, Timestamp } from 'firebase/firestore';
import { ActivityCategory } from './activity-category';

export class CategoryProgress {
  id: string;

  categoryRef: DocumentReference;

  category: ActivityCategory;

  value: number;

  duration: string;

  activityDate: Timestamp;

  isGoalCompleted: boolean;

  createdBy: string;

  constructor(
    id: string,
    categoryRef: DocumentReference,
    category: ActivityCategory,
    value: number,
    duration: string,
    activityDate: Timestamp,
    isGoalCompleted: boolean,
    createdBy: string,
  ) {
    this.id = id;
    this.categoryRef = categoryRef;
    this.category = category;
    this.value = value;
    this.duration = duration;
    this.activityDate = activityDate;
    this.isGoalCompleted = isGoalCompleted;
    this.createdBy = createdBy;
  }

  static fromFirestore(snapshot: any): CategoryProgress {
    const data = snapshot.data();
    return new CategoryProgress(
      snapshot.id,
      data.categoryRef,
      data.category,
      data.value,
      data.duration,
      data.activityDate,
      data.isGoalCompleted,
      data.createdBy,
    );
  }
}
