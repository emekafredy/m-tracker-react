import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../../components/ProtectRoutes/NotFound';

describe('NotFound', () => {
  test("renders the NotFound component", () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper.exists()).toBe(true);
  });
})
