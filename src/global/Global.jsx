import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";

export default function Global() {
  return (
    <div className="global bg-main-color text-dark-bg">
        <Navbar />
        <div className="bodyContainer flex">
          <div className="menuContainer w-64 h-[calc(100vh-81px)] border-r border-r-soft-bg p-5">
            <Menu />
          </div>
          <div className="contentContainer bg-soft-bg w-full h-[calc(100vh-81px)] p-5 overflow-y-scroll scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
  )
}
