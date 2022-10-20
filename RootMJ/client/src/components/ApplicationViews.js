import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
//import Hello from "./Hello";
//import { UserProfileList } from "./UserProfileList";
//import { UserProfileDetails } from "./UserProfileDetails";

export default function ApplicationViews({ isLoggedIn, isAdmin }) {

  return (
    <main>
      <Routes>
        <Route path="/">
          {/* <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          /> */}

          {/* <Route
            index
            path="users" element={isLoggedIn ? <UserProfileList /> : <Navigate to="/login" />} /> 
          <Route path="users/:firebaseUserId" element={isLoggedIn ? <UserProfileDetails /> : <Navigate to="/login" />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
