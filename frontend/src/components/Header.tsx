import React, { useEffect, useState } from "react";
import logo from "../assets/Cart-Light.svg";
import { Link, Navigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Header = () => {
  const [_logged, set_logged] = useState(false);

  const { logout } = useLogout();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      set_logged(true);
    } else {
      set_logged(false);
    }
  }, [user, _logged]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <nav className="bg-white px-4 py-2.5 dark:bg-slate-700 lg:px-6 ">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between ">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9 " alt="Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Inventory Management
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {!_logged ? (
              <>
                <Navigate to="/" />
                <Link
                  to="/login"
                  className="mr-2 rounded-lg border border-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="mr-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:px-5 lg:py-2.5"
                >
                  Get started
                </Link>
              </>
            ) : (
              <>
                <a
                  onClick={handleLogout}
                  className="mr-2 cursor-pointer rounded-lg border border-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5"
                >
                  Log out
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
