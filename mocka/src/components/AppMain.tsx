import { useEffect } from 'react';
import Sidebar from './Sidebar';

import { useAtom } from 'jotai';
import {componentGroupListAtom, libraryListAtom, selectedLibraryAtom } from '../lib/store';
import { getLibraryComponents, getLibraries } from '../lib/lib';

const AppMain = (): JSX.Element => {

  const [selectedLibrary,] = useAtom(selectedLibraryAtom);
  const [, setLibraryList] = useAtom(libraryListAtom);
  const [, setComponentGroupList] = useAtom(componentGroupListAtom);

  useEffect(() => {
    setLibraryList(getLibraries());
    setComponentGroupList(getLibraryComponents(selectedLibrary));
  }, []);
  
  return (
    <>
      <div className="p-2 flex h-full">
        <Sidebar/>
        <div id="display-master" className="min-w-[40vw] bg-white px-4">
            <div id="display" className="h-full rounded-lg border-dashed border-2 border-gray-300">
            
            </div>
        </div>
      </div>
    </>
  );
};

export default AppMain;
