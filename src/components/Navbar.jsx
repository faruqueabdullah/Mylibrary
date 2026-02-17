import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar p-5 flex justify-between items-center border-b border-b-gray-200">
      <div className="logo flex gap-3 items-end">
        <img src="../../applogo.png" alt="logo" className="w-10" />
        <Link to={"/"}><span  className=" text-2xl">My Library</span></Link>
      </div>
      <div className="admin-icon flex gap-3 items-end">
        <img src="../../noavatar.png" alt="logo" className="w-8 rounded-full" />
        <span className="text-lg">Faruque</span>
      </div>
    </div>
  )
}
