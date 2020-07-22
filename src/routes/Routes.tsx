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
      <RouteWithLayout path='/' component={Main} exact />
      <RouteWithLayout path='/todo' component={todo} exact />
      <RouteWithLayout path='/accounts' component={AccountList} exact />
      <RouteWithLayout path='/accounts/:accountId' component={AccountDetail} useNavBar={false} />
    </Switch>
  );
}

export interface LayoutRouteProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  useNavBar?: boolean;
}

function RouteWithLayout({ component: Component, useNavBar, ...rest }: LayoutRouteProps) {
  return (
    <Route
      {...rest} render={props =>
        <LayoutContainer useNavBar={useNavBar}>
          {Component && <Component {...props} {...rest} />}
        </LayoutContainer>}
    />
  );
}

export default Routes;
