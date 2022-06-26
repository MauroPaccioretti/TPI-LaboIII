import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "Context/AuthContextProvider";
import { tableNames } from "utils/constants/serverConstants";
import SelectAuxTable from "../components/SelectAuxTable";
import Button from "react-bootstrap/Button";
import { customFetchWithBody } from "utils/helpers";
import { toast } from "react-toastify";
import "assets/style/EditLandTable.css";

const EditLandTable = () => {
  const auth = useAuth();
  //id del lote
  const { landId } = useParams();
  //el lote y un metodo
  const { lands, refetchData } = useOutletContext();

  // las props del lote, array de 9 objetos en kvp
  const [landProps, setLandProps] = useState([]);

  //las props strigified
  const [landData, setLandData] = useState("");

  //sera el lote
  let land = {};

  //seran los valores del lote
  let landValues = [];

  // se guardaran los valores iniciales del lote
  let originalLandValues = [];

  // si hay lotes, entonces obtener el lote elegido,
  // luego buscar los datos de las tablas del backend y agregarle los valores del lote elegido
  if (lands.length > 0) {
    land = lands.filter((x) => x.id === Number(landId))[0];
    landValues = tableNames().map((x) => ({
      ...x,
      landPropId: land[x.prop].id,
    }));

    originalLandValues = landValues.map((x) => ({
      [`${x.prop}Id`]: x.landPropId,
    }));
  }

  //Cuando cambie landValues y landProps.lenght sea igual a 0 setear los valores de landProps y
  // de paso guardo los valores originales del lote
  useEffect(() => {
    if (landProps.length === 0) {
      setLandProps(originalLandValues);
    }
  }, [landValues]);

  const handleChange = (e) => {
    // Se obtiene el nombre de la propiedad a modificar
    const key = Object.keys(e)[0];

    // Se obtiene el indice de la propiedad
    const index = landValues.findIndex((x) => x.table === Object.keys(e)[0]);

    // 'shallow' copy
    let newLandProps = [...landProps];

    // Prop name en landProps
    const propName = Object.keys(newLandProps[index])[0];
    // seteo el valor de la propiedad modificada
    newLandProps[index][propName] = e[key].id;
    setLandProps(newLandProps);
  };

  useEffect(() => {
    setLandData("");
    setLandProps([]);
  }, [landId]);

  useEffect(() => {
    if (landProps.length > 0) {
      const reduced = landProps.reduce((acc, prop) => {
        return { ...acc, [Object.keys(prop)]: Object.values(prop)[0] };
      }, {});
      setLandData(JSON.stringify(reduced));
    }
  }, [landProps]);

  const handleEditClick = () => {
    if (JSON.stringify(landProps) === JSON.stringify(originalLandValues)) {
      toast.error("Debe modificar valores");
      return;
    }

    customFetchWithBody(
      "PUT",
      "/land/" + landId,
      JSON.parse(landData),
      auth.token
    )
      .then((res) => {
        toast.success("Datos modificados");
      })
      .then(() => {
        refetchData();
        setLandData("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrió un problema");
      });
  };

  //reduced devuelve el objeto necesario para enviar a backend, ubicarlo donde corresponda
  // Probablemente refactorizar handleChange
  // Agregar validacion de editar el lote cuando se modifique algun valor primero
  // Verificar que el valor sea nuevo?? (cambiar 2 veces permitiria mismo valor)

  //Mostrar valor total de las expensas?
  // Dividir tabla en secciones? Quizas desde css pasando table como parte de className

  // Existe 'beforeDestroyed' para avisarle al usuario que no edito los valores y q
  // va a perder el progreso de las modificaciones??

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
    </div>
  );
};

export default EditLandTable;
