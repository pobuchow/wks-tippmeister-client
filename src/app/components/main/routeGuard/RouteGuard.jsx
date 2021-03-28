import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { store } from '../../../store';

function withData(Component) {
  const redirect = ({ match }) => {
    if (!store.getState().session.authenticated) {
      return <Redirect to="/" />;
    }
    return <Component match={match} />;
  };
  redirect.propTypes = {
    match: PropTypes.shape({
      id: PropTypes.string.isRequired,
      event_datetime: PropTypes.instanceOf(Date).isRequired,
      homeTeam: PropTypes.string.isRequired,
      awayTeam: PropTypes.string.isRequired,
      goalsHomeTeam: PropTypes.number,
      goalsAwayTeam: PropTypes.number,
    }),
  };
  return redirect;
}

const RouteGuard = (Component) => withData(Component);

export default RouteGuard;
