import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actionTypes/processRequest.types';
import { processRequest } from '../../actions/processRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('process request action', () => {
  it('approves a users request', () => {
    mockAxios.onPut(`${API}/api/v1/requests/2/approve`)
      .reply(200, {
        message: "Request has been approved",
        data: [
            {
              requestid: 2,
              product: "monitor",
              requesttype: "repair",
              issue: "Broken screen",
              requeststatus: "approved",
            }
        ]
      });

      const expectedActions = [
        { type: types.PROCESS_REQUEST },
        {
          type: types.PROCESS_REQUEST_SUCCESS,
          payload: { 
            message: "Request has been approved",
            data: [
                {
                  requestid: 2,
                  product: "monitor",
                  requesttype: "repair",
                  issue: "Broken screen",
                  requeststatus: "approved",
                }
            ]
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(processRequest(2, 'approve'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

  it('disapproves a users request', () => {
    mockAxios.onPut(`${API}/api/v1/requests/3/disapprove`)
      .reply(200, {
        message: "Request has been disapproved",
        data: [
            {
              requestid: 3,
              product: "monitor",
              requesttype: "repair",
              issue: "Broken screen",
              requeststatus: "disapproved",
            }
        ]
      });

      const expectedActions = [
        { type: types.PROCESS_REQUEST },
        {
          type: types.PROCESS_REQUEST_SUCCESS,
          payload: { 
            message: "Request has been disapproved",
            data: [
                {
                  requestid: 3,
                  product: "monitor",
                  requesttype: "repair",
                  issue: "Broken screen",
                  requeststatus: "disapproved",
                }
            ]
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(processRequest(3, 'disapprove'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

  it('resolves a users approved request', () => {
    mockAxios.onPut(`${API}/api/v1/requests/2/resolve`)
      .reply(200, {
        message: "Request has been resolved",
        data: [
            {
              requestid: 2,
              product: "monitor",
              requesttype: "repair",
              issue: "Broken screen",
              requeststatus: "resolved",
            }
        ]
      });

      const expectedActions = [
        { type: types.PROCESS_REQUEST },
        {
          type: types.PROCESS_REQUEST_SUCCESS,
          payload: { 
            message: "Request has been resolved",
            data: [
                {
                  requestid: 2,
                  product: "monitor",
                  requesttype: "repair",
                  issue: "Broken screen",
                  requeststatus: "resolved",
                }
            ]
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(processRequest(2, 'resolve'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

});
