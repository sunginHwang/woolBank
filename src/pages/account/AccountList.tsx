import React, { useState } from 'react';
import AccountAddContainer from '../../containers/account/AccountAddContainer';
import AccountListContainer from '../../containers/account/AccountListContainer';
import { useHistory } from 'react-router';
import IcoCashPlus from '../../components/icon/IcoCashPlus';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';

function AccountList() {
  const history = useHistory();
  const [phase, setPhase] = useState(0);
  const AccountAddIconEl = (
    <div onClick={() => setPhase(1)}>
      <IcoCashPlus width={30} height={30} fill={colors.colors.navyD1} />
    </div>
  );

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <>
      <PageTemplate
        title='예금 및 적금'
        onBackClick={onBackClick}
        rightHeader={AccountAddIconEl}
      >
        <AccountListContainer />
        {phase >= 1 && (
          <AccountAddContainer phase={phase} onChangePhase={setPhase} />
        )}
      </PageTemplate>
    </>
  );
}

export default AccountList;
