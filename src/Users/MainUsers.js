import React from "react";
import { Form, Button } from "react-bootstrap";
import NavbarCustome from "../Navbar";

const MainUsers = () => {
  return (
    <div>
      <NavbarCustome />
      MainUsers
      <ul>
        <li>Cargar formulario</li>
        <Form className="container-sm">
          <h4>Componentes geográficos</h4>
          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Tipo de manzana</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Superficie del lote</option>
              <option value="1">Pequeño</option>
              <option value="2">Mediano</option>
              <option value="3">Grande</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Superficie cubierta</option>
              <option value="1">Hasta 50%</option>
              <option value="2">Hasta 75%</option>
              <option value="3">Hasta 90%</option>
            </Form.Select>
          </Form.Group>

          <h4>Actividades</h4>
          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Actividad</option>
              <option value="1">Manufactura</option>
              <option value="2">Logística</option>
              <option value="3">Mixta</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Tamaño</option>
              <option value="1">Pequeño</option>
              <option value="2">Mediano</option>
              <option value="3">Grande</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Carga diaria</option>
              <option value="1">Sólo días hábiles</option>
              <option value="2">Todos los días</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Carga horaria</option>
              <option value="1">Diurno</option>
              <option value="2">24 hs</option>
            </Form.Select>
          </Form.Group>

          <h4>Componentes Ambientales</h4>
          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Cantidad de desechos sólidos</option>
              <option value="1">Poco</option>
              <option value="2">Intermedio</option>
              <option value="3">Mucho</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Emisión de gases</option>
              <option value="1">Bajo</option>
              <option value="2">Alto</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>Consumo de agua</option>
              <option value="1">Bajo</option>
              <option value="2">Alto</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <li>Ver estado de cuenta</li>
        <li>Historial de pagos</li>
      </ul>
    </div>
  );
};

export default MainUsers;
