import axios from 'axios';

import {
  FETCH_REQUESTS,
  FETCH_REQUESTS_SUCCESS,
  CLEAR_REQUESTS_DATA
} from '../actionTypes/requests.types';


const fetchRequestsLoading = () => {
  return {
    type: FETCH_REQUESTS,
  }
}

// Fetch all requests for a logged in user
export const fetchUserRequests = () => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(fetchRequestsLoading());
  return axios
    .get(`${API}/api/v1/users/requests`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      }
    )
    .then((response) => {
      dispatch({
        type: FETCH_REQUESTS_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_REQUESTS_SUCCESS,
        payload: []
      })
    });
};


// Fetch all requests for a logged in admin
export const fetchAllRequests = () => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(fetchRequestsLoading());
  return axios
    .get(`${API}/api/v1/requests`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      }
    )
    .then((response) => {
      dispatch({
        type: FETCH_REQUESTS_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_REQUESTS_SUCCESS,
        payload: []
      })
    });
};
