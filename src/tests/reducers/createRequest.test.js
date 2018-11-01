import createRequestReducer from '../../reducers/createRequest';
import * as types from '../../actionTypes/createRequest';

describe('createRequest reducer', () => {
  it('should return initial state', () => {
    expect(createRequestReducer(undefined, {})).toEqual({
      request: {},
      loading: false
    });
  });

  it('should handle CREATE_REQUEST', () => {
    const action = {
      type: types.CREATE_REQUEST,
    }
    expect(createRequestReducer({}, action)).toEqual({
      loading: true
    });
  });

  it('should handle CREATE_REQUEST_SUCCESS', () => {
    const action = {
      type: types.CREATE_REQUEST_SUCCESS,
      payload: { 
        product: "laptop"
      }
    }
    expect(createRequestReducer({}, action)).toEqual({
      loading: false,
      request: action.payload
    });
  });
});
