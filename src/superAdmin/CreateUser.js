import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuthDispatch, useAuth } from "Context/AuthContextProvider";
import { toast } from "react-toastify";
import { DarkModeContext } from "Context/DarkModeContext";
import {
  customFetch,
  customFetchWithBody,
  handleServerError,
} from "utils/helpers";
import "assets/style/CreateUser.css";

const CreateUser = ({ isUpdate }) => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [personTypeId, setPersonTypeId] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([]);

  const handleSelectChange = (e) => {
    setPersonTypeId(Number(e.target.value));
  };
  // crear select para type y handlear el change
  // verificar el uso de validacion de errores
  // estilizar
  // acomodar el modal de deleteUser
  // acomodar el asunto de editarUser, probablemente con outlet y que cambie la vista
  // de los users por users/:idUser-a-editar, poner un btn volver

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
    personTypeId: { required: true },
  };

  const userObject = () => {
    return {
      name,
      email,
      password,
      personTypeId,
    };
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(userObject()));

    customFetchWithBody("POST", "/persons", userObject(), auth.token).then(
      (res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
        toast.success(`Usuario ${name} creado.`);
      }
    );
  };

  const validate = (userObject, field) => {
    let errors = {};
    if (userObject) {
      Object.keys(validationRequirements).forEach((key) => {
        if (
          validationRequirements[key].required &&
          !userObject[key] &&
          (key === field || !field)
        ) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirements[key].isEmail &&
          !validEmail(userObject[key]) &&
          (key === field || !field)
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
    <div className="create-user__container">
      {isUpdate ? <p>Actualizar usuario</p> : <p>Crear usuario</p>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="create-user-name">
          <Form.Control
            type="input"
            size="lg"
            placeholder="Nombre"
            className="position-relative mt-3"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            onBlur={(event) => {
              setErrors(validate(userObject(), "name"));
            }}
          />
          {errors?.name && <div className="error">{errors.password}</div>}
        </Form.Group>
        <Form.Group controlId="create-user-email-address">
          <Form.Control
            type="email"
            size="lg"
            placeholder="Email"
            className="position-relative mt-3"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            onBlur={(event) => {
              setErrors(validate(userObject(), "email"));
            }}
          />
          {errors?.email && <div className="error">{errors.email}</div>}
        </Form.Group>
        <Form.Group controlId="create-user-password" className="mt-3">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Contraseña"
            className="position-relative"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            onBlur={(event) => setErrors(validate(userObject(), "password"))}
          />
          {errors?.password && <div className="error">{errors.password}</div>}
        </Form.Group>
        <Form.Group className="mt-3 mb-3">
          <Form.Select
            aria-label="Default select example"
            value={personTypeId}
            onChange={(e) => {
              handleSelectChange(e);
            }}
          >
            {types ? (
              types.map((x) => {
                return (
                  <option key={x.id} value={x.id}>
                    {x.type}
                  </option>
                );
              })
            ) : (
              <option>Cargando...</option>
            )}
          </Form.Select>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={`${darkMode ? "dark" : ""}`}
        >
          Crear Usuario
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
