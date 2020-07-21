import React from 'react';
import { Route, RouteComponentProps, RouteProps, Switch } from 'react-router';
import loadable from '@loadable/component';

import LayoutContainer from '../containers/LayoutContainer';
const todo = loadable(() => import('../pages/Todo'));
const Main = loadable(() => import('../pages/Main'));
const AccountList = loadable(() => import('../pages/account/AccountList'));
const AccountDetail = loadable(() => import('../pages/account/AccountDetail'));

function Routes() {
  return (
    <Switch>
      <RouteWrapper path='/' component={Main} exact />
      <RouteWrapper path='/accounts' component={AccountList} exact />
      <Route path='/todo' component={todo} />
      <Route path='/accounts/:accountId' component={AccountDetail} />
    </Switch>
  );
}

interface LayoutRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

function RouteWrapper({ component: Component, ...rest }: LayoutRouteProps) {
  return (
    <Route
      {...rest} render={props =>
        <LayoutContainer {...props}>
          <Component {...props} />
        </LayoutContainer>}
    />
  );
}


export default Routes;
