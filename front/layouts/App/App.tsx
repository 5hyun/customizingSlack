import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import loadable from '@loadable/component';

const SignUp = loadable(() => import('@pages/SignUp'));
const LogIn = loadable(() => import('@pages/LogIn'));
const Workspace = loadable(() => import('@layouts//Workspace'));

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="signup" />
      </Route>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
