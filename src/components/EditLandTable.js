import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { tableNames } from "utils/constants/serverConstants";
import SelectAuxTable from "../components/SelectAuxTable";
import "assets/style/EditLandTable.css";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditLandTable = () => {
  const { landId } = useParams();
  const { lands } = useOutletContext();
  const [landProps, setLandProps] = useState([]);
  const [landData, setLandData] = useState({});

  let land = {};
  let landValues = [];

  if (lands.length > 0) {
    land = lands.filter((x) => x.id === Number(landId))[0];
    landValues = tableNames().map((x) => ({
      ...x,
      landPropId: land[x.prop].id,
    }));
  }
  //TODO: verificar que pasa con landValues y newLandValues ("mismos valores?")
  const handleChange = (e) => {
    const key = Object.keys(e)[0];
    const index = landValues.findIndex((x) => x.table === Object.keys(e)[0]);
    let newLandProps = [...landValues];
    newLandProps[index].landPropId = e[key].id;
    setLandProps((landProps) => [
      ...newLandProps.map((x) => ({ [`${x.table}Id`]: x.landPropId })),
    ]);
  };

  const handleEditClick = () => {
    if (landProps.length === 0) {
      toast.error("Debe modificar valores");
      return;
    }
    toast.success("Datos modificados");
  };

  //reduced devuelve el objeto necesario para enviar a backend, ubicarlo donde corresponda
  // Probablemente refactorizar handleChange
  // Agregar validacion de editar el lote cuando se modifique algun valor primero
  // Verificar que el valor sea nuevo?? (cambiar 2 veces permitiria mismo valor)

  //Mostrar valor total de las expensas?
  // Dividir tabla en secciones? Quizas desde css pasando table como parte de className

  // Existe 'beforeDestroyed' para avisarle al usuario que no edito los valores y q
  // va a perder el progreso de las modificaciones??
  useEffect(() => {
    const reduced = landProps.reduce((acc, prop) => {
      return { ...acc, [Object.keys(prop)]: Object.values(prop)[0] };
    }, {});
    setLandData((landData) => ({ ...reduced }));
  }, [landProps]);

  return (
    <div className="edit-land-table--container">
      <h3>Editar Lote #{landId}</h3>
      <Button variant="success" onClick={handleEditClick}>
        Editar!
      </Button>
      {landValues.length > 0 &&
        tableNames().map((x, index) => (
          <SelectAuxTable
            key={x.id}
            label={x.name}
            tableName={x.table}
            value={landValues[index].landPropId}
            onChange={handleChange}
          />
        ))}
      <ToastContainer />
    </div>
  );
};

export default EditLandTable;
