import React, { useEffect, useState, useContext } from "react";
import { useAuthDispatch, useAuth } from "./Context/AuthContextProvider";
import { DarkModeContext } from "Context/DarkModeContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import logo from "./expense.png";
import "assets/style/Login.css";

const Login = () => {
  const { darkMode } = useContext(DarkModeContext);
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

  const validate = (loginObject, field) => {
    let errors = {};
    if (loginObject) {
      Object.keys(validationRequirements).forEach((key) => {
        if (
          validationRequirements[key].required &&
          !loginObject[key] &&
          (key === field || !field)
        ) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirements[key].isEmail &&
          !validEmail(loginObject[key]) &&
          (key === field || !field)
        ) {
          errors[key] = "Debe ingresar un email válido.";
        }
      });
    }
    return errors;
  };

  // useEffect(() => {
  //   if (email || password) {
  //     setErrors(validate(loginObject()));
  //   }
  // }, [email, password]);
  // useEffect(() => {
  //   if (email) {
  //     setErrors(validate(loginObject(), "email"));
  //   }
  // }, [email]);

  const submitHandler = (event) => {
    event.preventDefault();
    setErrors(validate(loginObject()));

    if (email === "" || password === "") {
      toast.error("Complete los datos");
      return;
    }
    if (Object.keys(errors).length > 0) {
      toast.error("Ingrese datos válidos");
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
              setErrors(validate(loginObject(), "email"));
            }}
          />
          <div
            className={`${errors.email ? "show-error" : "hide-error"} error`}
          >
            {errors.email ? `${errors.email}` : "placeholder"}
          </div>
        </Form.Group>
        <Form.Group controlId="sign-in-password" className="mb-3">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Contraseña"
            autoComplete="password"
            className="position-relative mt-3"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            onBlur={(event) => setErrors(validate(loginObject(), "password"))}
          />
          <div
            className={`${errors.password ? "show-error" : "hide-error"} error`}
          >
            {errors.password ? `${errors.password}` : "placeholder"}
          </div>
        </Form.Group>
        <div className="d-grid">
          {auth.waitingLogin && (
            <p>Ingresando a la aplicación, por favor espere....</p>
          )}
          {!auth.waitingLogin && (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={`${darkMode ? "dark" : ""}`}
            >
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
