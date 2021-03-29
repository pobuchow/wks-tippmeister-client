import TestRenderer from 'react-test-renderer';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';

describe('Main Component', () => {
  it('navigates to login page on entry', () => {
    const tree = TestRenderer.create(
      <MemoryRouter initialEntries={['/']}>
        <Main />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('navigates to login page on /games without auth', () => {
    const tree = TestRenderer.create(
      <MemoryRouter initialEntries={['/games']}>
        <Main />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
