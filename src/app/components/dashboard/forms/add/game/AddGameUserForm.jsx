import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import { requestUpdateGame } from '../../../../../store/mutations/gameMutations';

const label = 'add new player';
const emptyUsersMessage = 'No players available';

export const AddGameUserForm = ({ game, updateGame }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(async () => {
    const url = 'http://localhost:8080';
    const result = await axios(`${url}/users`);
    const availableUsers = _.filter(result.data.users, (u) => !_.includes(game.users, u.id));
    setUsers(availableUsers);
    setUser(_.isEmpty(availableUsers) ? {} : availableUsers[0].id);
  }, []);

  return (
    <div>
      <div className="page-body-label">{label}</div>
      {_.isEmpty(users) ? (
        <h4>{emptyUsersMessage}</h4>
      ) : (
        <form className="form-simple">
          <label className="form-simple-label" htmlFor="users">
            <select id="users" value={user.id} onChange={(e) => setUser(e.target.value)}>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              game.users.push(user);
              const availableUsers = _.filter(users, (u) => u.id !== user);
              setUsers(availableUsers);
              setUser(_.isEmpty(availableUsers) ? {} : availableUsers[0].id);
              updateGame(game);
            }}
          >
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  game: _.find(state.games, ['id', ownProps.game.id]),
});

const mapDispatchToProps = (dispatch) => ({
  updateGame(game) {
    dispatch(requestUpdateGame(game));
  },
});

AddGameUserForm.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.string),
    matches: PropTypes.arrayOf(PropTypes.string),
    hosts: PropTypes.arrayOf(PropTypes.string),
    isFinished: PropTypes.bool.isRequired,
  }).isRequired,
  updateGame: PropTypes.func.isRequired,
};

export const ConnectedAddGameUserForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddGameUserForm);
