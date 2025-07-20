import { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideBar from "./SideBar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
          className="block text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-medium text-black">FleetLink</h2>

        {openSideMenu && (
          <div className="fixed top-[61px] -ml-4 bg-white">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <SideBar />
            </ErrorBoundary>
            <p>Hello</p>
          </div>
        )}
      </div>
      <div className={`${openSideMenu ? 'ml-70 transition-all duration-200' : 'ml-0 transition-all duration-200'}`}>
        <Outlet></Outlet>
      </div>

    </>

  );
};

export default Layout;
