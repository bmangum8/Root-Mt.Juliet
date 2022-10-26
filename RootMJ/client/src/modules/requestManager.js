import { getToken } from "./authManager";
import "firebase/auth";

const apiUrl = '/api/request';

export const getAllRequests = () => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          if (resp.ok) {
              return resp.json();
          } else {
              throw new Error(
                  "An unknown error occured while trying to get all requests.",
              );
          }
      });
    })
  };

  export const addRequest = (request) => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
    }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to add a new request.",
          );
        }
      })
    })
  }