import {
  ActivityCategoryGoalType,
  ActivityCategoryRepeatType,
  ActivityCategoryStatus,
  ActivityUnitType,
} from '@constants/dictionaries';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { DocumentSnapshot, Timestamp } from 'firebase/firestore';

export class ActivityCategory {
  id: string;

  name: string;

  icon: IconName;

  description?: string;

  status: ActivityCategoryStatus;

  goalValue: number;

  goalType: ActivityCategoryGoalType;

  repeatType: ActivityCategoryRepeatType;

  unit: string;

  unitType: ActivityUnitType;

  duration: string;

  createdDate: Timestamp;

  createdBy: string;

  pinned: number;

  constructor(
    id: string,
    name: string,
    icon: IconName,
    description: string,
    status: ActivityCategoryStatus,
    goalValue: number,
    goalType: ActivityCategoryGoalType,
    repeatType: ActivityCategoryRepeatType,
    unit: string,
    unitType: ActivityUnitType,
    duration: string,
    createdDate: Timestamp,
    createdBy: string,
    pinned: number,
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.status = status;
    this.goalValue = goalValue;
    this.goalType = goalType;
    this.repeatType = repeatType;
    this.unit = unit;
    this.unitType = unitType;
    this.duration = duration;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.pinned = pinned;
  }

  static fromFirestore(snapshot: DocumentSnapshot): ActivityCategory {
    const data = snapshot.data();
    if (data) {
      return new ActivityCategory(
        snapshot.id,
        data.name,
        data.icon,
        data.description,
        data.status,
        data.goalValue,
        data.goalType,
        data.repeatType,
        data.unit,
        data.unitType,
        data.duration,
        data.createdDate,
        data.createdBy,
        data.pinned,
      );
    }
    throw new Error('Activity category not found');
  }
}

export type ActivityCategoryCreateFormType = Omit<
  ActivityCategory,
  'createdDate' | 'createdBy'
>;
