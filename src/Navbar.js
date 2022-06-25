import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  useAuth,
  useAuthDispatch,
  useCapitalizeName,
} from "./Context/AuthContextProvider";
import "assets/style/Navbar.css";

const NavbarCustom = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  return (
    <div className="navbar-route">
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
      <div className="div-name-logout">
        <span>
          Hola,{" "}
          <span className="user-name">
            {useCapitalizeName(auth.currentUser?.name)}
          </span>
          <Link to="/">
            <button
              class="logout-btn"
              onClick={() => {
                dispatch.logout();
              }}
            >
              Cerrar Sesión
            </button>
          </Link>
        </span>
      </div>

      {/* <Outlet /> */}
    </div>
  );
};

export default NavbarCustom;
