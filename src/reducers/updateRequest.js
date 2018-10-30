import { UPDATE_REQUEST, UPDATE_REQUEST_SUCCESS } from '../actionTypes/updateRequest.types';

const initialState = {
  requestUpdate: {},
  loading: false
}

const updateRequestReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        requestUpdate: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

export default updateRequestReducer;
