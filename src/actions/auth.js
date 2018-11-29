import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';
import { fetchGameData } from '../actions/game';


export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH
});


export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
// export const authLogout = 

const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken);
};

export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return (
      fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username,
              password
          })
      })
          // Reject any requests which don't return a 200 status, creating
          // errors which follow a consistent format
          .then(res => normalizeResponseErrors(res))
          .then(res => res.json())
          .then(({authToken}) => storeAuthInfo(authToken, dispatch))
          .catch(err => {
              const {code} = err;
              const message =
                  code === 401
                      ? 'Incorrect username or password'
                      : 'Unable to login, please try again';
              dispatch(authError(err));
              // Could not authenticate, so return a SubmissionError for Redux
              // Form
              return Promise.reject(
                  new SubmissionError({
                      _error: message
                  })
              );
          })
  );
};

export const saveUserData = () => (dispatch, getState) => {
    dispatch(fetchGameData());
    const score = getState().game.score;
    const note = getState().game.note;
    const handsPlayed = getState().game.handsPlayed;
    const userID = getState().auth.currentUser.id;
    const authToken = getState().auth.authToken;
    const dataObject = {
        handsPlayed,
        score,
        note
    }
    return fetch(`${API_BASE_URL}/api/users/${userID}`, {
        method: 'PUT',
        headers: {
            // Provide our existing token as credentials to get a new one
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(
            dataObject
        )
   })
    .then(res => normalizeResponseErrors(res))
    .catch(err => console.log('there was an err :' + err));
}

export const getHistory = (id) => (getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'GET',
        headers: {
            // Provide our existing token as credentials to get a new one
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
    // .then(res => normalizeResponseErrors(res))
    // .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log('there was an err :' + err));

}

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
          // Provide our existing token as credentials to get a new one
          Authorization: `Bearer ${authToken}`
      }
  })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(({authToken}) => storeAuthInfo(authToken, dispatch))
      .catch(err => {
          // We couldn't get a refresh token because our current credentials
          // are invalid or expired, or something else went wrong, so clear
          // them and sign us out
          dispatch(authError(err));
          dispatch(clearAuth());
          clearAuthToken(authToken);
      });
};