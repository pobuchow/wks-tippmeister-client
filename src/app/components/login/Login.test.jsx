import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as mutations from '../../store/mutations/mutations';
import { Login } from './Login';

describe('Login Component', () => {
  it('display element', () => {
    const tree = TestRenderer
      .create(<Login authenticated="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('display element not authenticated', () => {
    const tree = TestRenderer
      .create(<Login authenticated={mutations.NOT_AUTHENTICATED} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
