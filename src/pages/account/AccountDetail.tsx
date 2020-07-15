import React from 'react';
import { useHistory, useParams } from 'react-router';
import PageTemplate from '../../components/common/PageTemplate';
import AccountDetailContainer from '../../containers/account/detail/AccountDetailContainer';

function AccountDetail() {
  const history = useHistory();
  const { accountId } = useParams();
  const onBackClick = () => {
    history.goBack();
  };

  return (
    <>
      <PageTemplate title='계좌정보' useNav={false} onBackClick={onBackClick}>
        <AccountDetailContainer accountId={Number(accountId)} />
      </PageTemplate>
    </>
  );
}

export default AccountDetail;
