import React, { useContext } from "react";
import NavbarCustomized from "../Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { DarkModeContext } from "Context/DarkModeContext";
import "assets/style/MainUsers.css";
const MainUsers = () => {
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
          to="mylands"
        >
          Mis Lotes
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
          to="myexpenses"
        >
          Mis Expensas
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
          to="editland"
        >
          Editar Lote
        </NavLink>
      </nav>
      <div className={`mainusers-container ${darkMode ? "dark" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainUsers;
