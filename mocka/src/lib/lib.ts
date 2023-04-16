import components from '../../src/component-list.json';
import type { ComponentListItem } from './types';

export const getLibraries = () => {
    return components.reduce((acc: string[], { library }) => {
        const found = acc.find((item: string) => item === library);
        if (!found) {
          acc.push(library);
        }
        return acc;
      }
    , []);
}

export const getLibraryComponents = (libraryToUse: string) => {
    const a = components.reduce((acc: ComponentListItem[], { group, library }) => {
        if (library.toLowerCase() === libraryToUse.toLowerCase()) {
            const found = acc.find((item: ComponentListItem) => item.name === group);
            if (found) {
            found.count++;
            } else {
            acc.push({ name: group, count: 1 });
            }
        }
        return acc;
    }, []);
    console.log("a", a);
    return a;
}