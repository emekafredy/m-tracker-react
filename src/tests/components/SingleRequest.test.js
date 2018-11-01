import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';


import { SingleRequest } from '../../components/User/SingleRequest';
import { initialState } from '../../reducers/request';

const state = {
  ...initialState,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);

describe('SingleRequest Component', () => {

  
  const props = {
    fetchSingleRequest: jest.fn(),
    fetchUserSingleRequest: jest.fn(),
    processRequest: jest.fn(),
    deleteUserRequest: jest.fn(),
    processRequest: jest.fn(),
    auth: {
      isAuthenticated: true,
      user: {
        user: {
          isadmin: true
        }
      }
    },
    singleRequest: {
      singleRequest: {
        data: [{
          imageurl: 'someurl'
        }]
      }
    },
    match: {
      params: {
        requestId: 1
      }
    },
    processed: {},
    history: {
      push: jest.fn()
    }
  };
  

  test('renders the Single Request Component for admin', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <SingleRequest {...props}/>
        </Router>
      </Provider>,
    );
    expect(wrapper.exists()).toBe(true);
  });

  test('renders the Single Request Component for user', () => {
    const userProps = {
      ...props,
      auth: {
        isAuthenticated: true,
        user: {
          user: {
            isadmin: false
          }
        }
      },
    }
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <SingleRequest {...userProps}/>
        </Router>
      </Provider>,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
