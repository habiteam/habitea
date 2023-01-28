import { UserData } from '@schemas/user-data';
import { User } from 'firebase/auth';
import { atom } from 'jotai';

export const userAtom = atom<User | null>(null);

export const userDataAtom = atom<UserData | null>(null);
