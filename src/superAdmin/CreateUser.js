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
import { useOutletContext, useParams } from "react-router-dom";
import "assets/style/CreateUser.css";

const CreateUser = ({}) => {
  const { isUpdate, person } = useOutletContext() || {};
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [personTypeId, setPersonTypeId] = useState(0);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([]);

  const handleSelectChange = (e) => {
    setPersonTypeId(Number(e.target.value));
  };

  // acomodar el asunto de editarUser, probablemente con outlet y que cambie la vista
  // de los users por users/:idUser-a-editar, poner un btn volver
  // Poner boton cuando isUpdate para volver a la navegacion sin :userId
  // Ver que hacer con la password (traerla desde front y chau?)
  // Poner verificacion de password?

  // Ver porque no se elimina un usuario. Endpoint anda (incluso en postman)

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

  useEffect(() => {
    if (person) {
      setName(person.name);
      setEmail(person.email);
      setPassword(person.password);
      setPersonTypeId(person.personType.id);
    }
  }, [person]);

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\S+@\S+\.\S+$/);
  };

  const validationRequirements = {
    name: { required: true, minLenght: 3 },
    email: { required: true, isEmail: true },
    password: { required: true, minLenght: 5 },
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
    setErrors(validate(userObject()));

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
        } else if (
          validationRequirements[key].minLenght &&
          userObject[key].length < validationRequirements[key].minLenght &&
          (key === field || !field)
        ) {
          errors[
            key
          ] = `Mínimo ${validationRequirements[key].minLenght} caracteres.`;
        }
      });
    }
    return errors;
  };

  // useEffect(() => {
  //   if (name || email || password) {
  //     setErrors(validate(userObject()));
  //   }
  // }, [name, email, password]);

  return (
    <div className="create-user__container">
      {isUpdate ? <h2>Actualizar usuario</h2> : <h2>Crear usuario</h2>}
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
          {errors?.name && <div className="error">{errors.name}</div>}
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
            onBlur={() => {
              setErrors(validate(userObject(), "personTypeId"));
            }}
          >
            <option value={0}>Seleccione un tipo de usuario</option>
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
          {errors?.personTypeId && (
            <div className="error">{errors.personTypeId}</div>
          )}
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={`${darkMode ? "dark" : ""}`}
        >
          {isUpdate ? "Actualizar usuario" : "Crear Usuario"}
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
