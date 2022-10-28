import React, { useEffect, useState } from "react";
import "./App.css";
import { Spinner } from "reactstrap";
import { onLoginStatusChange, isUserAdmin, getCurrentUser } from "./modules/authManager";
import ApplicationViews from "./components/ApplicationViews";
import { Router, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState()

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);


  useEffect(() => {
    if(isLoggedIn) {
      isUserAdmin().then(setIsAdmin);
    };
  } , [isLoggedIn])


  if (isLoggedIn === null) {
  return <Spinner className="app-spinner dark" />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <ApplicationViews isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      </BrowserRouter>
    </div>
  );
}

export default App;
