import {
  FETCH_REQUEST,
  FETCH_REQUEST_SUCCESS,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS
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
    case DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        singleRequest: {}
      };
    default:
      return state;
  }
}

export default requestReducer;
