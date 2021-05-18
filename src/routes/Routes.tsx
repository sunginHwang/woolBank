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
const AccountList = loadable(() => import('@pages/account/AccountList'), {
  fallback: <PageTemplate useHeader={false} topPadding={8.8} useSidePadding={false} />
});
const AccountDetail = loadable(() => import('@pages/account/AccountDetail'), {
  fallback: <PageTemplate title='계좌정보' useSidePadding={false} />
});
const AccountRegister = loadable(() => import('@pages/account/AccountRegister'), defaultFallback);
const BucketList = loadable(() => import('@pages/bucketList/BucketList'), defaultFallback);
const BucketListDetail = loadable(() => import('@pages/bucketList/BucketListDetail'), defaultFallback);
const BucketListSave = loadable(() => import('@pages/bucketList/BucketListSave'), defaultFallback);
const Login = loadable(() => import('@pages/user/login'), defaultFallback);
const Menu = loadable(() => import('@pages/Menu'), {
  fallback: <PageTemplate useHeader useBackButton={false} title='나의 뱅킷리스트' />
});
const RegularExpenditureList = loadable(() => import('@pages/regularExpenditure/RegularExpenditureListPage'), {
  fallback: <PageTemplate useHeader useBackButton={false} title='정기지출' />
});
const SaveRegularExpenditurePage = loadable(() => import('@pages/regularExpenditure/SaveRegularExpenditurePage'), {
  fallback: <PageTemplate title='정기지출 등록' />
});


// 가계부
// 리스트
const AccountBookList = loadable(() => import('@pages/accountBook'), {
  fallback: <PageTemplate title='가계부' />
});
// 등록
const SaveAccountBookPage = loadable(() => import('@pages/accountBook/SaveAccountBook'), {
  fallback: <PageTemplate title='가계부 등록' />
});

function Routes() {
  const user = useSelector((state: RootState) => state.Auth.user);
  const isLogin = user.id > 0;

  return (
    <ScrollToTop>
      <Switch>
        <RouteWrapper path='/' component={Main} exact isLogin={isLogin} />
        <RouteWrapper path='/mypage' component={Menu} exact isLogin={isLogin} />
        <RouteWrapper path='/login' component={Login} exact useNavBar={false} checkAuth={false} />
        {/* 예적금 페이지 */}
        <RouteWrapper path='/accounts' component={AccountList} exact isLogin={isLogin} />
        <RouteWrapper path='/accounts/save' component={AccountRegister} exact isLogin={isLogin} />
        <RouteWrapper path='/accounts/:accountId' component={AccountDetail} useNavBar={false} isLogin={isLogin} />
        {/* 버킷리스트 페이지 */}
        <RouteWrapper path='/bucket-list' component={BucketList} exact isLogin={isLogin} />
        <RouteWrapper path='/bucket-list/save' component={BucketListSave} exact isLogin={isLogin} />
        <RouteWrapper
          path='/bucket-list/:bucketListId'
          component={BucketListDetail}
          useNavBar={false}
          isLogin={isLogin}
        />
        {/* 정기지출 페이지 */}
        <RouteWrapper path='/regular-expenditure' component={RegularExpenditureList} exact isLogin={isLogin} />
        <RouteWrapper
          path='/regular-expenditure/save'
          component={SaveRegularExpenditurePage}
          exact
          useNavBar={false}
          isLogin={isLogin}
        />
        {/* 가계부 페이지 */}
        <RouteWrapper path='/account-books' component={AccountBookList} isLogin={isLogin} />
        <RouteWrapper path='/account-book/save' component={SaveAccountBookPage} exact useNavBar={false} isLogin={isLogin} />
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
