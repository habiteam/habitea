import { ActivityCategory } from '@schemas/activity-category';
import { atom } from 'jotai';

export const categoriesAtom = atom<ActivityCategory[]>([]);
