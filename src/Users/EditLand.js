import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContextProvider";
import { customFetch } from "../utils/helpers";
import Loading from "components/Loading";
import EditLandBtn from "components/EditLandBtn";
import { Outlet } from "react-router-dom";

const EditLand = () => {
  const auth = useAuth();
  const [lands, setLands] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customFetch("GET", "/land/" + auth.currentUser.id, auth.token)
      .then((res) => res.json())
      .then((body) => {
        setLands(body);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="card-container">
          {lands.length > 0
            ? lands.map((x) => <EditLandBtn key={x.id} id={x.id} />)
            : "No hay lotes para mostrar"}
        </div>
      )}
      <Outlet context={{ lands }} />
    </div>
  );
};

export default EditLand;
