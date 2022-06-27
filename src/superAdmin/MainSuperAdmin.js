import React, { useContext } from "react";
import NavbarCustomized from "../Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { DarkModeContext } from "Context/DarkModeContext";
import "assets/style/MainSuperAdmin.css";
const MainSuperAdmin = () => {
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
          to="createuser"
        >
          Crear Usuario
        </NavLink>
      </nav>
      <div className={`mainsuperadmin-container ${darkMode ? "dark" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainSuperAdmin;
