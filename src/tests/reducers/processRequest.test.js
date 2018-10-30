import processRequestReducer from '../../reducers/processRequest';
import * as types from '../../actionTypes/processRequest.types';

describe('processRequest reducer', () => {
  it('should return initial state', () => {
    expect(processRequestReducer(undefined, {})).toEqual({
      processed: {},
      loading: false
    });
  });

  it('should handle PROCESS_REQUEST', () => {
    const action = {
      type: types.PROCESS_REQUEST,
    }
    expect(processRequestReducer({}, action)).toEqual({
      loading: true
    });
  });

  it('should handle PROCESS_REQUEST_SUCCESS', () => {
    const action = {
      type: types.PROCESS_REQUEST_SUCCESS,
      payload: {
        processed: true
      }
    }
    expect(processRequestReducer({}, action)).toEqual({
      loading: false,
      processed: action.payload
    });
  });
});
