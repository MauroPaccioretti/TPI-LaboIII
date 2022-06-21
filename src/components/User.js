import React from "react";
import "assets/style/User.css";

const User = ({ person }) => {
  const { name, email } = person;

  return (
    <div className="person-by-user">
      <ul>
        <li>{name}</li>
        {email}
      </ul>
    </div>
  );
};

export default User;
