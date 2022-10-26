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

export default function ApplicationViews({ isLoggedIn, isAdmin }) {

  return (
      <Routes>
        <Route path="/">

          <Route path="request/add" element={<RequestAddForm />} />
          <Route path="request" element={<RequestList />} />
          <Route path="tree" element={<TreeList />} />
          <Route path="userProfile/details/:firebaseUserId" element={<UserProfileDetails />} />
          <Route path="edit/:profileId" element={<UserProfileEditForm />} />
          <Route path="tree/edit/:treeId" element={<TreeEditForm />} />
          <Route path="tree/add" element={<TreeAddForm />} />
          <Route path="userProfiles" element={<UserProfileList />} />
          {/*<Route path="userProfile/edit/:userProfileId" element={<UserProfileEditForm />} />*/}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
  );
};
