import React from 'react';
import { shallow } from 'enzyme';
import SignUp from '../Auth/SignUp';

describe('Signup component', () => {
  test("renders the signup component", () => {
    const wrapper = shallow(<SignUp />);

    expect(wrapper.exists()).toBe(true);
  });

  it("signup form should have inputs", () => {
    const wrapper = shallow(<SignUp />);
  
    const Input = wrapper.find('input');
    expect(Input.exists()).toBe(true);
  });
})
