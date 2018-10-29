import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import Navbar from '../components/Layout/Navbar';
import WelcomeBody from '../components/Layout/WelcomeBody';
import Footer from '../components/Layout/Footer';

describe('Layout Page', () => {
  test("renders the navbar component", () => {
    const wrapper = shallow(
      <Provider>
        <Navbar />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
  test("renders the welcome body component", () => {
    const wrapper = shallow(
      <Provider>
        <WelcomeBody />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
  test("renders the footer component", () => {
    const wrapper = shallow(
      <Provider>
        <Footer />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
})
