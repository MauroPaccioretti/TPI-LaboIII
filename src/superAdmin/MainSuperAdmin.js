import React, { useContext, useEffect, useState } from "react";
import NavbarCustomized from "../Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { DarkModeContext } from "Context/DarkModeContext";
import "assets/style/MainSuperAdmin.css";
import { useNavigate } from "react-router-dom";

const MainSuperAdmin = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [person, setPerson] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const editUser = (personToEdit) => {
    setPerson(personToEdit);
    setIsUpdate(true);
    navigate(`updateuser/${personToEdit.id}`);
  };

  useEffect(() => {
    setIsUpdate(false);
  }, []);

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
        <Outlet context={{ editUser, isUpdate, person }} />
      </div>
    </div>
  );
};

export default MainSuperAdmin;
