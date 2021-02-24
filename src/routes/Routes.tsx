import React from 'react';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, RouteProps, Switch } from 'react-router';
import { RootState } from '@/store';

import PageNotFound from '@pages/error/PageNotFound';
import LayoutContainer from '@containers/LayoutContainer';
import MainPageSkeleton from '@components/main/MainPageSkeleton';
import PageTemplate from '@components/layout/PageTemplate';
import ScrollToTop from '@routes/ScrollToTop';

const defaultFallback = { fallback: <PageTemplate useHeader={false} /> };

const Main = loadable(() => import('@pages/Main'), { fallback: <MainPageSkeleton /> });
const AccountList = loadable(() => import('@pages/account/AccountList'), defaultFallback);
const AccountDetail = loadable(() => import('@pages/account/AccountDetail'), defaultFallback);
const AccountRegister = loadable(() => import('@pages/account/AccountRegister'), defaultFallback);
const BucketList = loadable(() => import('@pages/bucketList/BucketList'), defaultFallback);
const BucketListDetail = loadable(() => import('@pages/bucketList/BucketListDetail'), defaultFallback);
const BucketListSave = loadable(() => import('@pages/bucketList/BucketListSave'), defaultFallback);
const Login = loadable(() => import('@pages/user/login'));
const Menu = loadable(() => import('@pages/Menu'));
const RegularExpenditureList = loadable(() => import('@pages/regularExpenditure/RegularExpenditureList'));
const SaveRegularExpenditurePage = loadable(() => import('@pages/regularExpenditure/SaveRegularExpenditurePage'));

function Routes() {
  const user = useSelector((state: RootState) => state.Auth.user);
  const isLogin = user.id > 0;

  return (
    <ScrollToTop>
      <Switch>
        <RouteWrapper path='/' component={Main} exact isLogin={isLogin} />
        <RouteWrapper path='/mypage' component={Menu} exact isLogin={isLogin} />
        <RouteWrapper path='/login' component={Login} exact useNavBar={false} checkAuth={false} />
        <RouteWrapper path='/accounts' component={AccountList} exact isLogin={isLogin} />
        <RouteWrapper path='/accounts/save' component={AccountRegister} exact isLogin={isLogin} />
        <RouteWrapper path='/accounts/:accountId' component={AccountDetail} useNavBar={false} isLogin={isLogin} />
        <RouteWrapper path='/bucket-list' component={BucketList} exact isLogin={isLogin} />
        <RouteWrapper path='/bucket-list/save' component={BucketListSave} exact isLogin={isLogin} />
        <RouteWrapper
          path='/bucket-list/:bucketListId'
          component={BucketListDetail}
          useNavBar={false}
          isLogin={isLogin}
        />
        <RouteWrapper path='/regular-expenditure' component={RegularExpenditureList} exact isLogin={isLogin} />
        <RouteWrapper path='/regular-expenditure/save' component={SaveRegularExpenditurePage} exact useNavBar={false} isLogin={isLogin} />
        <Route component={PageNotFound} />
      </Switch>
    </ScrollToTop>
  );
}

export interface LayoutRouteProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  useNavBar?: boolean;
  isLogin?: boolean;
  checkAuth?: boolean;
}

function RouteWrapper({
  component: Component,
  useNavBar,
  isLogin = false,
  checkAuth = true,
  ...rest
}: LayoutRouteProps) {
  const renderLayout = (props: any) => (
    <LayoutContainer useNavBar={useNavBar}>{Component && <Component {...props} {...rest} />}</LayoutContainer>
  );

  const isNotAuth = checkAuth && !isLogin;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isNotAuth) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        return renderLayout(props);
      }}
    />
  );
}

export default Routes;
