import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import PageTemplate from '../../components/common/PageTemplate';
import AccountDetailContainer from '../../containers/account/detail/AccountDetailContainer';
import AccountDetailModalContainer from '../../containers/account/detail/AccountDetailModalContainer';
import IcoDowHorizontal from '../../components/icon/IcoDotHorizontal';
import colors from '../../style/colors';
import { useQuery } from '../../support/hooks/UseQuery';

function AccountDetail() {
  const history = useHistory();
  const [isActiveModal, setIsActiveModal] = useState(false);
  const { accountId } = useParams();
  const { mode } = useQuery(['mode']);

  const onBackClick = () => {
    history.goBack();
  };

  const editButtonEl = (
    <div onClick={() => setIsActiveModal(true)}>
      <IcoDowHorizontal fill={colors.colors.blackL1} />
    </div>
  );

  return (
    <>
      <PageTemplate
        title='계좌정보'
        useNav={false}
        useSidePadding={false}
        onBackClick={onBackClick}
        rightHeader={editButtonEl}
      >
        <AccountDetailContainer accountId={Number(accountId)} />
        <AccountDetailModalContainer
          accountId={Number(accountId)}
          isActiveModal={isActiveModal}
          useEditPhase={mode === 'edit'}
          onCloseModal={() => setIsActiveModal(false)}
        />
      </PageTemplate>
    </>
  );
}

export default AccountDetail;
