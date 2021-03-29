import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCreateGame } from '../../../store/mutations/gameMutations';

export const CreateGameForm = ({ userId, createGame }) => {
  const [name, setName] = useState('');

  return (
    <div className="page-body-md">
      <div className="page-body-label">create new game</div>
      <form className="form-simple">
        <label className="form-simple-label" htmlFor="gameName">
          <input
            id="gameName"
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="button" onClick={() => createGame(userId, name)}>
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
    </div>
  );
};

CreateGameForm.propTypes = {
  userId: PropTypes.string.isRequired,
  createGame: PropTypes.func,
};

CreateGameForm.defaultProps = {
  createGame: null,
};

const mapDispatchToProps = (dispatch) => ({
  createGame(userId, name) {
    dispatch(requestCreateGame(userId, name));
  },
});

export const ConnectedCreateGameForm = connect(
  (state) => ({ userId: state.session.id }),
  mapDispatchToProps,
)(CreateGameForm);
