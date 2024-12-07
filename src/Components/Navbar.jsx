import { useEffect, useContext, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AuthContext } from "../Auth/AuthProvider";
import { Link, NavLink } from "react-router"; 
import { themeChange } from "theme-change";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    themeChange(false); // Initialize theme-change
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/all-products" },
    { name: "Add Equipment", path: "/add-equipment", authRequired: true },
    { name: "My Equipment List", path: "/my-equipment", authRequired: true },
  ];

  return (
    <div className="navbar top-0 left-0 right-0 z-50 shadow bg-base-100 dark:text-white">
      {/* Logo and Mobile Menu */}
      <div className="md:navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <AiOutlineMenuFold />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:text-white"
            role="menu"
          >
            {navLinks.map(
              (link) =>
                (!link.authRequired || user) && (
                  <li key={link.name} role="menuitem">
                    <NavLink to={link.path} className="capitalize">
                      {link.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
        <Link to="/" className="text-xl md:text-2xl font-medium text-red-600">
          Bd<span className="text-green-500">Sports</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal text-primary px-1 ">
          {navLinks.map(
            (link) =>
              (!link.authRequired || user) && (
                <li key={link.name}>
                  <NavLink to={link.path} className="capitalize">
                    {link.name}
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        
          
          <input type="checkbox" value="dark" className="toggle theme-controller" />
        {user && user.email ? (
          <div className="flex items-center gap-4">
            <img
              src={user.photoURL || "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"}
              alt={user.displayName || "User"}
              
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
            />
            <button
              onClick={handleLogout}
              className="btn bg-[#403F3F] text-white hover:bg-[#2c2b2b] transition"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
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
