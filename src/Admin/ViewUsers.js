import React, { useEffect, useState } from "react";
import {
  customFetch,
  customFetchWithBody,
  handleServerError,
} from "../utils/helpers";
import { useAuth, useAuthDispatch } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import User from "components/User";
import "assets/style/ViewUsers.css";
import { toast } from "react-toastify";
// import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const ViewUsers = () => {
  const { editUser } = useOutletContext() || {};
  // const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownerChangeOptions, setOwnerChangeOptions] = useState();
  const [personId, setPersonId] = useState(0);
  const [landsId, setLandsId] = useState([]);
  const [landId, setLandId] = useState(0);

  // const [person, setPerson] = useState({});
  // const [isUpdate, setIsUpdate] = useState(false);

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

  const fetchPersonsWithLands = () => {
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
    fetchPersonsWithLands();
    customFetch("GET", "/land", auth.token)
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
        return res.json();
      })
      .then((body) => {
        setLandsId(body.map((x) => x.id));
      });
  }, []);

  // const editUser = (personToEdit) => {
  //   setIsUpdate(true);
  //   setPerson(personToEdit);
  //   navigate(`${personToEdit.id}`);
  // };

  const personTypeToFilter =
    auth.currentUser?.role === "Super Admin" ? [1, 2, 3] : [3];

  const toggleChangeOwnerClick = () => {
    setOwnerChangeOptions(!ownerChangeOptions);
  };

  const handlePersonSelectChange = (e) => {
    setPersonId(Number(e.target.value));
  };
  const handleLandSelectChange = (e) => {
    setLandId(Number(e.target.value));
  };

  const handleChangeOwnerClick = () => {
    if (!personId || !landId) {
      toast.error("Debe seleccionar elementos.");
      return;
    }
    const newOwner = persons.filter((x) => x.id === personId)[0];
    const newOwnerPrevLands = newOwner.landsList;
    const existingLand = !!newOwnerPrevLands.find((x) => x.id === landId);
    if (existingLand) {
      toast.error(`${newOwner.name} ya es dueño de ese lote.`);
    }
    customFetchWithBody(
      "PUT",
      "/land/changeowner/" + landId,
      { personId: personId },
      auth.token
    )
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
        toast.success(`${newOwner.name} es el nuevo dueño del lote #${landId}`);
      })
      .then(() => {
        fetchPersonsWithLands();
      });
  };
  return (
    <div>
      <div className="p-2 mb-2 mx-auto d-flex justify-content-center flex-column align-items-center flex-wrap">
        <Button
          className="p-2 m-2 mb-2"
          variant="success"
          onClick={toggleChangeOwnerClick}
        >
          Cambiar dueño de un lote
        </Button>
        {ownerChangeOptions && (
          <div className="d-flex flex-column justify-content-center change-ownwer__container">
            <h5>Nuevo dueño:</h5>
            <Form.Select
              aria-label="Default select example"
              className="mb-3 mt-2"
              value={personId}
              onChange={(e) => {
                handlePersonSelectChange(e);
              }}
            >
              <option value={0}>Seleccione usuario</option>
              {persons ? (
                persons.map((x) => {
                  return (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  );
                })
              ) : (
                <option>Cargando...</option>
              )}
            </Form.Select>
            <h5>Lote a modificar:</h5>
            <Form.Select
              aria-label="Default select example"
              className="mb-3 mt-1"
              value={landId}
              onChange={(e) => {
                handleLandSelectChange(e);
              }}
            >
              <option value={0}>Seleccione un lote</option>
              {landsId ? (
                landsId.map((x) => {
                  return (
                    <option key={x} value={x}>
                      # {x}
                    </option>
                  );
                })
              ) : (
                <option>Cargando...</option>
              )}
            </Form.Select>
            <Button
              className="p-2 m-2 mb-4"
              variant="success"
              onClick={handleChangeOwnerClick}
            >
              Modificar!
            </Button>
          </div>
        )}
      </div>
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
      {/* <Outlet context={{ isUpdate, person }} /> */}
    </div>
  );
};

export default ViewUsers;
