import axios from 'axios';

import {
  FETCH_REQUEST,
  FETCH_REQUEST_SUCCESS,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS
} from '../actionTypes/request.types';


const fetchSingleRequestLoading = () => {
  return {
    type: FETCH_REQUEST,
  }
}

const deleteRequestLoading = () => {
  return {
    type: DELETE_REQUEST,
  }
}

// Fetch single request for a logged in user
export const fetchUserSingleRequest = (requestId) => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(fetchSingleRequestLoading());
  return axios
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
      console.log(error)
    });
};


// Fetch single request by a logged in admin
export const fetchSingleRequest = (requestId) => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(fetchSingleRequestLoading());
  return axios
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
      console.log(error)
    });
};

// Delete request
export const deleteUserRequest = (requestId) => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(deleteRequestLoading());
  return axios
    .delete(`${API}/api/v1/users/requests/${requestId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      }
    )
    .then((response) => {
      dispatch({
        type: DELETE_REQUEST_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => {
      console.log(error)
    });
};
