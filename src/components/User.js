import React from "react";
import "assets/style/User.css";

const User = ({ person }) => {
  const { name, email, landsList } = person;

  return (
    <div className="users-view-container">
      <ul>
        <h5>{name}</h5>
        <h6>Correo: {email}</h6>
        <div className="land-list-container">
          {landsList.map((x) => (
            <div>
              {"Lote#"}
              {x.id}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default User;
