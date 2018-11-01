import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { registerUser, loginUser } from '../../actions/auth';
import * as types from '../../actionTypes/auth.types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('auth actions', () => {

  describe('user signup', () => {

    it('signs up a new user', () => {
      mockAxios.onPost(`${API}/api/v1/auth/signup`)
        .reply(200, {
          success: true,
          user: {
            isadmin: false,
            firstname: "Jude"
          },
          token: jwt.sign({ isadmin: false, firstname: "Jude" }, 'secret', {expiresIn: '24h'}),
        });

        const expectedActions = [
          {
            type: types.SET_CURRENT_USER,
            payload: { 
              isadmin: false,
              firstname: "Jude",
            },
          }
        ]

        const store = mockStore({user: {}});
        return store.dispatch(registerUser())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });

    it('logs in a new user', () => {
      mockAxios.onPost(`${API}/api/v1/auth/login`)
        .reply(200, {
          success: true,
          user: {
            isadmin: false,
            firstname: "Jude"
          },
          token: jwt.sign({ isadmin: false, firstname: "Jude" }, 'secret', {expiresIn: '24h'}),
        });

        const expectedActions = [
          {
            type: types.SET_CURRENT_USER,
            payload: { 
              isadmin: false,
              firstname: "Jude",
            },
          }
        ]

        const store = mockStore({user: {}});
        return store.dispatch(loginUser())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
  });

});
