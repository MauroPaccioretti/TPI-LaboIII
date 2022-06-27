import React, { useEffect, useState } from "react";
import { customFetch, handleServerError } from "../utils/helpers";
import { useAuth, useAuthDispatch } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import User from "components/User";
import "assets/style/ViewUsers.css";
import { toast } from "react-toastify";

const ViewUsers = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    customFetch("GET", "/persons/withLands/", auth.token)
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
        return res.json();
      })
      .then((body) => {
        // console.log(body);
        setPersons(body);
        setLoading(false);
      });
  }, []);

  const personTypeToFilter =
    auth.currentUser.role === "Super Admin" ? [2, 3] : [3];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="persons-container">
          {persons
            .filter((el) => personTypeToFilter.indexOf(el.personType.id) > -1)
            .map((x) => (
              <User
                person={x}
                isSuperAdmin={auth.currentUser.role === "Super Admin"}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
