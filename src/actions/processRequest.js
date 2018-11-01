import axios from 'axios';

// action types
import { PROCESS_REQUEST, PROCESS_REQUEST_SUCCESS } from '../actionTypes/processRequest.types';
import { GET_ERRORS } from '../actionTypes/errors.types';

const processRequestLoading = () => {
  return {
    type: PROCESS_REQUEST,
  }
}

// process request
export const processRequest = (requestId, status) => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(processRequestLoading());
  return axios
    .put(`${API}/api/v1/requests/${requestId}/${status}`, {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({
        type: PROCESS_REQUEST_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
};
