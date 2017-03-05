import React from "react";
import { Route, IndexRoute } from "react-router";
import Main from "../components/Main.jsx";
import Home from "../components/Home.jsx";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";

export default () => {
  return (
    <Route path="/" component={Main}>
    <Route path="/home" component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
      <IndexRoute component={Home} />
    </Route>
  )
};
