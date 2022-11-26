import { User } from 'firebase/auth';
import { atom } from 'jotai';

export default atom<User | null>(null);
