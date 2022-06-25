import React from "react";
import NavbarCustome from "../Navbar";
import { NavLink, Outlet } from "react-router-dom";
import "assets/style/MainAdmin.css";

const MainAdmin = () => {
  return (
    <div>
      <NavbarCustome />
      MainAdmin
      <nav className="tabs">
        <NavLink
          className={({ isActive }) => (isActive ? "active-style tab" : "tab")}
          to="expensesunpaid"
        >
          Expensas Impagas
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-style tab" : "tab")}
          to="viewusers"
        >
          Ver Usuarios
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-style tab" : "tab")}
          to="payment"
        >
          Comprobantes
        </NavLink>
      </nav>
      <div className="mainadmin-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainAdmin;
