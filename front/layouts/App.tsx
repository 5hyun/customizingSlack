import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import loadable from '@loadable/component';

const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="signup" />
      </Route>
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};

export default App;
