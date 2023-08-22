import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Home, Login, SignUp } from "../Components/index";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
  };
  return (
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default Router;
