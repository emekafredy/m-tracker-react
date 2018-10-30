import { PROCESS_REQUEST, PROCESS_REQUEST_SUCCESS } from '../actionTypes/processRequest.types';

const initialState = {
  processed: {},
  loading: false
}

const processRequestReducer = (state = initialState, action) => {
  switch(action.type) {
    case PROCESS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PROCESS_REQUEST_SUCCESS:
      return {
        ...state,
        processed: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

export default processRequestReducer;
