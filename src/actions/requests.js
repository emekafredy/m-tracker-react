import axios from 'axios';

import {
  FETCH_REQUESTS,
  FETCH_REQUESTS_SUCCESS,
  CLEAR_REQUESTS_DATA
} from '../actionTypes/requests.types';

const API = 'http://emeka-m-tracker.herokuapp.com';


const fetchRequestsLoading = () => {
  return {
    type: FETCH_REQUESTS,
  }
}

export const clearRequests = () => {
  return {
    type: CLEAR_REQUESTS_DATA
  };
};

// Fetch all requests for a logged in user
export const fetchRequests = () => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(fetchRequestsLoading());
  axios
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
