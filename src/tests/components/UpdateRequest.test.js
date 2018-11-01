import React from 'react';
import { shallow } from 'enzyme';

import { UpdateRequest } from '../../components/User/UpdateRequest';
import { updateData } from '../__mocks__/mockData';

let wrapper;

describe('UpdateRequest component', () => {

  beforeEach(() => {
    const props = {
      fetchUserSingleRequest: jest.fn(),
      updateUserRequest: jest.fn(),
      fetchAllRequests: jest.fn(),
      auth: {},      
      history: {
        push: jest.fn()
      },
      match: {
        params: {
          requestId: 1
        }
      },
    };
    wrapper = shallow(
        <UpdateRequest {...props} />
    );
  });

  test('renders the update request component', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists()).toBe(true);
  });

  test('it sets the Product when its state changes', () => {
    const event = {
      target: {
        name: 'product',
        value: 'laptop'
      }
    };

    wrapper.find('#my-product').simulate('change', event);;
    const expectedResult = 'laptop';

    expect(wrapper.instance().state.product).toBe(expectedResult);
  });

  test('it successfully updates a new request', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    const createRequest = wrapper.find('#update-request');
    wrapper.setState(updateData);
    createRequest.simulate('click', event);
  
    expect(wrapper.instance().state.errors).toEqual("");
  });

})