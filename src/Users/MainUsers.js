import React from "react";
import NavbarCustome from "../Navbar";
import { NavLink, Outlet } from "react-router-dom";
import "assets/style/MainUsers.css";

const MainUsers = () => {
  return (
    <div>
      <NavbarCustome />
      MainUsers
      <nav className="tabs">
        <NavLink
          className={({ isActive }) => (isActive ? "active-style tab" : "tab")}
          to="mylands"
        >
          Mis Lotes
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-style tab" : "tab")}
          to="myexpenses"
        >
          Mis Expensas
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-style tab" : "tab")}
          to="editland"
        >
          Editar Lote
        </NavLink>
      </nav>
      <div className="mainusers-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainUsers;
