import React from 'react';
import { shallow } from 'enzyme';

import { Navbar } from '../../components/Layout/Navbar';


describe('Navbar', () => {

  test("renders the Navbar component", () => {
    const props = {
      logoutUser: jest.fn(),
      auth: {
        isAuthenticated: true,
        user: {
          user: {
            firstname: 'emeka'
          }
        }
      }
    };

    const wrapper = shallow(<Navbar {...props} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  test('should successfully log user out', () => {
    const props = {
      logUserOut: jest.fn(),
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

    const event = {
      preventDefault: jest.fn(),
    }

    const wrapper = shallow(<Navbar {...props} />);

    const logout = wrapper.find('#logoutuser');
    logout.simulate('click', event);

    expect(props.logUserOut).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });
})
