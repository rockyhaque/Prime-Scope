import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, children, ...props }) => {
  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }) =>
        `px-4 py-2 rounded transition duration-300 transform ${
          isActive
            ? "px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
            : "px-6 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:text-white hover:font-semibold hover:shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;