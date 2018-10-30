import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actionTypes/updateRequest.types';
import { updateUserRequest } from '../../actions/updateRequest';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('update request action', () => {
  it('updates a logged users pending request', () => {
    mockAxios.onPut(`${API}/api/v1/users/requests/2`)
      .reply(200, {
        success: true,
        message: "Request successfully updated",
        updatedRequest: {
            product: "laptop",
            requestType: "maintenance",
            issue: "the laptop shuts down without any action like hell"
        }
      });

      const expectedActions = [
        { type: types.UPDATE_REQUEST },
        {
          type: types.UPDATE_REQUEST_SUCCESS,
          payload: { 
            success: true,
            message: "Request successfully updated",
            updatedRequest: {
                product: "laptop",
                requestType: "maintenance",
                issue: "the laptop shuts down without any action like hell"
            }
          },
        }
      ]
      const store = mockStore({data: {}});
      return store.dispatch(updateUserRequest(2))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

});