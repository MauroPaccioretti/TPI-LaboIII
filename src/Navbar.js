import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  useAuth,
  useAuthDispatch,
  useCapitalizeName,
} from "./Context/AuthContextProvider";
import { DarkModeContext } from "Context/DarkModeContext";

import "assets/style/Navbar.css";
import DarkModeSwitchBtn from "components/DarkModeSwitchBtn";

const NavbarCustom = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`navbar-route ${darkMode ? "dark" : ""}`}>
      <div className="div-name-logout">
        <span>
          Hola,{" "}
          <span className="user-name">
            {useCapitalizeName(auth.currentUser?.name)}{" "}
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
      <div className="div-name-logout">
        <DarkModeSwitchBtn />
      </div>
    </div>
  );
};

export default NavbarCustom;
