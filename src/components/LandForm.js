import React from "react";
import { Form } from "react-bootstrap";

const LandForm = ({ land, readOnly }) => {
  const {
    activityMain,
    activityStaffSize,
    activityWorkLoad,
    environmentalGases,
    environmentalWaste,
    environmentalWaterConsumption,
    geographicArea,
    geographicBlock,
    geographicCoveredArea,
  } = land;
  return (
    <div>
      <Form className="container-sm">
        <h5>Componentes geográficos</h5>
        <Form.Group className="mb-3">
          <h6>Tipo de manzana</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {geographicBlock.map((x) => {
              <option value={x.id}>{x.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <h6>Superficie del lote</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {geographicArea.map((x) => (
              <option value={x.id}>{x.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <h6>Superficie cubierta</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {geographicCoveredArea.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <h5>Actividades</h5>
        <Form.Group className="mb-3">
          <h6>Actividad</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {activityMain.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <h6>Tamaño de la empresa</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {activityStaffSize.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <h6>Carga horaria</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {activityWorkLoad.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <h5>Componentes Ambientales</h5>
        <Form.Group className="mb-3">
          <h6>Cantidad de desechos sólidos</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {environmentalWaste.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <h6>Emisión de gases</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {environmentalGases.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <h6>Consumo de agua</h6>
          <Form.Select aria-label="Default select example" disabled={!readOnly}>
            {environmentalWaterConsumption.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </Form.Select>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LandForm;
