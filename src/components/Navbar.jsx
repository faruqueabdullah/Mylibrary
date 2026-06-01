import { Link } from "react-router-dom";
import { UseThemeContext } from "../Context/ThemeProvider";
import { useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = UseThemeContext();

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(theme));
  }, [theme]);

  return (
    <div
      className={`${theme ? "bg-dark text-softwhite" : "bg-softwhite text-dark"} p-5 flex justify-between items-center border-b border-b-gray-200`}
    >
      <div className="logo flex gap-3 items-end">
        <img src="./applogo.png" alt="logo" className="w-10" />
        <Link to={"/"}>
          <span className="text-lg sm:text-2xl">My Library</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div onClick={() => setTheme((prev) => !prev)}>
          <div className="flex items-center gap-2 text-lg cursor-pointer">
            <img
              src={theme ? "./light_mode.png" : "./dark_mode.png"}
              alt="theme_icon"
            />
            <span className="hidden lg:block">{theme ? "Light mode" : "Dark mode"}</span>
          </div>
        </div>
        <div className="admin-icon flex gap-3 items-end">
          <img src="./noavatar.png" alt="logo" className="w-8 rounded-full" />
          <span className="hidden sm:block text-lg">Faruque</span>
        </div>
      </div>
    </div>
  );
}
