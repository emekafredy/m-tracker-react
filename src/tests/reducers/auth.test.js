import auth from '../../reducers/auth';
import * as types from '../../actionTypes/auth.types';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(auth(undefined, {})).toEqual({
      isAuthenticated: false,
      loading: false,
      user:{}
    });
  });

  it('should handle SET_CURRENT_USER', () => {
    const action = {
      type: types.SET_CURRENT_USER,
      payload: { 
        firstName: "samuel"
      }
    }
    expect(auth({}, action)).toEqual({
      isAuthenticated: true,
      user: action.payload
    });
  });
});
