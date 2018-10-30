import updateRequestReducer from '../../reducers/updateRequest';
import * as types from '../../actionTypes/updateRequest.types';

describe('updateRequest reducer', () => {
  it('should return initial state', () => {
    expect(updateRequestReducer(undefined, {})).toEqual({
      requestUpdate: {},
      loading: false
    });
  });

  it('should handle UPDATE_REQUEST', () => {
    const action = {
      type: types.UPDATE_REQUEST,
    }
    expect(updateRequestReducer({}, action)).toEqual({
      loading: true
    });
  });

  it('should handle UPDATE_REQUEST_SUCCESS', () => {
    const action = {
      type: types.UPDATE_REQUEST_SUCCESS,
      payload: { product: "laptop" }
    }
    expect(updateRequestReducer({}, action)).toEqual({
      loading: false,
      requestUpdate: action.payload
    });
  });
});
