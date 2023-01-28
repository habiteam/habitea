import { atom } from 'jotai';

/**
 * TODO DRY: breakpoints also declared in scss
 * @see styles/breakpoints.module.scss
 */
export const MOBILE_BREAKPOINT = 640;

export const screenWidthAtom = atom(0);

export const screenHeightAtom = atom(0);
