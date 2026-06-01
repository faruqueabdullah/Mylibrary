import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { UseThemeContext } from "../Context/ThemeProvider";

export default function Global() {

  const{theme} = UseThemeContext()
  return (
    <div className="global">
        <Navbar />
        <div className="bodyContainer flex">
          <div className="menuContainer max-w-52 lg:w-full h-[calc(100vh-81px)] border-r border-r-soft-bg">
            <Menu />
          </div>
          <div className={`${theme?'bg-dark':'bg-softwhite'} w-full h-[calc(100vh-81px)] overflow-y-scroll scrollbar p-3`}>
            <Outlet />
          </div>
        </div>
      </div>
  )
}
