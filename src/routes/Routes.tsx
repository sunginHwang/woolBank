import React from 'react';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, RouteProps, Switch } from 'react-router';
import { RootState } from '@/store';

import accounts from '@routes/account';
import bucketlist from '@routes/bucketlist';
import accountBook from '@routes/accountBook';
import userRoutes from '@routes/user';

import PageNotFound from '@pages/error/PageNotFound';
import LayoutContainer from '@containers/LayoutContainer';
import MainPageSkeleton from '@components/main/MainPageSkeleton';
import PageTemplate from '@components/layout/PageTemplate';
import ScrollToTop from '@routes/ScrollToTop';


const defaultRoutes: LayoutRouteProps[] = [{
  path: '/',
  key: 'mainPage',
  component: loadable(() => import('@pages/Main'), { fallback: <MainPageSkeleton /> }),
  exact: true,
},{
  path: '/regular-expenditure',
  key: 'regular-expenditure',
  component: loadable(() => import('@pages/regularExpenditure/RegularExpenditureListPage'), {
    fallback: <PageTemplate useHeader useBackButton={false} title='정기지출' />
  }),
  exact: true,
}];

function Routes() {
  const user = useSelector((state: RootState) => state.Auth.user);
  const isLogin = user.id > 0;

  const routes = [...defaultRoutes, ...accounts, ...bucketlist, ...accountBook, ...userRoutes];

  return (
    <ScrollToTop>
      <Switch>
        { routes.map((route, index) => <RouteWrapper {...route} key={route.key} isLogin={isLogin} />)}
        <Route component={PageNotFound} />
      </Switch>
    </ScrollToTop>
  );
}

export interface LayoutRouteProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  key: string;
  useNavBar?: boolean;
  isLogin?: boolean;
  checkAuth?: boolean;
}

export function RouteWrapper({
  component: Component,
  useNavBar,
  isLogin = false,
  checkAuth = true,
  ...rest
}: LayoutRouteProps) {
  const renderLayout = (props: any) => (
    <LayoutContainer key={rest.key} useNavBar={useNavBar}>{Component && <Component {...props} {...rest} />}</LayoutContainer>
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
