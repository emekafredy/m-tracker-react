import React from 'react';
import { shallow } from 'enzyme';

import AppRoutes from '../components/AppRoutes';

describe('AppRoutes component', () => {
  test("renders the AppRoutes component", () => {
    const wrapper = shallow(<AppRoutes />);

    expect(wrapper.exists()).toBe(true);
  });
})
