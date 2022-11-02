import { getToken } from "./authManager";
import "firebase/auth";

const apiUrl = '/api/tree';

export const getAllTrees = () => {
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
                "An unknown error occured while trying to get all trees.",
            );
        }
    });
  })
};

export const addTree = (tree) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tree),
    }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to add a new tree.",
          );
        }
    });
  });
};

export const updateTree = (tree) => {
    return getToken().then((token) => {
        return fetch(apiUrl + `/${tree.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tree),
        })
    });
};

export const deleteTree = (tree) => {
    return getToken().then((token) => {
        return fetch(apiUrl + `/${tree.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tree),
        }).then((resp) => {
            if (resp.ok) {
                return 
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to delete the tree."
                );
            }
        });
    });
};

export const getTreeById = (treeId) => {
  return fetch(apiUrl + `/${treeId}`)
  .then((resp) => resp.json())
};