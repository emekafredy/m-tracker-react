import React from 'react';
import { shallow } from 'enzyme';
import { signupDetails } from '../__mocks__/mockData';

import { SignUp } from '../../components/Auth/SignUp';

let wrapper;

describe('Signup component', () => {

  beforeEach(() => {
    const props = {
      action: {
        registerUser: jest.fn()
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
        <SignUp {...props} />
    );
  });

  test("renders the signup component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  test('it sets the firstName when its state changes', () => {
    const event = {
      target: {
        name: 'firstName',
        value: 'emeka'
      }
    };

    wrapper.find('#firstName').simulate('change', event);;
    const expectedResult = 'emeka';

    expect(wrapper.instance().state.firstName).toBe(expectedResult);
  });

  test('it successfully registers a new user', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    const signup = wrapper.find('#register');
    wrapper.setState(signupDetails);
    signup.simulate('click', event);
  
    expect(wrapper.instance().state.errors).toEqual({});
  });

  test('it fails when user makes a bad request', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    const signup = wrapper.find('#register');
    signup.simulate('click', event);
  
    expect(wrapper.instance().state.errors).not.toBe({});
  });

})
