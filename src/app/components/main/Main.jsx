import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { store } from '../../store';
import { ConnectedDashboard } from '../dashboard/Dashboard';
import { ConnectedLogin } from '../login/Login';
import { history } from '../../store/history';
import { ConnectedGameboard } from '../gameboard/Gameboard';
import RouteGuard from './routeGuard/RouteGuard';

const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <Switch>
          <Route exact path="/" component={ConnectedLogin} />
          <Route exact path="/games" render={RouteGuard(ConnectedGameboard)} />
          <Route
            exact
            path="/games/:id/dashboard"
            render={RouteGuard(ConnectedDashboard)}
          />
        </Switch>
      </div>
    </Provider>
  </Router>
);

export default Main;
