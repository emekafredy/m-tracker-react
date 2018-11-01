import React from 'react';
import { shallow } from 'enzyme';
import { loginDetails } from '../__mocks__/mockData';

import { Login } from '../../components/Auth/Login';

let wrapper;

describe('Login component', () => {

  beforeEach(() => {
    const props = {
      action: {
        loginUser: jest.fn()
      },
      errors: {},
      auth: {
        isAuthenticated: true
      },
      history: {
        push: jest.fn()
      }
    };
    wrapper = shallow(
        <Login {...props} />
    );
  });

  test("renders the Login component", () => { 
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  test('it sets the email when its state changes', () => {
    const event = {
      target: {
        name: 'email',
        value: 'emeka@mail.com'
      }
    };

    wrapper.find('#email').simulate('change', event);;
    const expectedResult = 'emeka@mail.com';

    expect(wrapper.instance().state.email).toBe(expectedResult);
  });

  test('it sets the password when its state changes', () => {
    const event = {
      target: {
        name: 'password',
        value: 'mypass'
      }
    };

    wrapper.find('#password').simulate('change', event);
    const expectedResult = 'mypass';

    expect(wrapper.instance().state.password).toBe(expectedResult);
  });

  test('it successfully logs in a registered user', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    const login = wrapper.find('#submit');
    wrapper.setState(loginDetails);
    login.simulate('click', event);
  
    expect(wrapper.instance().state.errors).toEqual({});
  });

  test('it fails when user makes a bad request', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    const login = wrapper.find('#submit');
    login.simulate('click', event);
    expect(wrapper.instance().state.errors).not.toBe({});
  });

  test('it fails when user makes a bad request', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'email',
        value: ''
      }
    };

    wrapper.find('#submit').simulate('click', event);

    expect(wrapper).toMatchSnapshot();
  });
  
})
