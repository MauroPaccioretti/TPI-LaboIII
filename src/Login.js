import React, { useState, useEffect } from "react";
import { useAuthDispatch, useAuth } from "./Context/AuthContextProvider";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // REVIEW: 6. uso del dispatch en un componente alejado
  const dispatch = useAuthDispatch();
  // equivalente: const auth = useContext(AuthContext);
  const auth = useAuth();

  const navigate = useNavigate();

  // function handleClick(user) {
  //   if (user?.role === "Admin") {
  //     navigate("/admin", { replace: true });
  //   } else if (user?.role === "Usuario") {
  //     navigate("/user", { replace: true });
  //   } else {
  //     navigate("/", { replace: true });
  //   }
  // }

  useEffect(() => {
    if (auth.currentUser?.role === "Admin") {
      navigate("/admin", { replace: true });
    } else if (auth.currentUser?.role === "Usuario") {
      navigate("/user", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [auth.currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

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
          {auth.waitingLogin && <p>Logueando por favor espere ....</p>}
          {!auth.waitingLogin && (
            <Button
              variant="primary"
              size="lg"
              tton
              onClick={() => {
                dispatch.login(email, password);
                // handleClick(auth.currentUser);
              }}
            >
              Login
            </Button>
          )}

          {/* <Link to="/admin">
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
          </Link> */}
        </div>
        <p className="mt-5">&copy; 2021-2022</p>
      </Form>
    </Container>
  );
};

export default Login;
