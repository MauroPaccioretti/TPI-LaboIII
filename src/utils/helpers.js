import { baseUrl } from "./constants/serverConstants";

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
