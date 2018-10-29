import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import SignUp from '../components/Auth/SignUp';

describe('Signup component', () => {
  test("renders the signup component", () => {
    const wrapper = shallow(
      <Provider>
        <SignUp />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
})
