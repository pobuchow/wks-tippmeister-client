import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  getNextMatch,
} from '../../../../services/match/MatchService';

export const NextBet = ({ betId, goalsHomeTeam, goalsAwayTeam }) => (betId ? (
  <div style={{ display: 'inline-block' }}>
    {betId
      ? (
        <div key={betId}>
          {goalsHomeTeam}
          {' '}
          :
          {' '}
          {goalsAwayTeam}
        </div>
      )
      : ''}
  </div>
) : null);

function mapState2Props(state, ownProps) {
  const game = _.find(state.games, { id: ownProps.gameId });
  const matches = _.filter(state.matches, (match) => _.includes(game.matches, match.id));
  const nextMatch = getNextMatch(matches);
  if (!nextMatch) {
    return {};
  }
  const nextBets = _.filter(state.bets,
    (bet) => bet.game === game.id && bet.match === nextMatch.id);
  const bet = _.find(nextBets, ['owner', ownProps.userId]);
  return bet ? {
    betId: bet.id,
    goalsHomeTeam: bet.goalsHomeTeam,
    goalsAwayTeam: bet.goalsAwayTeam,
  } : {};
}

NextBet.propTypes = {
  betId: PropTypes.string,
  goalsHomeTeam: PropTypes.number,
  goalsAwayTeam: PropTypes.number,
};

NextBet.defaultProps = {
  betId: null,
  goalsHomeTeam: null,
  goalsAwayTeam: null,
};

export const ConnectedNextBet = connect(mapState2Props)(NextBet);
