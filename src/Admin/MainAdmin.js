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
        <NavLink activeClassName="active" className="tab" to="expensesunpaid">
          Expensas Inpagas
        </NavLink>
        <NavLink activeClassName="active" className="tab" to="viewusers">
          Ver Usuarios
        </NavLink>
        <NavLink activeClassName="active" className="tab" to="payment">
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
