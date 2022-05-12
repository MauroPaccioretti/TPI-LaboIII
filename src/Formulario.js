import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./Formulario.css";

const Formulario = () => {
  return (
    <Container id="main-container" className="d-grid h-100">
      <Form id="sing-in-form" className="text-center w-100">
        <img
          className="mb-4 bootstrap-logo"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt="bootstrap 5"
        />
        <h1 className="fs-3 fw-normal">Complete sus datos</h1>
        <Form.Group controlId="sign-in-email-address">
          <Form.Control
            type="email"
            size="lg"
            placeholder="Email"
            autoComplete="username"
            className="position-relative"
          />
        </Form.Group>
        <Form.Group controlId="sign-in-password" className="mb-3">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Contraseña"
            autoComplete="password"
            className="position-relative"
          />
        </Form.Group>
        <Form.Group
          controlId="sign-in-remember-me"
          className="d-flex justify-content-center mb-4"
        >
          <Form.Check
            label="Remember me"
            size="lg"
            placeholder="Contraseña"
            autoComplete="password"
            className="position-relative"
          />
        </Form.Group>
        <div className="d-grid">
          <Link to="/admin">
            <Button variant="primary" size="lg">
              Entrar como Admin
            </Button>
          </Link>
          <Link to="/user">
            <Button variant="primary" size="lg">
              Entrar como User
            </Button>
          </Link>
          <Link to="/sarasa">
            <Button variant="primary" size="lg">
              Entrar Not Found
            </Button>
          </Link>
        </div>
        <p className="mt-5">&copy; 2021-2022</p>
      </Form>
    </Container>
  );
};

export default Formulario;
