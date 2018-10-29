import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import Login from '../components/Auth/Login';

describe('Login component', () => {
  test("renders the Login component", () => {
    const wrapper = shallow(
      <Provider>
        <Login />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
})
