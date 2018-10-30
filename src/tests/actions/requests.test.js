import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actionTypes/requests.types';
import { fetchAllRequests, fetchUserRequests } from '../../actions/requests';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('all requests action', () => {
  it('fetches all requests for the admin', () => {
    mockAxios.onGet(`${API}/api/v1/requests`)
      .reply(200, {
        success: true,
        message: "Requests retrieved successfully",
        data: [
          {
            firstname: "Tomiwa",
            lastname: "Olaniyi",
            requestid: 3,
            product: "monitor",
            requesttype: "repair",
            issue: "Broken screen",
          },
          {
            firstname: "Jude",
            lastname: "Celestine",
            requestid: 6,
            product: "laptop",
            requesttype: "repair",
            issue: "the laptop shuts down without any action",
          }
        ]
      });

      const expectedActions = [
        { type: types.FETCH_REQUESTS },
        {
          type: types.FETCH_REQUESTS_SUCCESS,
          payload: { 
            success: true,
            message: "Requests retrieved successfully",
            data: [
              {
                firstname: "Tomiwa",
                lastname: "Olaniyi",
                requestid: 3,
                product: "monitor",
                requesttype: "repair",
                issue: "Broken screen",
              },
              {
                firstname: "Jude",
                lastname: "Celestine",
                requestid: 6,
                product: "laptop",
                requesttype: "repair",
                issue: "the laptop shuts down without any action",
              }
            ]
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(fetchAllRequests())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

  it('fetches a logged in users requests', () => {
    mockAxios.onGet(`${API}/api/v1/users/requests`)
      .reply(200, {
        message: "Requests successfully retrieved",
        data: [
          {
            firstname: "Tomiwa",
            lastname: "Olaniyi",
            requestid: 3,
            product: "monitor",
            requesttype: "repair",
            issue: "Broken screen",
          },
        ]
      });

      const expectedActions = [
        { type: types.FETCH_REQUESTS },
        {
          type: types.FETCH_REQUESTS_SUCCESS,
          payload: { 
            message: "Requests successfully retrieved",
            data: [
              {
                firstname: "Tomiwa",
                lastname: "Olaniyi",
                requestid: 3,
                product: "monitor",
                requesttype: "repair",
                issue: "Broken screen",
              },
            ]
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(fetchUserRequests())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

});