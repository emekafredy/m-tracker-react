import requests from '../../reducers/requests';
import * as types from '../../actionTypes/requests.types';

describe('processRequest reducer', () => {
  it('should return initial state', () => {
    expect(requests(undefined, {})).toEqual({
      requests: [],
      loading: false
    });
  });

  it('should handle FETCH_REQUESTS', () => {
    const action = {
      type: types.FETCH_REQUESTS,
    }
    expect(requests({}, action)).toEqual({
      loading: true
    });
  });

  it('should handle FETCH_REQUESTS_SUCCESS', () => {
    const action = {
      type: types.FETCH_REQUESTS_SUCCESS,
      payload: [
        {product: "laptop"},
        {product: "chair"}
      ]
    }
    expect(requests({}, action)).toEqual({
      loading: false,
      requests: action.payload
    });
  });
});
