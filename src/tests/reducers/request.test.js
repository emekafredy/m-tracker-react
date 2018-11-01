import request from '../../reducers/request';
import * as types from '../../actionTypes/request.types';

describe('processRequest reducer', () => {
  it('should return initial state', () => {
    expect(request(undefined, {})).toEqual({
      singleRequest: {},
      loading: false
    });
  });

  it('should handle FETCH_REQUEST', () => {
    const action = {
      type: types.FETCH_REQUEST,
    }
    expect(request({}, action)).toEqual({
      loading: true
    });
  });

  it('should handle FETCH_REQUEST_SUCCESS', () => {
    const action = {
      type: types.FETCH_REQUEST_SUCCESS,
      payload: {
        product: "laptop"
      }
    }
    expect(request({}, action)).toEqual({
      loading: false,
      singleRequest: action.payload
    });
  });

  it('should handle DELETE_REQUEST', () => {
    const action = {
      type: types.DELETE_REQUEST,
    }
    expect(request({}, action)).toEqual({
      loading: true
    });
  });

  it('should handle DELETE_REQUEST_SUCCESS', () => {
    const action = {
      type: types.DELETE_REQUEST_SUCCESS,
      payload: {}
    }
    expect(request({}, action)).toEqual({
      singleRequest: action.payload
    });
  });
});
