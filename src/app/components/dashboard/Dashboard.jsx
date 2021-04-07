import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ConnectedNextMatch } from './matches/next/NextMatch';
import { ConnectedLastMatch } from './matches/last/LastMatch';
import { ConnectedScoreboard } from './scoreboard/Scoreboard';
import { ConnectedAddGameUserForm } from './forms/add/game/AddGameUserForm';
import { ConnectedAddNextMatchForm } from './forms/add/match/AddNextMatchForm';

const label = 'dashboard';

export const Dashboard = ({ userId, game }) => (
  <div className="page">
    <div className="page-body-full">
      <div className="page-body-label">{label}</div>
      <ConnectedScoreboard
        users={game.users}
        matches={game.matches}
        game={game.id}
      />
      <div className="dashboard-host-panel">
        {_.includes(game.hosts, userId) && <ConnectedAddGameUserForm game={game} />}
        {_.includes(game.hosts, userId) && <ConnectedAddNextMatchForm game={game} />}
      </div>
      <ConnectedLastMatch game={game.id} />
      <ConnectedNextMatch game={game.id} />
    </div>
  </div>
);

export function mapStateToProps(state, ownProps) {
  const gameId = ownProps.route.params.id;
  const game = _.find(state.games, ['id', gameId]);
  return {
    userId: state.session.id,
    game,
  };
}

Dashboard.propTypes = {
  userId: PropTypes.string.isRequired,
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.string),
    matches: PropTypes.arrayOf(PropTypes.string),
    hosts: PropTypes.arrayOf(PropTypes.string),
    isFinished: PropTypes.bool.isRequired,
  }).isRequired,
};

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
