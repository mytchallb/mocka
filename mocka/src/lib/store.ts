import { atom } from "jotai";
import type { ComponentListItem} from './types';

export const sidebarActiveAtom = atom<boolean>(true);
export const sidebarActiveGroupAtom = atom<number>(0);

export const libraryListAtom = atom<string[]>([]);
export const selectedLibraryAtom = atom<string>("");

export const componentGroupListAtom = atom<ComponentListItem[]>([]);

export const darkModeAtom = atom<boolean>(false);

// library > group > component