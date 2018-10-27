import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Auth/Login';

describe('Login component', () => {
  test("renders the Login component", () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.exists()).toBe(true);
  });

  it("Login form should have inputs", () => {
    const wrapper = shallow(<Login />);
  
    const Input = wrapper.find('input');
    expect(Input.exists()).toBe(true);
  });
})
