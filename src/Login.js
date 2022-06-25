import React, { useEffect, useState } from "react";
import { useAuthDispatch, useAuth } from "./Context/AuthContextProvider";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import logo from "./expense.png";

import "assets/style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();
  const auth = useAuth();

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\S+@\S+\.\S+$/);
  };

  const loginObject = () => {
    return {
      email,
      password,
    };
  };

  const validationRequirements = {
    email: { required: true, isEmail: true },
    password: { required: true },
  };

  const validate = (loginObject) => {
    let errors = {};
    if (loginObject) {
      Object.keys(validationRequirements).forEach((key) => {
        if (validationRequirements[key].required && !loginObject[key]) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirements[key].isEmail &&
          !validEmail(loginObject[key])
        ) {
          errors[key] = "Debe ingresar un email válido.";
        }
      });
    }
    return errors;
  };

  useEffect(() => {
    if (email || password) {
      setErrors(validate(loginObject()));
    }
  }, [email, password]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (errors.length > 0 || email === "" || password === "") {
      toast.error("Complete los datos");
      return;
    }
    dispatch.login(email, password);
  };

  useEffect(() => {
    if (auth.loginError !== "" && !auth.waitingLogin) {
      toast.error(auth.loginError);
    }
  }, [auth.loginError, auth.waitingLogin]);

  return (
    <Container id="main-container" className="d-grid h-100">
      <Form
        onSubmit={submitHandler}
        id="sing-in-form"
        className="text-center w-100"
      >
        <img className="exp-logo" src={logo} alt="Logo" />
        <h1 className="fs-3 fw-normal">Expense Manager</h1>
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
            onBlur={(event) => {
              setErrors(validate(loginObject()));
            }}
          />
          {errors?.email && <div className="error">{errors.email}</div>}
        </Form.Group>
        <Form.Group controlId="sign-in-password" className="mb-3">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Contraseña"
            autoComplete="password"
            className="position-relative mt-5"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            onBlur={(event) => setErrors(validate(loginObject()))}
          />
          {errors?.password && <div className="error">{errors.password}</div>}
        </Form.Group>
        <Form.Group
          controlId="sign-in-remember-me"
          className="d-flex justify-content-center mb-4"
        ></Form.Group>
        <div className="d-grid">
          {auth.waitingLogin && (
            <p>Ingresando a la aplicación, por favor espere....</p>
          )}
          {!auth.waitingLogin && (
            <Button type="submit" variant="primary" size="lg">
              Iniciar Sesión
            </Button>
          )}
        </div>
        <p className="mt-5">&copy; 2022</p>
      </Form>
    </Container>
  );
};

export default Login;
