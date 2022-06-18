import { baseUrl } from "./constants/serverConstants";

export function customFetch(method, url, token) {
  return fetch(baseUrl + url, {
    headers: {
      method: method,
      Authorization: "Bearer " + token,
    },
  });
}
