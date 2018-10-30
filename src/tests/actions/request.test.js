import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actionTypes/request.types';
import { fetchUserSingleRequest, fetchSingleRequest, deleteUserRequest } from '../../actions/request';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('single request action', () => {
  it('fetches a single request for users', () => {
    mockAxios.onGet(`${API}/api/v1/users/requests/6`)
      .reply(200, {
        success: true,
        message: "Retrieved ONE request",
        data: [
            {
              requestid: 6,
              product: "laptop",
              requesttype: "repair",
              issue: "the laptop shuts down without any action",
              requeststatus: "pending",
            }
        ]
      });

      const expectedActions = [
        { type: types.FETCH_REQUEST },
        {
          type: types.FETCH_REQUEST_SUCCESS,
          payload: { 
            success: true,
            message: "Retrieved ONE request",
            data: [
                {
                  requestid: 6,
                  product: "laptop",
                  requesttype: "repair",
                  issue: "the laptop shuts down without any action",
                  requeststatus: "pending",
                }
            ]
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(fetchUserSingleRequest(6))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

  it('fetches a users single request for an admin', () => {
    mockAxios.onGet(`${API}/api/v1/requests/6`)
      .reply(200, {
        success: true,
        message: "Retrieved ONE request",
        data: [
            {
              requestid: 6,
              product: "laptop",
              requesttype: "repair",
              issue: "the laptop shuts down without any action",
              requeststatus: "pending",
            }
        ]
      });

      const expectedActions = [
        { type: types.FETCH_REQUEST },
        {
          type: types.FETCH_REQUEST_SUCCESS,
          payload: { 
            success: true,
            message: "Retrieved ONE request",
            data: [
                {
                  requestid: 6,
                  product: "laptop",
                  requesttype: "repair",
                  issue: "the laptop shuts down without any action",
                  requeststatus: "pending",
                }
            ]
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(fetchSingleRequest(6))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

  it('fetches a users single request for an admin', () => {
    mockAxios.onGet(`${API}/api/v1/requests/6`)
      .reply(200, {
        success: true,
        message: "Retrieved ONE request",
        data: [
            {
              requestid: 6,
              product: "laptop",
              requesttype: "repair",
              issue: "the laptop shuts down without any action",
              requeststatus: "pending",
            }
        ]
      });

      const expectedActions = [
        { type: types.FETCH_REQUEST },
        {
          type: types.FETCH_REQUEST_SUCCESS,
          payload: { 
            success: true,
            message: "Retrieved ONE request",
            data: [
                {
                  requestid: 6,
                  product: "laptop",
                  requesttype: "repair",
                  issue: "the laptop shuts down without any action",
                  requeststatus: "pending",
                }
            ]
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(fetchSingleRequest(6))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

  it('delete a users pending request', () => {
    mockAxios.onDelete(`${API}/api/v1/users/requests/6`)
      .reply(200, {
        success: true,
        message: "Request successfully deleted"
      });

      const expectedActions = [
        { type: types.DELETE_REQUEST },
        {
          type: types.DELETE_REQUEST_SUCCESS,
          payload: { 
            success: true,
            message: "Request successfully deleted"
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(deleteUserRequest(6))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

});