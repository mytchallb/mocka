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
    const results = components.reduce((acc: ComponentListItem[], { group, library }) => {
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
    

    // Sort array of objects alphabetically based on name property
    results.sort((a: ComponentListItem, b: ComponentListItem) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    return results;
}