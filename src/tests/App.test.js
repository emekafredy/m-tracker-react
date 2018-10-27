import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

describe('Signup component', () => {
  test("renders the signup component", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });
})
