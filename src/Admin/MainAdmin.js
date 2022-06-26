import React, { useContext } from "react";
import NavbarCustomized from "../Navbar";
import { NavLink, Outlet } from "react-router-dom";
import "assets/style/MainAdmin.css";
import { DarkModeContext } from "Context/DarkModeContext";

const MainAdmin = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div>
      <NavbarCustomized />
      <nav className={`tabs ${darkMode ? "dark" : ""}`}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? darkMode
                ? "active-style tab dark"
                : "active-style tab"
              : darkMode
              ? "tab dark"
              : "tab"
          }
          to="expensesunpaid"
        >
          Expensas Impagas
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? darkMode
                ? "active-style tab dark"
                : "active-style tab"
              : darkMode
              ? "tab dark"
              : "tab"
          }
          to="viewusers"
        >
          Ver Usuarios
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? darkMode
                ? "active-style tab dark"
                : "active-style tab"
              : darkMode
              ? "tab dark"
              : "tab"
          }
          to="payment"
        >
          Comprobantes
        </NavLink>
      </nav>
      <div className={`mainAdmin-container ${darkMode ? "dark" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainAdmin;
