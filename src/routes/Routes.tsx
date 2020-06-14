import React from 'react';
import { Route, Switch } from 'react-router';
import loadable from '@loadable/component';

const todo = loadable(() => import('../pages/Todo'));
const main = loadable(() => import('../pages/Main'));

function Routes() {

  return (
    <Switch>
      <Route path="/" component={main} exact/>
      <Route path="/todo" component={todo} exact/>
    </Switch>
  );
};

export default Routes;


