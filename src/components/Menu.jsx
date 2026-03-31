import { Link } from "react-router-dom";
import { menu } from "../../data";

export default function Menu() {
  return (
    <div className="menucontainer flex flex-col justify-between h-full">
      <div className="menus flex flex-col gap-3 ">
        {menu.map((items) => {
          return (
            <Link to={items.url}>
              <div
                className="logout flex gap-3 hover:bg-gray-50 p-2"
                key={items.id}
              >
                <img
                  src={`../../${items.icon}`}
                  alt={items.title}
                  className="w-6"
                />
                <span className="hidden lg:block">{items.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="logout flex gap-3">
        <img src="./logout.png" alt="logout" className="w-6" />
        <span className="hidden lg:block">Logout</span>
      </div>
    </div>
  );
}
