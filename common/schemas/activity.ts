import { Timestamp } from 'firebase/firestore';

export interface Activity {
  id: string;
  categoryRef: string;
  value: string;
  activityDate: Timestamp;
  createdDate: Timestamp;
  createdBy: string;
}
