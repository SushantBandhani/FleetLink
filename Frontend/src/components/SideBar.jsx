import { useContext, useState } from "react"
import { getInitials } from "../utils/getUserInitials"
import { SIDE_MENU_DATA } from "../utils/SideBarData"
import { ActiveContext } from "../context/ActiveContext"
import { useNavigate } from "react-router-dom"


const SideBar = () => {
    const {active,setActive}=useContext(ActiveContext);
    const navigate=useNavigate();
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px]">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                <CharAvatar fullName={"Jhon Doe"} width='w-20' height="h-20" style="text-xl"></CharAvatar>
                <h5 className="text-gray-950 font-medium leading-6">
                    {"Jhon doe"}
                </h5>
            </div>

            {
                SIDE_MENU_DATA.map((item) => {
                   return <button
                        key={item.id}
                        className={`w-full flex items-center gap-4 text-[15px] ${active===item.label ? "text-white bg-blue-500" : ""} py-3 px-6 rounded-lg mb-3`}
                        onClick={() => {
                            setActive(item.label)
                            navigate(item.path)
                        }}
                    >
                        <item.icon />{item.label}
                    </button>
                })
            }

        </div>
    )
}



function CharAvatar({ fullName, width, height, style }) {
    return <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
        {
            getInitials(fullName)
        }
    </div>
}


export default SideBar