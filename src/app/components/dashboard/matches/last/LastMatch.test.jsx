import TestRenderer from 'react-test-renderer';
import React from 'react';
import { mapStateToProps } from './LastMatch';

describe('Last Match Component', () => {
  describe('mapStateToProps', () => {
    it('should map state with past matches to props', () => {
      const appState = {
        games: [{
          id: '2',
          name: 'saison 2019/20',
          users: [
            '1', '2', '3', '4',
          ],
          matches: [
            '5', '6', '7', '8',
          ],
          hosts: ['2'],
          isFinished: true,
        }, {
          id: '1',
          name: 'saison 2020/21',
          users: [
            '1', '2', '3', '4',
          ],
          matches: [
            '1', '2', '3', '4',
          ],
          hosts: ['1'],
          isFinished: false,
        }],
        matches: [{
          id: '1',
          event_datetime: new Date(2020, 12 - 1, 17, 18, 0, 0, 0),
          homeTeam: 'Śląsk Wrocław',
          awayTeam: 'Warta Poznań',
          goalsHomeTeam: 2,
          goalsAwayTeam: 1,
        }, {
          id: '2',
          event_datetime: new Date(2020, 12 - 1, 11, 18, 0, 0, 0),
          homeTeam: 'Zagłębie Lubin',
          awayTeam: 'Śląsk Wrocław',
          goalsHomeTeam: 2,
          goalsAwayTeam: 1,
        }, {
          id: '3',
          event_datetime: new Date(2021, 2 - 1, 1, 18, 0, 0, 0),
          homeTeam: 'Stal Mielec',
          awayTeam: 'Śląsk Wrocław',
          goalsHomeTeam: null,
          goalsAwayTeam: null,
        }],
      };
      const ownProps = {
        game: '1',
      };
      const componentState = mapStateToProps(appState, ownProps);
      expect(componentState).toEqual({
        match: {
          id: '1',
          event_datetime: new Date(2020, 12 - 1, 17, 18, 0, 0, 0),
          homeTeam: 'Śląsk Wrocław',
          awayTeam: 'Warta Poznań',
          goalsHomeTeam: 2,
          goalsAwayTeam: 1,
        },
      });
    });
    it('should map state without past matches to props', () => {
      const appState = {
        games: [{
          id: '2',
          name: 'saison 2019/20',
          users: [
            '1', '2', '3', '4',
          ],
          matches: [
            '5', '6', '7', '8',
          ],
          hosts: ['2'],
          isFinished: true,
        }, {
          id: '1',
          name: 'saison 2020/21',
          users: [
            '1', '2', '3', '4',
          ],
          matches: [
            '1', '2', '3', '4',
          ],
          hosts: ['1'],
          isFinished: false,
        }],
        matches: [{
          id: '3',
          event_datetime: new Date(2021, 2 - 1, 1, 18, 0, 0, 0),
          homeTeam: 'Stal Mielec',
          awayTeam: 'Śląsk Wrocław',
          goalsHomeTeam: null,
          goalsAwayTeam: null,
        }],
      };
      const ownProps = {
        game: '1',
      };
      const componentState = mapStateToProps(appState, ownProps);
      expect(componentState).toHaveProperty('match');
      expect(componentState.match).toBeUndefined();
    });
  });
});
