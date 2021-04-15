import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ConnectedNextBet } from './bet/NextBet';
import calcPoints from '../../../services/score/ScoreService';

export const Scoreboard = ({ scores, gameId }) => (
  <div className="page-body-full">
    <div className="table-frame">
      <div className="table-div">
        <table className="table">
          <thead>
            <tr>
              <th className="scoreboard-header">player</th>
              <th className="header">points</th>
              <th className="header">next bet</th>
            </tr>
          </thead>
          <tbody>
            {_.orderBy(scores, ['points'], ['desc']).map((score) => (
              <tr key={score.userId}>
                <td className="scoreboard-name-row">{score.name}</td>
                <td className="scoreboard-points-row">{score.points}</td>
                <td className="scoreboard-score-row"><ConnectedNextBet gameId={gameId} userId={score.userId} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

function mapState2Props(state, ownProps) {
  const users = _.filter(state.users, (user) => _.includes(ownProps.users, user.id));
  const matches = _.filter(state.matches, (match) => _.includes(ownProps.matches, match.id));
  const scoresResult = _.map(users, (user) => ({
    userId: user.id,
    name: user.name,
    points: calcPoints(
      matches,
      _.filter(state.bets, { game: ownProps.game, owner: user.id }),
    ),
  }));
  return {
    gameId: ownProps.game,
    scores: scoresResult,
  };
}

Scoreboard.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number,
  })),
  gameId: PropTypes.string.isRequired,
};

Scoreboard.defaultProps = {
  scores: [],
};

export const ConnectedScoreboard = connect(mapState2Props)(Scoreboard);
