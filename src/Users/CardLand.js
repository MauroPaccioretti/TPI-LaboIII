import React from "react";
import { Form } from "react-bootstrap";
import "./CardLand.css";
const CardLand = ({ land }) => {
  const {
    id,
    activityMain,
    activityStaffSize,
    activityWorkLoad,
    environmentalGases,
    environmentalWaste,
    environmentalWaterConsumption,
    geographicArea,
    geographicBlock,
    geographicCoveredArea,
    costActivity,
    costEnvironmental,
    costGeographic,
    costTotal,
  } = land;

  return (
    <div className="card">
      <h4>Lote número: {id}</h4>
      <div className="card--total">
        <h5>Costo total: ${costTotal}</h5>
      </div>
      <Form className="container-sm">
        <h5>Componentes geográficos</h5>
        <div className="card--component">
          <Form.Group className="mb-3">
            <h6>Tipo de manzana</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={geographicBlock.name}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <h6>Superficie del lote</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={geographicArea.name}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <h6>Superficie cubierta</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={geographicCoveredArea.name}
              disabled
            />
          </Form.Group>
          <div className="card--sub-total">
            Costo del componente: ${costGeographic}
          </div>
        </div>

        <h5>Actividades</h5>
        <div className="card--component">
          <Form.Group className="mb-3">
            <h6>Actividad</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={activityMain.name}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <h6>Tamaño de la empresa</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={activityStaffSize.name}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <h6>Carga horaria</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={activityWorkLoad.name}
              disabled
            />
          </Form.Group>
          <div className="card--sub-total">
            Costo del componente: ${costActivity}
          </div>
        </div>

        <h5>Componentes Ambientales</h5>
        <div className="card--component">
          <Form.Group className="mb-3">
            <h6>Cantidad de desechos sólidos</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={environmentalWaste.name}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <h6>Emisión de gases</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={environmentalGases.name}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <h6>Consumo de agua</h6>
            <Form.Control
              aria-label="Default select example"
              placeholder={environmentalWaterConsumption.name}
              disabled
            />
          </Form.Group>
          <div className="card--sub-total">
            Costo del componente: ${costEnvironmental}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CardLand;
