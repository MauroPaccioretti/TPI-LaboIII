import React from "react";
import { Outlet, Link } from "react-router-dom";

const NavbarCustom = () => {
  return (
    <div>
      <li>
        <Link to="/">Login</Link>
      </li>
      <li>
        <Link to="/user">User</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/notFound">NotFound</Link>
      </li>
      <Outlet />
    </div>
  );
};

export default NavbarCustom;
