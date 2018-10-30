import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../components/Layout/Footer';

describe('Footer', () => {
  test("renders the footer component", () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper.exists()).toBe(true);
  });
})
