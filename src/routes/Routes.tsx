import React from 'react';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, RouteProps, Switch } from 'react-router';
import { RootState } from '../store';

import LayoutContainer from '../containers/LayoutContainer';

const Main = loadable(() => import('../pages/Main'));
const AccountList = loadable(() => import('../pages/account/AccountList'));
const AccountDetail = loadable(() => import('../pages/account/AccountDetail'));
const AccountRegister = loadable(() => import('../pages/account/AccountRegister'));
const BucketList = loadable(() => import('../pages/bucketList/BucketList'));
const BucketListDetail = loadable(() => import('../pages/bucketList/BucketListDetail'));
const BucketListSave = loadable(() => import('../pages/bucketList/BucketListSave'));
const Login = loadable(() => import('../pages/user/login'));

function Routes() {
  const user = useSelector((state: RootState) => state.Auth.user);
  const isLogin = user.id > 0;

  return (
    <Switch>
      <RouteWrapper path='/' component={Main} exact isLogin={isLogin} />
      <RouteWrapper path='/login' component={Login} exact useNavBar={false} checkAuth={false} />
      <RouteWrapper path='/accounts' component={AccountList} exact isLogin={isLogin} />
      <RouteWrapper path='/accounts/register' component={AccountRegister} exact isLogin={isLogin} />
      <RouteWrapper path='/accounts/:accountId' component={AccountDetail} useNavBar={false} isLogin={isLogin} />
      <RouteWrapper path='/bucket-list' component={BucketList} exact isLogin={isLogin} />
      <RouteWrapper path='/bucket-list/save' component={BucketListSave} exact isLogin={isLogin} />
      <RouteWrapper path='/bucket-list/:bucketListId' component={BucketListDetail} useNavBar={false} isLogin={isLogin} />
    </Switch>
  );
}

export interface LayoutRouteProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  useNavBar?: boolean;
  isLogin?: boolean;
  checkAuth?: boolean;
}

function RouteWrapper({ component: Component, useNavBar, isLogin = false, checkAuth = true, ...rest }: LayoutRouteProps) {
  const renderLayout = (props: any) => (
    <LayoutContainer useNavBar={useNavBar}>
      {Component && <Component {...props} {...rest} />}
    </LayoutContainer>
  );

  const isNotAuth = checkAuth && !isLogin;

  return (
    <Route
      {...rest}
      render={props => {
        if (isNotAuth) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        return renderLayout(props);
      }}
    />
  );
}

export default Routes;
