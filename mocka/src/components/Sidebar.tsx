import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCode } from "@fortawesome/free-solid-svg-icons";
import components from "../../src/component-list.json";

import { useAtom } from "jotai";
import {
  sidebarActiveAtom,
  componentGroupListAtom,
  selectedLibraryAtom,
  sidebarActiveGroupAtom,
  libraryListAtom,
  darkModeAtom,
} from "../lib/store";
import { getLibraryComponents } from "../lib/lib";
import { useEffect, useRef } from "react";

export default function Sidebar() {
  const [sidebarActive, setSidebarActive] = useAtom(sidebarActiveAtom);
  const [sidebarActiveGroup, setSidebarActiveGroup] = useAtom(
    sidebarActiveGroupAtom
  );
  const [selectedLibrary, setSelectedLibrary] = useAtom(selectedLibraryAtom);
  const [componentGroupList, setComponentGroupList] = useAtom(
    componentGroupListAtom
  );
  const [libraryList] = useAtom(libraryListAtom);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const htmlRef = useRef(null);

  const handleSelectLibrary = (e: any) => {
    setSelectedLibrary(e.target.value);
    setComponentGroupList(getLibraryComponents(e.target.value));
    setSidebarActiveGroup(0);
  };

  useEffect(() => {
    const html = htmlRef.current;
    console.log("html", html);
    if (html) {
      if (darkMode) {
        html.classList.add("dark");
        localStorage.setItem("darkModeEnabled", true);
      } else {
        html.classList.remove("dark");
        localStorage.setItem("darkModeEnabled", false);
      }
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log("toggle dark mode");
  };

  // Have a spotlight mode when you hover over compoennts?
  // add to json, captureElementWidth
  // classnamesToAdd

  return (
    <>
      <div
        id="sidebar-master"
        className={`bg-gray-100 dark:bg-gray-800 p-2 rounded-lg h-full flex ${
          sidebarActive ? "flex-1" : ""
        }`}
      >
        <div id="content" className="flex h-full">
          <div
            id="sidebar"
            className="w-[250px] h-full pr-4 border-r-2 border-gray-200 p-4 flex flex-col"
          >
            <div id="nav" className="flex items-center justify-between mb-2">
              <p className="font-bold text-2xl">
                <a href="/app">
                  <img
                    src="/logo-800.png"
                    alt="Mocka Logo"
                    className="max-w-[150px]"
                  />
                </a>
              </p>
            </div>

            {/* Settings */}
            <div>
              <button
                className="h-[30px] w-[30px]"
                onClick={() => {
                  toggleDarkMode();
                }}
              >
                {darkMode ? (
                  <svg
                    className="fill-gray-600 transition-colors hover:fill-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M280 24V88c0 13.3-10.7 24-24 24s-24-10.7-24-24V24c0-13.3 10.7-24 24-24s24 10.7 24 24zm157 84.9l-45.3 45.3c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L403.1 75c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM108.9 75l45.3 45.3c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L75 108.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM24 232H88c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24zm400 0h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H424c-13.3 0-24-10.7-24-24s10.7-24 24-24zM154.2 391.8L108.9 437c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l45.3-45.3c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zm237.6-33.9L437 403.1c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-45.3-45.3c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM280 424v64c0 13.3-10.7 24-24 24s-24-10.7-24-24V424c0-13.3 10.7-24 24-24s24 10.7 24 24zm40-168a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-176 0a112 112 0 1 1 224 0 112 112 0 1 1 -224 0z" />
                  </svg>
                ) : (
                  <svg
                    className="fill-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M295.8 137.8c1 3.6 4.4 6.2 8.2 6.2s7.1-2.5 8.2-6.2l11-38.6 38.6-11c3.6-1 6.2-4.4 6.2-8.2s-2.5-7.1-6.2-8.2l-38.6-11-11-38.6c-1-3.6-4.4-6.2-8.2-6.2s-7.1 2.5-8.2 6.2l-11 38.6-38.6 11c-3.6 1-6.2 4.4-6.2 8.2s2.5 7.1 6.2 8.2l38.6 11 11 38.6zM403.8 310.8c1.6 5.5 6.6 9.2 12.2 9.2s10.7-3.8 12.2-9.2l16.6-58 58-16.6c5.5-1.6 9.2-6.6 9.2-12.2s-3.8-10.7-9.2-12.2l-58-16.6-16.6-58c-1.6-5.5-6.6-9.2-12.2-9.2s-10.7 3.8-12.2 9.2l-16.6 58-58 16.6c-5.5 1.6-9.2 6.6-9.2 12.2s3.8 10.7 9.2 12.2l58 16.6 16.6 58zM48 320c0-70 50-128.3 116.2-141.3C141.6 206.3 128 241.5 128 280c0 83.2 63.5 151.6 144.7 159.3c-23 15.6-50.8 24.7-80.7 24.7c-79.5 0-144-64.5-144-144zM192 128C86 128 0 214 0 320S86 512 192 512c69.4 0 130.2-36.9 163.9-92c5.3-8.7 4.6-19.9-2-27.8s-17.3-10.8-26.9-7.2c-12.1 4.5-25.3 7-39.1 7c-61.9 0-112-50.1-112-112c0-45 26.6-83.9 65-101.7c9.3-4.3 14.8-14 13.8-24.2s-8.4-18.6-18.3-20.9c-14.3-3.4-29.2-5.2-44.4-5.2z" />
                  </svg>
                )}
              </button>
            </div>
            <div id="searchbar">
              <div className="relative inline-block w-full">
                <select
                  name=""
                  id="select-library"
                  value={selectedLibrary}
                  onChange={handleSelectLibrary}
                  onMouseOver={(event: any) => {
                    console.log("clicked");
                    event.target.focus();
                  }}
                  className="relative appearance-none p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg w-full mb-4 bg-transparent border-2 border-gray-300 text-gray-600 capitalize"
                >
                  <option disabled>Component Library:</option>
                  {libraryList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <span className="absolute top-4 right-2 flex items-center px-2 pointer-events-none">
                  <svg
                    className="fill-gray-400 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {componentGroupList.map((item, index) => {
                return (
                  <div
                    className={`text-gray-700 flex items-center justify-between cursor-pointer px-4 py-2 rounded-lg my-2 ${
                      sidebarActiveGroup == index ? "bg-gray-300 font-bold" : ""
                    }`}
                    key={index}
                    onMouseEnter={() => setSidebarActiveGroup(index)}
                  >
                    <p className="capitalize text-lg text-[15px]">
                      {item.name}
                    </p>
                    <div
                      className={`flex items-center justify-center h-[30px] w-[38px] font-bold rounded-lg ${
                        sidebarActiveGroup == index ? "bg-white" : "bg-gray-300"
                      }`}
                    >
                      {item.count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          id="components"
          className={`overflow-y-auto flex-1 h-full p-4 ${
            sidebarActive ? "" : "hidden"
          }`}
        >
          {componentGroupList[sidebarActiveGroup] &&
            components.map((component, index) => {
              if (
                component.group.toLowerCase() ===
                componentGroupList[sidebarActiveGroup].name.toLowerCase()
              ) {
                return (
                  <img
                    key={index}
                    src={`/component-previews/${component.library}/${component.group}/${component.name}.webp`}
                    alt={`${component.name} component preview`}
                    className="w-full rounded mb-4 cursor-pointer shadow-md"
                  />
                );
              }
            })}
        </div>
      </div>
    </>
  );
}
