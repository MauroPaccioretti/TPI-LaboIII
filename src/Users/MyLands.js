import React, { useEffect, useState } from "react";
import { customFetch } from "../utils/helpers";
import { useAuth } from "../Context/AuthContextProvider";
import CardLand from "./CardLand";
import Loading from "components/Loading";

const MyLands = () => {
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
            ? lands.map((x) => <CardLand key={x.id} land={x} />)
            : "No hay lotes para mostrar"}
        </div>
      )}
    </div>
  );
};

export default MyLands;
