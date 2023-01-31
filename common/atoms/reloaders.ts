import { Activity } from '@schemas/activity';
import { atom } from 'jotai';

export const categoryListReloader = atom('');

export const activityReloader = atom<Partial<Activity> | null>(null);
