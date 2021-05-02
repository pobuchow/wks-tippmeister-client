import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const MatchTable = ({ label, match }) => (match ? (
  <div>
    <div className="page-body-label">{label}</div>
    <div className="table-frame">
      <div className="table-div">
        <table className="table">
          <thead>
            <tr>
              <th className="header">Home</th>
              <th className="header">
                {moment(match.event_datetime).format('YYYY-MM-DD')}
              </th>
              <th className="header">
                {moment(match.event_datetime).format('HH:mm')}
              </th>
              <th className="header">Away</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="match-row">
                <div className="match-home-team-row">
                  <div className="match-team-icon">
                    <img
                      className="icon-img"
                      src="https://upload.wikimedia.org/wikipedia/en/8/8f/Slask_Wroclaw_crest.png"
                      alt=""
                    />
                  </div>
                  <div className="match-home-team-row-name">
                    <p className="match-home-team-row-name-p">
                      {match.homeTeam}
                    </p>
                  </div>
                </div>
              </td>
              <td className="match-table-result-row">
                <p className="match-result-p">
                  { Number.isInteger(match.goalsHomeTeam) ? match.goalsHomeTeam : '?'}
                </p>
              </td>
              <td className="match-table-result-row">
                <p className="match-result-p">
                  { Number.isInteger(match.goalsAwayTeam) ? match.goalsAwayTeam : '?'}
                </p>
              </td>
              <td className="match-row">
                <div className="match-away-team-row">
                  <div className="match-away-team-row-name">
                    <p className="match-away-team-row-name-p">
                      {match.awayTeam}
                    </p>
                  </div>
                  <div className="match-team-icon">
                    <img
                      className=".icon-img"
                      src="https://upload.wikimedia.org/wikipedia/en/8/8f/Slask_Wroclaw_crest.png"
                      alt=""
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
) : null);

MatchTable.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    event_datetime: PropTypes.instanceOf(Date).isRequired,
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    goalsHomeTeam: PropTypes.number,
    goalsAwayTeam: PropTypes.number,
  }),
  label: PropTypes.string.isRequired,
};

MatchTable.defaultProps = {
  match: null,
};

export default MatchTable;
