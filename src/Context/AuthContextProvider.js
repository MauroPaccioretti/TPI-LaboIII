import React, {
  useReducer,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { baseUrl } from "../utils/constants/serverConstants";

const initialState = {
  currentUser: null,
  waitingLogin: false,
  loginError: "",
  token: null, // JSON Web Token (JWT)
};

// REVIEW: 2. Context + Reducer
export const AuthContext = createContext(initialState);
export const AuthDispatchContext = createContext(null);

export default function AuthContextProvider({ children }) {
  // REVIEW: 1. useReducer hook
  // equivalente: const [ auth, setAuth ] = useState(initialState);
  const [auth, dispatch] = useReducer(authReducer, initialState);

  // REVIEW: async
  // const baseUrl = "https://localhost:7210/api";
  const asyncDispatcher = {
    // REVIEW: 3. dispatcher async
    login: (email, password) => {
      dispatch({ type: "setWaitingLogin", waiting: true });
      fetch(baseUrl + "/authentication/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.status === 401) {
            return;
          }
          return res.json();
        })
        .then((loginResponse) => {
          // console.log("login ok", loginResponse);
          // llamada sincronica
          if (loginResponse) {
            dispatch({ type: "setToken", token: loginResponse });

            fetch(baseUrl + "/login", {
              method: "GET",
              headers: {
                Authorization: "Bearer " + loginResponse,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                // console.log("get ok", res);
                // llamada sincronica
                if (res) {
                  dispatch({ type: "setCurrentUser", currentUser: res });
                } else {
                  dispatch({
                    type: "setError",
                    error: "Usuario inexistente.",
                  });
                }
              })
              .catch(() => {
                dispatch({
                  type: "setError",
                  error: "Ocurrio un error inesperado.",
                });
              });
          } else {
            dispatch({ type: "setError", error: "Usuario inexistente." });
          }
        })
        .catch(() => {
          dispatch({ type: "setError", error: "Ocurrio un error inesperado." });
        });
    },
    logout: () => {
      // llamada sincronica
      dispatch({ type: "setCurrentUser", currentUser: null });
      dispatch({ type: "setToken", token: null });
    },
    setLogin: function (user, token) {
      if (!user || !token) {
        dispatch({ type: "setCurrentUser", currentUser: null });
        dispatch({ type: "setToken", token: null });
        return;
      }
      dispatch({ type: "setUserFromLocalStorage", currentUser: user });
      dispatch({ type: "setToken", token });
    },
  };

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={asyncDispatcher}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

function authReducer(state, action) {
  // console.log("authReducer", action.type, state, action);
  // cualquier cambio de estado tiene sincronico
  switch (action.type) {
    case "setCurrentUser": {
      localStorage.setItem("user", JSON.stringify(action.currentUser));
      return {
        ...state,
        currentUser: action.currentUser,
        waitingLogin: false,
        loginError: "",
      };
    }
    case "setToken": {
      localStorage.setItem("token", action.token);
      return { ...state, token: action.token };
    }
    case "setWaitingLogin": {
      return { ...state, waitingLogin: action.waiting };
    }
    case "setError": {
      return { ...state, loginError: action.error, waitingLogin: false };
    }
    case "setUserFromLocalStorage": {
      return { ...state, currentUser: action.currentUser };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

// custom hook: es una funcion use____________
export function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

export function useCapitalizeName(initialName) {
  const [name, setInternalName] = useState(initialName);
  useEffect(() => {
    if (name && new RegExp("[a-z]").test(name)) {
      setInternalName(name.toUpperCase());
    }
  }, [name]);
  return name;
}
