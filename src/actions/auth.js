import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

// action types
import { GET_ERRORS } from '../actionTypes/errors.types';
import { SET_CURRENT_USER } from '../actionTypes/auth.types';

const API = 'http://emeka-m-tracker.herokuapp.com';


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${API}/api/v1/auth/signup`, userData)
    .then(response => {
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
};


// Login User
export const loginUser = (userData, history) => dispatch => {
  axios.post(`${API}/api/v1/auth/login`, userData)
    .then(response => {
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
}

// Set logged in user
export const setCurrentUser = (decoded) => {
   return {
     type: SET_CURRENT_USER,
     payload: decoded
   }
}

// Log user out
export const logUserOut = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}
