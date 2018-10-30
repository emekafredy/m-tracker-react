import React from 'react';
import { shallow } from 'enzyme';

import { newRequest } from '../__mocks__/mockData';
import { CreateRequest } from '../../components/User/CreateRequest';

let wrapper;

describe('CreateRequest component', () => {

  beforeEach(() => {
    const props = {
      action: {
        createNewRequest: jest.fn()
      },
      errors: {},
      request: {},
      history: {
        push: jest.fn()
      }
    };
    wrapper = shallow(
        <CreateRequest {...props} />
    );
  });


  test('renders the create request component', () => {
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

  test('it successfully submits a new request', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    const createRequest = wrapper.find('#create-request');
    wrapper.setState(newRequest);
    createRequest.simulate('click', event);
  
    expect(wrapper.instance().state.errors).toEqual({});
  });

  test('it returns error when the user makes a bad request', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    const createRequest = wrapper.find('#create-request');
    createRequest.simulate('click', event);
  
    expect(wrapper.instance().state.errors).not.toBe({});
  });
})
