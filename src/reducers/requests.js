import {
  FETCH_REQUESTS,
  FETCH_REQUESTS_SUCCESS,
  CLEAR_REQUESTS_DATA
} from '../actionTypes/requests.types';

const initialState = {
  requests: [],
  loading: false
};

const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload,
        loading: false
      };
    case CLEAR_REQUESTS_DATA:
      return {
        ...state,
        requests: []
      };
    default:
      return state;
  }
}

export default requestsReducer;
