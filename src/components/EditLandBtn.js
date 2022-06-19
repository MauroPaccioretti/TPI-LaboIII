import Button from "react-bootstrap/Button";
import React from "react";
import "assets/style/EditLandBtn.css";
import { NavLink, Outlet } from "react-router-dom";

const EditLandBtn = ({ land }) => {
  return (
    <NavLink to={`${land.id}`}>
      <Button variant="success" size="lg" className="edit-land-btn">
        <div>Editar lote #{land.id}</div>
      </Button>
    </NavLink>
  );
};

export default EditLandBtn;
