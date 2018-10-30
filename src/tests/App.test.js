import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App', () => {
  test("renders the routes in the App component", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
})
