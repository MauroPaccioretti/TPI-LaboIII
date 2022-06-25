import React, { useState } from "react";
import { useAuthDispatch, useAuth } from "./Context/AuthContextProvider";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch();
  const auth = useAuth();

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
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="sign-in-password" className="mb-3">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Contraseña"
            autoComplete="password"
            className="position-relative"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
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
          {auth.waitingLogin && (
            <p>Ingresando a la aplicación, por favor espere....</p>
          )}
          {!auth.waitingLogin && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                dispatch.login(email, password);
                // handleClick(auth.currentUser);
              }}
            >
              Login
            </Button>
          )}
        </div>
        <p className="mt-5">&copy; 2021-2022</p>
      </Form>
    </Container>
  );
};

export default Login;
