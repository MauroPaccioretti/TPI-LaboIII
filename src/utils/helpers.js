import { baseUrl } from "./constants/serverConstants";
import { toast } from "react-toastify";
export function customFetch(method, url, token) {
  return fetch(baseUrl + url, {
    headers: {
      method: method,
      Authorization: "Bearer " + token,
    },
  });
}
export function customFetchWithBody(method, url, dataBody, token) {
  return fetch(baseUrl + url, {
    method: method,
    body: JSON.stringify(dataBody),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

export function handleServerError(dispatcher, response) {
  if (response.status === 401) {
    toast.error("El tiempo de su sesión venció");
    setTimeout(() => {
      dispatcher.logout();
    }, 5000);
    return 401;
  }
  if (response.status === 400) {
    toast.error("Solicitud inválida");
    return 400;
  }
  if (response.status === 404) {
    toast.error("Elemento no encontrado");
    return 404;
  }
  return null;
}
