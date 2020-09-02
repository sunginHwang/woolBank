import React from 'react';
import AccountListContainer from '../../containers/account/list/AccountListContainer';
import { useHistory } from 'react-router';
import IcoCashPlus from '../../components/icon/IcoCashPlus';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';

function AccountList() {
  const history = useHistory();

  const goAccountRegisterPage = () => {
    history.push('/accounts/register');
  };

  const renderAccountAddIcon = (
    <div onClick={goAccountRegisterPage}>
      <IcoCashPlus width={30} height={30} fill={colors.colors.navyD1} />
    </div>
  );

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <PageTemplate title='예금 및 적금' onBackClick={onBackClick} rightHeader={renderAccountAddIcon}>
      <AccountListContainer />
    </PageTemplate>
  );
}

export default AccountList;
