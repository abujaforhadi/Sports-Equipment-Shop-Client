import { useContext, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AuthContext } from "../Auth/AuthProvider";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="navbar  bg-blue-100  top-0 left-0 right-0 z-50 shadow">
      <div className="md:navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <AiOutlineMenuFold />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/profile">My Profile</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/services">Services</NavLink>
                  </li>
                  <li>
                    <NavLink to="/jobs">Jobs Apply</NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </>
          </ul>
        </div>

        <Link
          to="/"
          className="text-xl md:text-2xl font-medium text-red-600 inline-flex"
        >
          Bd<span className="text-green-500">Sports</span>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-products">All Products</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/add-equipment">Add Equipment</NavLink>
              </li>
              <li>
                <NavLink to="/my-equipment">My Equipment List</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {user && user.email ? (
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  user.photoURL ||
                  "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                }
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black text-white text-sm rounded-lg">
                  {user.displayName || "User"}
                </div>
              )}
            </div>

            <button
              onClick={logout}
              className="btn bg-[#403F3F] text-white hover:bg-[#2c2b2b] transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-[#403F3F] text-white hover:bg-[#2c2b2b] transition"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
