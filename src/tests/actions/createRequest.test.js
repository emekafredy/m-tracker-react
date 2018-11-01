import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createNewRequest } from '../../actions/createRequest';
import * as types from '../../actionTypes/createRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('create request action', () => {
  it('signs up a new user', () => {
    mockAxios.onPost(`${API}/api/v1/users/requests`)
      .reply(200, {
        success: true,
        newRequest: {
          product: "laptop",
          requestType: "repair",
          issue: "the laptop shuts down without any action",
        }
      });

      const expectedActions = [
        { type: types.CREATE_REQUEST },
        {
          type: types.CREATE_REQUEST_SUCCESS,
          payload: { 
            success: true,
            newRequest: {
              product: "laptop",
              requestType: "repair",
              issue: "the laptop shuts down without any action",
            }
          },
        }
      ]
      const store = mockStore({request: {}});
      return store.dispatch(createNewRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });
});
