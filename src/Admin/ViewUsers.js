import React, { useEffect, useState } from "react";
import { customFetch, handleServerError } from "../utils/helpers";
import { useAuth, useAuthDispatch } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import User from "components/User";
import "assets/style/ViewUsers.css";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ViewUsers = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const refetchData = () => {
    setLoading(true);
    customFetch("GET", "/persons/withLands/", auth.token)
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          // if (err === 401) {
          //   navigate("login");
          // }
          return;
        }
        return res.json();
      })
      .then((body) => {
        setPersons(body);
        setLoading(false);
      });
  };

  useEffect(() => {
    customFetch("GET", "/persons/withLands/", auth.token)
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          // if (err === 401) {
          //   navigate("login");
          // }
          return;
        }
        return res.json();
      })
      .then((body) => {
        setPersons(body);
        setLoading(false);
      });
  }, []);

  const editUser = (personToEdit) => {
    setIsUpdate(true);
    setPerson(personToEdit);
    navigate(`${personToEdit.id}`);
  };

  const personTypeToFilter =
    auth.currentUser?.role === "Super Admin" ? [2, 3] : [3];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="persons-container">
          {!persons ? (
            <p>No hay usuarios para mostrar</p>
          ) : (
            persons
              .filter((el) => personTypeToFilter.indexOf(el.personType.id) > -1)
              .map((x) => (
                <User
                  key={x.id}
                  person={x}
                  isSuperAdmin={auth.currentUser?.role === "Super Admin"}
                  refetchData={refetchData}
                  editUser={editUser}
                />
              ))
          )}
        </div>
      )}
      <Outlet context={{ isUpdate, person }} />
    </div>
  );
};

export default ViewUsers;
