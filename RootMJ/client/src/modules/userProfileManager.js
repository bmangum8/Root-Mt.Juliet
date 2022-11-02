import firebase from "firebase/app";
import { getToken } from "./authManager";
import "firebase/auth";

const apiUrl = '/api/userprofile';

export const getAllUserProfiles = () => {
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
                "An unknown error occured while trying to get all user profiles.",
            );
        }
    });
  })
};

export const addUserProfile = (userProfile) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfile),
    }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to add a new user profile.",
          );
        }
    });
  });
};

export const updateUserProfile = (userProfile) => {
    return getToken().then((token) => {
        return fetch(apiUrl + `/${userProfile.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userProfile),
        });
    });
};

export const getUserProfileByFirebaseId = (firebaseUserId) => {
    return fetch(apiUrl + `/GetByFirebaseId/${firebaseUserId}`) 
    .then((resp) =>  resp.json())
};



export const getCurrentUserProfile = () => {
  return getToken().then((token) => 
   fetch(apiUrl + `/GetCurrentUserProfile`, {
     method: "GET",
     headers: {
       Authorization: `Bearer ${token}`
     }
   })
   .then((resp) => {
    if (resp.ok) {
        return resp.json();
    } else {
        throw new Error(
            "An unknown error occured while trying to get user.",
        );
    }
  }))
}
