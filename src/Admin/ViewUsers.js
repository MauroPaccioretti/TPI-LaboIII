import React, { useEffect, useState } from "react";
import { customFetch } from "../utils/helpers";
import { useAuth } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import User from "components/User";
import "assets/style/ViewUsers.css";

const ViewUsers = () => {
  const auth = useAuth();
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    customFetch("GET", "/persons/withLands/", auth.token)
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setPersons(body);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="persons-container">
          {persons
            .filter((el) => el.personType.id == 3)
            .map((x) => (
              <User person={x} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
