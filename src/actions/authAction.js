import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken.js';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types.js';


export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function login(data) {
    return dispatch => {
        return axios.post('api/auth', data).then(res => {
            const token = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
            return jwt.decode(token).username
        });
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}