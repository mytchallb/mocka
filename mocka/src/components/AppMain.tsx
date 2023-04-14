// import component-list.json
import components from '../../component-list.json'


const AppMain = (): JSX.Element => {

    console.log(components)

    return (
    <>
    <div className="bg-white p-2 flex">
    <div className="bg-gray-200 p-2 rounded-lg w-[60vw]">
        <div id="content" className="">
            <div id="sidebar">
                <div id="nav" className="flex justify-between">
                    <p className="font-bold text-2xl">Mocka</p>
                    <button>Toggle</button>
                </div>
                <div id="searchbar">

                </div>
                <div id="component-list">

                </div>

            </div>
            <div id="components">

            </div>
        </div>
        
    </div>
    <div className="w-[40vw] bg-white">

        </div>
    </div>
    </>);
}

export default AppMain;
