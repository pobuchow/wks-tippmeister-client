import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  getNextMatch,
} from '../../../../services/match/MatchService';
import MatchTable from '../table/MatchTable';
import { ConnectedBetNextMatchForm } from './BetNextMatchForm';
import { ConnectedSetMatchResultForm } from './SetMatchResultForm';

const label = 'next match';

export const NextMatch = ({ userId, game, match }) => (match ? (
  <div className="page-body-full">
    <MatchTable label={label} match={match} />
    {_.includes(game.hosts, userId) && (
    <ConnectedSetMatchResultForm match={match} />
    )}
    <ConnectedBetNextMatchForm match={match} gameId={game.id} />
  </div>
) : null);

export function mapStateToProps(state, ownProps) {
  const game = _.find(state.games, { id: ownProps.game });
  const matches = _.filter(state.matches, (match) => _.includes(game.matches, match.id));
  const match = game.isFinished ? null : getNextMatch(matches);
  return {
    userId: state.session.id,
    game,
    match,
  };
}

NextMatch.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    event_datetime: PropTypes.instanceOf(Date).isRequired,
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    goalsHomeTeam: null,
    goalsAwayTeam: null,
  }),
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.string),
    matches: PropTypes.arrayOf(PropTypes.string),
    hosts: PropTypes.arrayOf(PropTypes.string),
    isFinished: PropTypes.bool.isRequired,
  }),
  userId: PropTypes.string,
};

NextMatch.defaultProps = {
  match: null,
  game: null,
  userId: null,
};

export const ConnectedNextMatch = connect(mapStateToProps)(NextMatch);
