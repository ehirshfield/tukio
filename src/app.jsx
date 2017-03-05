import React from "react";
import ReactDOM from "react-dom";
import routes from "./config/routes";
import { Router, browserHistory } from "react-router";
import { Provider } from 'react-redux';
import makeRoutes from './config/routes.jsx';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);

const appEntry = <Provider store={store}><Router history={browserHistory}>{makeRoutes()}</Router></Provider>

ReactDOM.render(appEntry, document.getElementById("app"));
