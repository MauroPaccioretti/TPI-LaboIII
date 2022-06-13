import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const SelectAuxTable = ({ label, tableName, onChange }) => {
  const [selectValue, setSelectValue] = useState(1);
  const [data, setData] = useState(undefined);
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const getData = () => {
    fetch("https://localhost:7210/api/auxtable/" + tableName)
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        setData(body);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Form.Group className="mb-3">
      <h6>{label}</h6>
      <Form.Select
        aria-label="Default select example"
        value={selectValue}
        onChange={(e) => {
          handleSelectChange(e);
          if (typeof onChange === "function") {
            onChange(e.target.value);
          }
        }}
      >
        {data ? (
          data.map((x) => {
            return <option value={x.id}>{x.name}</option>;
          })
        ) : (
          <option>Cargando...</option>
        )}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectAuxTable;
