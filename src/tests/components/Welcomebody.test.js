import React from 'react';
import { shallow } from 'enzyme';

import { WelcomeBody } from '../../components/Layout/WelcomeBody';

describe('WelcomeBody', () => {
  test("renders the WelcomeBody component", () => {
    const props = {
      auth: {
        isAuthenticated: true,
        user: {
          user: {
            firstname: 'emeka'
          }
        }
      },
      history: {
        push: jest.fn(),
      }
    };
  
    const wrapper = shallow( <WelcomeBody {...props} /> );

    expect(wrapper.exists()).toBe(true);
  });
})
