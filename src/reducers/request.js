import {
  FETCH_REQUEST,
  FETCH_REQUEST_SUCCESS,
  CLEAR_REQUEST_DATA
} from '../actionTypes/request.types';

const initialState = {
  singleRequest: {},
  loading: false
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_REQUEST_SUCCESS:
      return {
        ...state,
        singleRequest: action.payload,
        loading: false
      };
    case CLEAR_REQUEST_DATA:
      return {
        ...state,
        singleRequest: {}
      };
    default:
      return state;
  }
}

export default requestReducer;
