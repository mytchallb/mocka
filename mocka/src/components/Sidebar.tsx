import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import components from '../../src/component-list.json';

import { useAtom } from 'jotai';
import {sidebarActiveAtom, componentGroupListAtom, selectedLibraryAtom, sidebarActiveGroupAtom, libraryListAtom } from '../lib/store';
import { getLibraryComponents } from '../lib/lib';

export default function Sidebar () {

    const [sidebarActive, setSidebarActive] = useAtom(sidebarActiveAtom); 
    const [sidebarActiveGroup, setSidebarActiveGroup] = useAtom(sidebarActiveGroupAtom);
    const [selectedLibrary, setSelectedLibrary] = useAtom(selectedLibraryAtom);
    const [componentGroupList, setComponentGroupList] = useAtom(componentGroupListAtom);
    const [libraryList,] = useAtom(libraryListAtom);

    const handleSelectLibrary = (e: any) => {
        setSelectedLibrary(e.target.value);
        setComponentGroupList(getLibraryComponents(e.target.value));
        setSidebarActiveGroup(0)
    }

    return (
        <>
        <div id="sidebar-master" className={`bg-gray-100 p-2 rounded-lg h-full flex ${(sidebarActive) ? 'flex-1' : ''}`}>
          <div id="content" className="flex h-full">
            <div id="sidebar" className='w-[250px] h-full pr-4 border-r-2 border-gray-200 p-4'>
              <div id="nav" className="flex items-center justify-between mb-10">
                <p className="font-bold text-2xl">
                    <a href="/app">
                        <img src="/logo-800.png" alt="Mocka Logo" className='max-w-[150px]' />
                    </a>
                </p>
                <button className="mt-4" onClick={() => {setSidebarActive(!sidebarActive)}}>
                    <FontAwesomeIcon icon={faBars} className='text-lg' />
                </button>
              </div>
              <div id="searchbar">


                <div className="relative inline-block w-full">
                    <select
                        name=""
                        id=""
                        value={selectedLibrary}
                        onChange={handleSelectLibrary}
                        className="relative appearance-none p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg w-full mb-4 bg-transparent border-2 border-gray-300 text-gray-600 capitalize"
                    >
                        <option disabled>Component Library:</option>
                        {libraryList.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                    </select>
                    <span className="absolute top-4 right-2 flex items-center px-2 pointer-events-none">
                        <svg className="fill-gray-400 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                    </span>
                </div>


              </div>
                {componentGroupList.map((item, index) => {
                    return (
                        <div className={`text-gray-700 flex items-center justify-between cursor-pointer px-4 py-2 rounded-lg my-2 ${sidebarActiveGroup==index ? 'bg-gray-300 font-bold' : ''}`} key={index}
                        onMouseEnter={() => setSidebarActiveGroup(index)}
                        >
                            <p className='capitalize text-lg '>{item.name}</p>
                            <div className={`flex items-center justify-center h-[30px] w-[38px] font-bold rounded-lg ${sidebarActiveGroup==index ? 'bg-white' : 'bg-gray-300'}`}>{item.count}</div>
                        </div>
                    )
                })}
              </div>
            </div>
            <div id="components" className={`flex-1 h-full p-4 ${(sidebarActive) ? '' : 'hidden'}`}>

                {
                    componentGroupList[sidebarActiveGroup] && components.map((component, index) => {
                        if (component.group.toLowerCase() === componentGroupList[sidebarActiveGroup].name.toLowerCase()) {
                            return (
                                <img
                                    key={index}
                                    src={`/component-previews/${component.library}/${component.group}/${component.name}.webp`}
                                    alt={`${component.name} component preview`}
                                    className='w-full rounded-lg mb-4 cursor-pointer shadow-sm'
                                />
                            )
                        }
                    
                    })
                }
            </div>
          </div>
        </>
    );
};