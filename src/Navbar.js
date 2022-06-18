import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuthDispatch } from "./Context/AuthContextProvider";

const NavbarCustom = () => {
  const dispatch = useAuthDispatch();
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
      <Link to="/">
        <button
          onClick={() => {
            dispatch.logout();
          }}
        >
          Logout
        </button>
      </Link>
      {/* <Outlet /> */}
    </div>
  );
};

export default NavbarCustom;
