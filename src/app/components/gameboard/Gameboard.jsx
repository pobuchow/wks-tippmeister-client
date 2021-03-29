import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ConnectedCreateGameForm } from './forms/CreateGameForm';

export const Gameboard = ({ games }) => (
  <div className="page">
    <div className="page-body-full">
      <div className="page-body-label">Wks-Tippmeister</div>
      <div className="gameboard">
        {games.map((game) => (
          <Link key={game.id} to={`games/${game.id}/dashboard`}>
            <div className="gameboard-card">
              <h2 className="gameboard-card-title">{game.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      <ConnectedCreateGameForm />
    </div>
  </div>
);

Gameboard.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.string),
    matches: PropTypes.arrayOf(PropTypes.string),
    hosts: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFinished: PropTypes.bool.isRequired,
  })),
};

Gameboard.defaultProps = {
  games: [],
};

export const ConnectedGameboard = connect((state) => ({ games: state.games }))(
  Gameboard,
);
