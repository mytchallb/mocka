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
    }

    return (
        <>
        <div id="sidebar-master" className={`bg-gray-100 p-2 rounded-lg h-full flex ${(sidebarActive) ? 'flex-1' : ''}`}>
          <div id="content" className="flex h-full">
            <div id="sidebar" className='w-[250px] h-full pr-4 border-r-2 border-gray-200 p-4'>
              <div id="nav" className="flex items-center justify-between mb-10">
                <p className="font-bold text-2xl"><img src="/logo-800.png" alt="Mocka Logo" className='max-w-[150px]' /></p>
                <button className="mt-4" onClick={() => {setSidebarActive(!sidebarActive)}}>
                    <FontAwesomeIcon icon={faBars} className='text-lg' />
                </button>
              </div>
              <div id="searchbar">
                <select name="" id="" value={selectedLibrary} onChange={handleSelectLibrary}>
                    {libraryList.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </select>
              </div>
                {componentGroupList.map((item, index) => {
                    return (
                        <div className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-lg my-2 ${sidebarActiveGroup==index ? 'bg-gray-300 font-bold' : ''}`} key={index}
                        onMouseEnter={() => setSidebarActiveGroup(index)}
                        >
                            <p className='capitalize text-lg'>{item.name}</p>
                            <div className={`flex items-center justify-center h-[30px] w-[38px] font-bold rounded-lg ${sidebarActiveGroup==index ? 'bg-white' : 'bg-gray-300'}`}>{item.count}</div>
                        </div>
                    )
                })}
              </div>
            </div>
            <div id="components" className={`flex-1 h-full p-4 ${(sidebarActive) ? '' : 'hidden'}`}>

                {
                    componentGroupList[sidebarActiveGroup] && components.map((component, index) => {
                        console.log("component.group", component.group);
                        console.log("sidebarActiveGroup", sidebarActiveGroup);
                        console.log("componentGroupList[sidebarActiveGroup]", componentGroupList[sidebarActiveGroup]);

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