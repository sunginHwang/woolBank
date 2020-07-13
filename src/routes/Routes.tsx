import React from 'react';
import { Route, Switch } from 'react-router';
import loadable from '@loadable/component';

const todo = loadable(() => import('../pages/Todo'));
const main = loadable(() => import('../pages/Main'));
const AccountList = loadable(() => import('../pages/account/AccountList'));

function Routes() {
  return (
    <Switch>
      <Route path='/' component={main} exact />
      <Route path='/todo' component={todo} exact />
      <Route path='/accounts' component={AccountList} exact />
    </Switch>
  );
}

export default Routes;
