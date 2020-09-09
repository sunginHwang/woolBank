import React from 'react';
import AccountListContainer from '../../containers/account/list/AccountListContainer';
import { useHistory } from 'react-router';
import IcoCashPlus from '../../components/icon/IcoCashPlus';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';

function AccountList() {
  const history = useHistory();

  /**
   * 예적금 등록 페이지 이동
   **/
  const goAccountRegisterPage = () => {
    history.push('/accounts/register');
  };

  /**
   * 등록페이지 이동
   **/
  const onBackClick = () => {
    history.goBack();
  };

  const renderAccountAddIcon = (
    <div onClick={goAccountRegisterPage}>
      <IcoCashPlus width={30} height={30} fill={colors.colors.navyD1} />
    </div>
  );

  return (
    <PageTemplate title='예금 및 적금' onBackClick={onBackClick} rightHeader={renderAccountAddIcon}>
      <AccountListContainer />
    </PageTemplate>
  );
}

export default AccountList;
