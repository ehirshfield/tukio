import React from "react";
import ReactDOM from "react-dom";
import routes from "./config/routes";
import { Router, browserHistory } from "react-router";
import { Provider } from 'react-redux';
import makeRoutes from './config/routes.jsx';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer'
import setAuthorizationToken from '../src/actions/setAuthorizationToken.js';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from '../src/actions/authAction.js';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.jwtToken) {
setAuthorizationToken(localStorage.jwtToken);
store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

const appEntry = <Provider store={store}><Router history={browserHistory}>{makeRoutes()}</Router></Provider>

ReactDOM.render(appEntry, document.getElementById("app"));
