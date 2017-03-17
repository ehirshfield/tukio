import React from "react";
import { Route, IndexRoute } from "react-router";
import Main from "../components/Main.jsx";
import Home from "../components/Home.jsx";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";
import UserHomePage from "../components/UserHomePage.jsx";
import UserProfile from "../components/UserProfile.jsx";
import Profile from "../components/Profile.jsx";
import authorize from "../validations/requireAuth.js";

export default () => {
  return (
    <Route path="/" component={Main}>
      <Route path="/home" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/UserHomePage" component={UserHomePage} />
      <Route path="/UserProfile" component={authorize(UserProfile)} />
      <Route path="/profile" component={Profile} />
      <IndexRoute component={Home} />
    </Route>
  )
};
