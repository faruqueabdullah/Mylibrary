import { NavLink } from "react-router-dom";
import { menu } from "../../data";
import { UseThemeContext } from "../Context/ThemeProvider";
import { UseFirebaseContext } from "../Context/Firebaseprovider";

export default function Menu() {
  // const { theme } = UseThemeContext();
  const { logout } = UseFirebaseContext();

  return (
    <div
      className={`bg-dark text-softwhite flex flex-col justify-between h-full w-full p-1`}
    >
      <div className="menus flex flex-col gap-3 ">
        {menu.map((items) => {
          return (
            <NavLink
              to={items.url}
              className={({ isActive }) =>
                `
                   px-3 py-1 rounded-md transition-colors
                ${
                  isActive
                    ? "bg-main text-softwhite"
                    : "hover:bg-main text-softwhite"
                }
                `
              }
            >
              <div className="logout flex gap-3 p-2" key={items.id}>
                <img
                  src={`./${items.icon}`}
                  alt={items.title}
                  className="w-6"
                />
                <span className="hidden lg:block">{items.title}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div
        className="logout flex gap-3 p-2 md:p-3 cursor-pointer hover:bg-main rounded"
        onClick={logout}
      >
        <img src="./logout.png" alt="logout" className="w-6" />
        <span className="hidden lg:block">Logout</span>
      </div>
    </div>
  );
}
