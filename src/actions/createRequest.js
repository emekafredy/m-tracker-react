import axios from 'axios';

// action types
import { CREATE_REQUEST, CREATE_REQUEST_SUCCESS } from '../actionTypes/createRequest';
import { GET_ERRORS } from '../actionTypes/errors.types';

const API = 'http://emeka-m-tracker.herokuapp.com';

const createRequestLoading = () => {
  return {
    type: CREATE_REQUEST,
  }
}

// create request
export const createNewRequest = (requestData) => dispatch => {
  const { jwtToken } = localStorage;
  dispatch(createRequestLoading());
  axios
    .post(`${API}/api/v1/users/requests`, requestData, 
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({
        type: CREATE_REQUEST_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
};
