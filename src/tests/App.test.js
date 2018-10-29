import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import App from '../App';

describe('Signup component', () => {
  test("renders the signup component", () => {
    const wrapper = shallow(
    <Provider>
      <App />
    </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
})
