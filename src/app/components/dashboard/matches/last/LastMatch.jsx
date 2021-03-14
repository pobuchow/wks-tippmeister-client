import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import MatchTable from '../table/MatchTable';
import { getLastMatch } from '../../../../services/match/MatchService';

const label = 'last match';

export const LastMatch = ({ match }) => (match ? (
  <div className="page-body-full">
    <MatchTable label={label} match={match} />
  </div>
) : null);

export function mapStateToProps(state, ownProps) {
  const game = _.find(state.games, { id: ownProps.game });
  const matches = _.filter(state.matches, (match) => _.includes(game.matches, match.id));
  return {
    match: getLastMatch(matches),
  };
}

LastMatch.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    event_datetime: PropTypes.instanceOf(Date).isRequired,
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    goalsHomeTeam: PropTypes.number.isRequired,
    goalsAwayTeam: PropTypes.number.isRequired,
  }),
};

LastMatch.defaultProps = {
  match: null,
};

export const ConnectedLastMatch = connect(mapStateToProps)(LastMatch);
