import axios from 'axios';

// action types
import { UPDATE_REQUEST, UPDATE_REQUEST_SUCCESS } from '../actionTypes/updateRequest.types';
import { GET_ERRORS } from '../actionTypes/errors.types';

const updateRequestLoading = () => {
  return {
    type: UPDATE_REQUEST,
  }
}

// UPDATE request
export const updateUserRequest = (requestId, updateData) => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(updateRequestLoading());
  return axios
    .put(`${API}/api/v1/users/requests/${requestId}`, updateData, 
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      if (response.data.success === true) {
        dispatch({
          type: UPDATE_REQUEST_SUCCESS,
          payload: response.data
        })
      }
      return response;
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
      return error;
    });
};
