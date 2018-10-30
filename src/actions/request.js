import axios from 'axios';

import {
  FETCH_REQUEST,
  FETCH_REQUEST_SUCCESS,
  CLEAR_REQUEST_DATA
} from '../actionTypes/request.types';
// import { GET_ERRORS } from '../actionTypes/errors.types';

const API = 'https://emeka-m-tracker.herokuapp.com';


const fetchSingleRequestLoading = () => {
  return {
    type: FETCH_REQUEST,
  }
}

export const clearRequest = () => {
  return {
    type: CLEAR_REQUEST_DATA
  };
};

// Fetch single request for a logged in user
export const fetchUserSingleRequest = (requestId) => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(fetchSingleRequestLoading());
  axios
    .get(`${API}/api/v1/users/requests/${requestId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      }
    )
    .then((response) => {
      dispatch({
        type: FETCH_REQUEST_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => {
      // dispatch({
      //   type: GET_ERRORS,
      // })
      console.log(error)
    });
};


// Fetch single request by a logged in admin
export const fetchSingleRequest = (requestId) => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(fetchSingleRequestLoading());
  axios
    .get(`${API}/api/v1/requests/${requestId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      }
    )
    .then((response) => {
      dispatch({
        type: FETCH_REQUEST_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => {
      // dispatch({
      //   type: GET_ERRORS,
      // })
      console.log(error)
    });
};
