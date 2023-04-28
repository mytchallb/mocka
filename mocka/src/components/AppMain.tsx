import { useEffect } from "react";
import Sidebar from "./Sidebar";

import { useAtom } from "jotai";
import {
  componentGroupListAtom,
  libraryListAtom,
  selectedLibraryAtom,
  darkModeAtom,
} from "../lib/store";
import { getLibraryComponents, getLibraries } from "../lib/lib";

const AppMain = (): JSX.Element => {
  const [selectedLibrary, setSelectedLibrary] = useAtom(selectedLibraryAtom);
  const [, setLibraryList] = useAtom(libraryListAtom);
  const [, setComponentGroupList] = useAtom(componentGroupListAtom);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    setLibraryList(getLibraries());
    setSelectedLibrary(getLibraries()[0]);
    setComponentGroupList(getLibraryComponents(getLibraries()[0]));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // const darkModeEnabled = html.classList.contains('dark');
    // if (darkModeEnabled) {
    //     html.classList.remove('dark');
    //     localStorage.setItem('darkModeEnabled', false);
    // } else {
    //     html.classList.add('dark');
    //     localStorage.setItem('darkModeEnabled', true);
    // }
  };

  return (
    <>
      <div className="flex h-full">
        <Sidebar />

        {/* <div id="display-master" className="min-w-[40vw] flex-1 bg-white px-4 h-full flex flex-col">
            <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-2'>
                <button className="h-[30px] w-[30px]" onClick={() => {toggleDarkMode()}}>
                    {darkMode ? (
                        <svg className='fill-gray-600 transition-colors hover:fill-gray-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M280 24V88c0 13.3-10.7 24-24 24s-24-10.7-24-24V24c0-13.3 10.7-24 24-24s24 10.7 24 24zm157 84.9l-45.3 45.3c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L403.1 75c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM108.9 75l45.3 45.3c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L75 108.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM24 232H88c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24zm400 0h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H424c-13.3 0-24-10.7-24-24s10.7-24 24-24zM154.2 391.8L108.9 437c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l45.3-45.3c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zm237.6-33.9L437 403.1c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-45.3-45.3c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM280 424v64c0 13.3-10.7 24-24 24s-24-10.7-24-24V424c0-13.3 10.7-24 24-24s24 10.7 24 24zm40-168a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-176 0a112 112 0 1 1 224 0 112 112 0 1 1 -224 0z"/></svg>
                    ) : (
                        <svg className='fill-gray-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M295.8 137.8c1 3.6 4.4 6.2 8.2 6.2s7.1-2.5 8.2-6.2l11-38.6 38.6-11c3.6-1 6.2-4.4 6.2-8.2s-2.5-7.1-6.2-8.2l-38.6-11-11-38.6c-1-3.6-4.4-6.2-8.2-6.2s-7.1 2.5-8.2 6.2l-11 38.6-38.6 11c-3.6 1-6.2 4.4-6.2 8.2s2.5 7.1 6.2 8.2l38.6 11 11 38.6zM403.8 310.8c1.6 5.5 6.6 9.2 12.2 9.2s10.7-3.8 12.2-9.2l16.6-58 58-16.6c5.5-1.6 9.2-6.6 9.2-12.2s-3.8-10.7-9.2-12.2l-58-16.6-16.6-58c-1.6-5.5-6.6-9.2-12.2-9.2s-10.7 3.8-12.2 9.2l-16.6 58-58 16.6c-5.5 1.6-9.2 6.6-9.2 12.2s3.8 10.7 9.2 12.2l58 16.6 16.6 58zM48 320c0-70 50-128.3 116.2-141.3C141.6 206.3 128 241.5 128 280c0 83.2 63.5 151.6 144.7 159.3c-23 15.6-50.8 24.7-80.7 24.7c-79.5 0-144-64.5-144-144zM192 128C86 128 0 214 0 320S86 512 192 512c69.4 0 130.2-36.9 163.9-92c5.3-8.7 4.6-19.9-2-27.8s-17.3-10.8-26.9-7.2c-12.1 4.5-25.3 7-39.1 7c-61.9 0-112-50.1-112-112c0-45 26.6-83.9 65-101.7c9.3-4.3 14.8-14 13.8-24.2s-8.4-18.6-18.3-20.9c-14.3-3.4-29.2-5.2-44.4-5.2z"/></svg>
                    )
                    }
                </button>
                <p>Convert [preview] from astro to react so can use state to remember darkmode</p>
            </div>
            <div id="display" className="flex-1 rounded-lg border-dashed border-2 border-gray-300">
            
            </div>
        </div> */}
      </div>
    </>
  );
};

export default AppMain;
