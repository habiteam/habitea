import { atom } from 'jotai';

export const categoryListReloader = atom('');

export const journalReloader = atom<Date | null>(null);

export const dailyReloader = atom<string>('');
