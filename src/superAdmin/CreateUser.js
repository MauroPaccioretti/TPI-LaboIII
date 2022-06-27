import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { useAuthDispatch, useAuth } from "Context/AuthContextProvider";
import { toast } from "react-toastify";

import { DarkModeContext } from "Context/DarkModeContext";
import { customFetch, handleServerError } from "utils/helpers";

const CreateUser = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [type, setType] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    customFetch("GET", "/persons/types", auth.token)
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
        return res.json();
      })
      .then((body) => {
        setTypes(body);
      });
  }, []);

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\S+@\S+\.\S+$/);
  };

  const validationRequirements = {
    name: { required: true, minLenght: 3 },
    email: { required: true, isEmail: true },
    password: { required: true },
    type: { required: true },
  };

  const userObject = () => {
    return {
      name,
      email,
      password,
      type,
    };
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const validate = (userObject) => {
    let errors = {};
    if (userObject) {
      Object.keys(validationRequirements).forEach((key) => {
        if (validationRequirements[key].required && !userObject[key]) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirements[key].isEmail &&
          !validEmail(userObject[key])
        ) {
          errors[key] = "Debe ingresar un email válido.";
        }
      });
    }
    return errors;
  };

  useEffect(() => {
    if (name || email || password) {
      setErrors(validate(userObject()));
    }
  }, [name, email, password]);

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="create-user-name">
          <Form.Control
            type="input"
            size="lg"
            placeholder="Nombre"
            className="position-relative"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            onBlur={(event) => {
              setErrors(validate(userObject()));
            }}
          />
          {errors?.name && <div className="error">{errors.password}</div>}
        </Form.Group>
        <Form.Group controlId="create-user-email-address">
          <Form.Control
            type="email"
            size="lg"
            placeholder="Email"
            className="position-relative"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            onBlur={(event) => {
              setErrors(validate(userObject()));
            }}
          />
          {errors?.email && <div className="error">{errors.email}</div>}
        </Form.Group>
        <Form.Group controlId="create-user-password" className="mb-3">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Contraseña"
            className="position-relative mt-5"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            onBlur={(event) => setErrors(validate(userObject()))}
          />
          {errors?.password && <div className="error">{errors.password}</div>}
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateUser;
