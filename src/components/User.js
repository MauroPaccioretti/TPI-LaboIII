import React, { useContext, useState } from "react";
import "assets/style/User.css";
import Modal from "./Modal";
import { customFetch, handleServerError } from "utils/helpers";
import { useAuth, useAuthDispatch } from "Context/AuthContextProvider";
import { toast } from "react-toastify";
// import { DarkModeContext } from "Context/DarkModeContext";

const User = ({ person, isSuperAdmin, refetchData }) => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const [show, setShow] = useState(false);
  const { name, email, landsList, personType } = person;
  // const { darkMode } = useContext(DarkModeContext);
  const handleDelete = () => {
    setShow(true);
  };

  const handleEdit = () => {
    console.log("navigate to :userId");
  };

  const handleConfirmDelete = () => {
    // return;
    customFetch("DELETE", "/persons/" + person.id, auth.token)
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          console.log(err);
          return;
        }
        toast.success(`Usuario ${name} eliminado.`);
        setShow(false);
      })
      .then(() => {
        refetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="users-view-container">
      <ul>
        <h5>{name}</h5>
        <h6>Correo: {email}</h6>
        {isSuperAdmin && <h6>Tipo de cuenta: {personType.type}</h6>}
        <div className="land-list-container">
          {landsList.map((x) => (
            <div key={x.id}>
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
      <Modal
        title={"Confimación"}
        onClose={() => setShow(false)}
        onConfirm={handleConfirmDelete}
        show={show}
      >
        <p>
          Esta seguro que desea eliminar el {personType.type}: {name}?
        </p>
      </Modal>
    </div>
  );
};

export default User;
