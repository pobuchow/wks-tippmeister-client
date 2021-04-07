import React from 'react';
import { Redirect } from 'react-router';
import { store } from '../../../store';

function withData(Component) {
  const redirect = ({ match }) => {
    if (!store.getState().session.authenticated) {
      return <Redirect to="/" />;
    }
    return <Component route={match} />;
  };
  return redirect;
}

const RouteGuard = (Component) => withData(Component);

export default RouteGuard;
