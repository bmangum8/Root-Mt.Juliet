import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { TreeEditForm } from "./Tree/TreeEditForm";
import { UserProfileEditForm } from "./UserProfile/UserProfileEditForm";
import { UserProfileList } from "./UserProfile/UserProfileList";
import { TreeList } from "./Tree/TreeList";
import TreeAddForm from "./Tree/TreeAddForm";
import { UserProfileDetails } from "./UserProfile/UserProfileDetails";
import {RequestList} from "./Request/RequestList";
import RequestAddForm from "./Request/RequestAddForm";
import { RequestEditForm } from "./Request/RequestEditForm";

export default function ApplicationViews({ isLoggedIn, isAdmin }) {

  return (
      <Routes>
        <Route path="/">
          <Route path="request/add" element={isLoggedIn ? <RequestAddForm /> : <Navigate to="/login" />} />
          <Route path="requests" element={isLoggedIn ? <RequestList /> : <Navigate to="/login" />} />
          <Route path="request/edit/:requestId" element={isLoggedIn ? <RequestEditForm isAdmin={isAdmin} /> : <Navigate to="/login" /> } />
          
          <Route path="userProfile/details" element={isLoggedIn ? <UserProfileDetails /> : <Navigate to="/login" />} />
          <Route path="edit/:profileId" element={isLoggedIn ? <UserProfileEditForm /> : <Navigate to="/login" />} />
          
          <Route path="trees" element={<TreeList isAdmin={isAdmin}/>} />
          
          
          <Route path="userProfiles" element={isLoggedIn && isAdmin ? <UserProfileList isAdmin={isAdmin} /> : <Navigate to="/login" />} />
          
          <Route path="tree/edit/:treeId" element={isLoggedIn && isAdmin ? <TreeEditForm /> : <Navigate to="/login" />} />
          <Route path="tree/add" element={isLoggedIn && isAdmin ? <TreeAddForm /> : <Navigate to="/login" />} />
          
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
  );
};
