import { Link } from "react-router-dom";

import { CgMenuMotion } from "react-icons/cg";

import { toast } from "react-hot-toast";
import CustomNavLink from "../../../components/CustomNavLink/CustomNavLink";
import useAuth from "../../../hook/useAuth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      setTheme("dracula");
    } else {
      setTheme("light");
    }
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        // console.log("User Logged Out");
        toast.success(`User Logged Out Successfully!`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinks = (
    <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2">
      <li>
        <CustomNavLink to="/">Home</CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/blog">Blog</CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/allJobs">All Jobs</CustomNavLink>
      </li>

      {!user && (
        <li>
          <CustomNavLink to="/register">Register</CustomNavLink>
        </li>
      )}

      {user && (
        <>
          <li>
            <CustomNavLink to="/addJob">Add Job</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/myPostedJob">My Jobs</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/appliedJobs">Applied Jobs</CustomNavLink>
          </li>
        </>
      )}
    </div>
  );

  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <CgMenuMotion size={30} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <div>
          <img
            className="w-12"
            src="https://i.ibb.co/Pt6LLkv/room.png"
            alt=""
          />
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <span className="text-sm md:text-md lg:text-xl">Prime Scope</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div>
          <label className="cursor-pointer grid place-items-center ml-6 mr-2 md:mr-4">
            <input
              onChange={handleThemeToggle}
              type="checkbox"
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
        <div>
          {user ? (
            <div
              className="dropdown dropdown-end "
              data-tooltip-id="my-tooltip"
              data-tooltip-content={user?.displayName}
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="photo"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/userProfile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/updateProfile">Settings</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
