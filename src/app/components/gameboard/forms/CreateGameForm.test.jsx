import TestRenderer, { act } from 'react-test-renderer';
import React from 'react';
import { ConnectedCreateGameForm, mapStateToProps } from './CreateGameForm';
import ProviderWrapper from '../../ProviderWrapper';

describe('Create Game Form', () => {
  describe('mapStateToProps', () => {
    it('should map state with userId props', () => {
      const expectedId = '1';
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
        session: {
          id: expectedId,
        },
      };
      const componentState = mapStateToProps(appState);
      expect(componentState).toEqual({ userId: expectedId });
    });
  });
  describe('mapDispatchToProps', () => {
    it('should dispatch prop after button click', () => {
      const dispatch = jest.fn();
      const renderer = TestRenderer.create(
        ProviderWrapper(
          <ConnectedCreateGameForm />, {
            dispatch,
          },
        ),
      );
      const expectedGameName = 'new test game';
      const gameNameField = renderer.root.findByProps({
        id: 'gameName',
      });
      expect(gameNameField.props.placeholder).toEqual('name');
      expect(gameNameField.props.value).toEqual('');
      const onChangeEvent = { target: { value: expectedGameName } };
      act(() => {
        gameNameField.props.onChange(onChangeEvent);
      });
      expect(gameNameField.props.value).toEqual(expectedGameName);
      const createGameButton = renderer.root.findByType('button');
      createGameButton.props.onClick();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'REQUEST_CREATE_GAME', userId: '1', name: expectedGameName });
    });
  });
});
