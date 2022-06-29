import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useAuthDispatch, useAuth } from "Context/AuthContextProvider";
import { toast } from "react-toastify";
import { DarkModeContext } from "Context/DarkModeContext";
import {
  customFetch,
  customFetchWithBody,
  handleServerError,
} from "utils/helpers";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import "assets/style/CreateUser.css";

const CreateUser = ({}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isUpdate, person } = useOutletContext() || {};
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const [isUpdateUrl, setIsUpdateUrl] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [personTypeId, setPersonTypeId] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState(true);
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
    if (pathname === "/superadmin/createuser") {
      setIsUpdateUrl(false);
    } else {
      setIsUpdateUrl(true);
    }
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
    if (person && isUpdateUrl) {
      setName(person.name);
      setEmail(person.email);
      setPassword(person.password);
      setPersonTypeId(person.personType.id);
    }
  }, [person, isUpdateUrl]);

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\S+@\S+\.\S+$/);
  };

  const validationRequirements = {
    name: { required: true, minLenght: 3 },
    email: { required: true, isEmail: true },
    password: { required: true, minLenght: 4 },
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
    if (isUpdateUrl) {
      customFetchWithBody(
        "PUT",
        "/persons/" + person.id,
        userObject(),
        auth.token
      ).then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
        toast.success(`Usuario ${name} editado.`);
      });
    } else {
      customFetchWithBody("POST", "/persons", userObject(), auth.token).then(
        (res) => {
          const err = handleServerError(dispatch, res);
          if (err) {
            return;
          }
          toast.success(`Usuario ${name} creado.`);
        }
      );
    }
  };

  const handleReturnClick = () => {
    navigate("viewusers");
  };

  const handlePasswordState = () => {
    setPasswordState(!passwordState);
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
      {isUpdateUrl ? <h2>Actualizar usuario</h2> : <h2>Crear usuario</h2>}
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
          <InputGroup.Text className="p-0">
            <Form.Control
              type={passwordState ? "password" : "text"}
              size="lg"
              placeholder="Contraseña"
              className="position-relative"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onBlur={(event) => setErrors(validate(userObject(), "password"))}
            />
            <i
              className={`p-2 ${
                !passwordState ? "fas fa-eye-slash" : "fas fa-eye"
              }`}
              type="button"
              onClick={() => handlePasswordState()}
            >
              {/* <i>{passwordState ? "fas fa-eye-slash" : "fas fa-eye"}</i> */}
            </i>
          </InputGroup.Text>
        </Form.Group>
        {errors?.password && <div className="error">{errors.password}</div>}
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
          {isUpdateUrl ? "Actualizar usuario" : "Crear Usuario"}
        </Button>
        {isUpdateUrl && (
          <Button
            type="button"
            variant="primary"
            size="lg"
            className={`${darkMode ? "dark" : ""}`}
            onClick={handleReturnClick}
          >
            Volver
          </Button>
        )}
      </Form>
    </div>
  );
};

export default CreateUser;
