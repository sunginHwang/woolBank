import React from 'react';
import AccountAddContainer from '../../containers/account/list/AccountAddContainer';
import AccountListContainer from '../../containers/account/list/AccountListContainer';
import { useHistory } from 'react-router';
import IcoCashPlus from '../../components/icon/IcoCashPlus';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';
import { useQuery } from '../../support/hooks/UseQuery';

function AccountList() {
  const history = useHistory();
  const { phase } = useQuery(['phase']);
  const addPhase = phase ? Number(phase) : 0;

  const goNextPhase = () => {
    history.push(`/accounts?phase=${addPhase + 1}`);
  };

  const renderAccountAddIcon = (
    <div onClick={goNextPhase}>
      <IcoCashPlus width={30} height={30} fill={colors.colors.navyD1} />
    </div>
  );

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <PageTemplate title='예금 및 적금' onBackClick={onBackClick} rightHeader={renderAccountAddIcon}>
      <AccountListContainer />
      <AccountAddContainer />
    </PageTemplate>
  );
}

export default AccountList;
