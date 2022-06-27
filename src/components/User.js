import React, { useState } from "react";
import "assets/style/User.css";
import Modal from "./Modal";

const User = ({ person, isSuperAdmin }) => {
  const [show, setShow] = useState(false);
  const { name, email, landsList, personType } = person;
  const handleDelete = (e) => {
    console.log(e.target.value);
    setShow(true);
  };

  const handleEdit = (e) => {
    console.log(e);
    setShow(true);
  };

  return (
    <div className="users-view-container">
      <ul>
        <h5>{name}</h5>
        <h6>Correo: {email}</h6>
        {isSuperAdmin && <h6>Tipo de cuenta: {personType.type}</h6>}
        <div className="land-list-container">
          {landsList.map((x) => (
            <div>
              {"Lote #"}
              {x.id}
            </div>
          ))}
        </div>
      </ul>
      {isSuperAdmin && (
        <div className="users-view__btn-container">
          <button className="users-view__btn-edit" onClick={handleEdit}>
            Editar Usuario
          </button>
          <button className="users-view__btn-delete" onClick={handleDelete}>
            Eliminar Usuario
          </button>
        </div>
      )}
      <Modal title={"Confimación"} onClose={() => setShow(false)} show={show}>
        <p>
          Esta seguro que desea eliminar el {personType.type}: {name}?
        </p>
      </Modal>
    </div>
  );
};

export default User;
