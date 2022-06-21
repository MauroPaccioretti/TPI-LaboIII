import Button from "react-bootstrap/Button";
import React from "react";
import "assets/style/EditLandBtn.css";
import { NavLink } from "react-router-dom";

const EditLandBtn = ({ id }) => {
  return (
    <NavLink to={`${id}`}>
      <Button variant="success" size="lg" className="edit-land-btn">
        <div>Editar lote #{id}</div>
      </Button>
    </NavLink>
  );
};

export default EditLandBtn;
