/* @flow */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import theme from './theme';

import LoginOverlay from './components/LoginOverlay';
import About from './components/About';
import Repo from './components/Repo';
import NotFound from './components/NotFound';
import Issue from './components/Issue';

const App = () => (
  <div className={css(styles.container)}>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/priorly/priorly.github.io" />}
      />
      <Route exact path="/:owner/:repo" component={Repo} />
      <Route exact path="/:owner/:repo/:number" component={Issue} />
      <Route exact path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
    <LoginOverlay />
  </div>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.background,
    minWidth: '100vw',
    minHeight: '100vh',
    padding: '0 0 50px',
    boxSizing: 'border-box'
  }
});

export default App;
