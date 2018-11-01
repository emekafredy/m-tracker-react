import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';


import { Requests } from '../../components/User/Requests';
import { initialState } from '../../reducers/requests';

const state = {
  ...initialState,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);

describe('Requests Component', () => {

  
  const props = {
    fetchUserRequests: jest.fn(),
    fetchAllRequests: jest.fn(),
    deleteUserRequest: jest.fn(),
    auth: {
      isAuthenticated: true,
      user: {
        user: {}
      }
    },
    requests: {
      requests: {
        data: [],
        message: ''
      }
    },
    history: {
      push: jest.fn()
    }
  };
  

  test('renders the Requests Component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Requests {...props}/>
        </Router>
      </Provider>,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
