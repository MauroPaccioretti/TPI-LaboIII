import React from "react";
import { useParams } from "react-router-dom";
import { tableNames } from "utils/constants/serverConstants";
import SelectAuxTable from "../components/SelectAuxTable";

const EditLandTable = () => {
  const { landId } = useParams();
  return (
    <div>
      <h3>Editar Lote #{landId}</h3>
      {tableNames() &&
        tableNames().map((x) => (
          <SelectAuxTable key={x.id} label={x.name} tableName={x.table} />
        ))}
    </div>
  );
};

export default EditLandTable;
