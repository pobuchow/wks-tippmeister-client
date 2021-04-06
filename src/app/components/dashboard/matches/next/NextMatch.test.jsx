import TestRenderer from 'react-test-renderer';
import React from 'react';
import { NextMatch, mapStateToProps, ConnectedNextMatch } from './NextMatch';
import ProviderWrapper from '../../../ProviderWrapper';

describe('Next Match Component', () => {
  describe('mapStateToProps', () => {
    it('should map state with matches to props', () => {
      const appState = {
        session: {
          authenticated: true,
          id: '1',
        },
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
        }, {
          id: '4',
          event_datetime: new Date(2021, 2 - 1, 1, 22, 0, 0, 0),
          homeTeam: 'Śląsk Wrocław',
          awayTeam: 'Wisła Kraków',
          goalsHomeTeam: null,
          goalsAwayTeam: null,
        }],
      };
      const ownProps = {
        game: '1',
      };
      const componentState = mapStateToProps(appState, ownProps);
      expect(componentState).toEqual({
        game: {
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
        },
        match: {
          id: '3',
          event_datetime: new Date(2021, 2 - 1, 1, 18, 0, 0, 0),
          homeTeam: 'Stal Mielec',
          awayTeam: 'Śląsk Wrocław',
          goalsHomeTeam: null,
          goalsAwayTeam: null,
        },
        userId: '1',
      });
    });
    it('should map state without next match to props', () => {
      const appState = {
        session: {
          authenticated: true,
          id: '1',
        },
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
  describe('display element', () => {
    it('should render element with next match', () => {
      const tree = TestRenderer
        .create(
          ProviderWrapper(<ConnectedNextMatch game="1" />),
        ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should not render element without next match', () => {
      const tree = TestRenderer
        .create(<NextMatch match={undefined} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
