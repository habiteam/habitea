import { Activity } from '@schemas/activity';
import { atom } from 'jotai';

export const openActivityModalAtom = atom<boolean>(false);

export const activityAtom = atom<Activity | null>(null);
