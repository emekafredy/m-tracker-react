import React from 'react';
import { shallow } from 'enzyme';

import { PrivateRoute } from '../../components/ProtectRoutes/PrivateRoute';

let wrapper;

describe('PrivateRoute component', () => {

  beforeEach(() => {
    const props = {
      auth: {
        isAuthenticated: true
      },
      component: {

      }
    };
    wrapper = shallow(
        <PrivateRoute {...props} />
    );
  });

  test("renders PrivateRoutes", () => { 
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });  
})
