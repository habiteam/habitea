import { HomeBlocks } from '@constants/home-blocks';
import {
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';

export class UserData {
  id: string;

  homeBlocks: Set<HomeBlocks>;

  constructor(id: string, homeBlocks: Set<HomeBlocks>) {
    this.id = id;
    this.homeBlocks = homeBlocks;
  }

  static fromFirestore(snapshot: DocumentSnapshot): UserData {
    const data = snapshot.data();
    if (data) {
      return new UserData(snapshot.id, data.homeBlocks);
    }

    throw new Error('User not found');
  }
}
