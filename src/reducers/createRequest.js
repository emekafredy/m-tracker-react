import { CREATE_REQUEST, CREATE_REQUEST_SUCCESS } from '../actionTypes/createRequest';

const initialState = {
  request: {},
  loading: false
}

const createRequestReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        request: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

export default createRequestReducer;
