import React from 'react';
import { useHistory } from 'react-router';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';
import IcoPiggyBank from '../../components/icon/IcoPiggyBank';
import BucketListContainer from '../../containers/bucketList/bucketListContainer';
import BucketListAddContainer from '../../containers/bucketList/bucketListAddContainer';
import { useQuery } from '../../support/hooks/UseQuery';

function BucketList() {
  const history = useHistory();
  const { phase } = useQuery(['phase']);

  const addPhase = phase ? Number(phase) : 0;

  const goNextPhase = () => {
    console.log('11')
    history.push(`/bucket-list?phase=${addPhase + 1}`);
  };

  const onBackClick = () => {
    history.goBack();
  };

  const AccountAddIconEl = (
    <div onClick={goNextPhase}>
      <IcoPiggyBank width={30} height={30} fill={colors.colors.navyD1} />
    </div>
  );

  return (
    <PageTemplate
      title='버킷리스트'
      onBackClick={onBackClick}
      rightHeader={AccountAddIconEl}
    >
      <BucketListContainer />
      <BucketListAddContainer
        phase={addPhase}
        goPrevPhase={onBackClick}
        goNextPhase={goNextPhase}
      />
    </PageTemplate>
  );
}

export default BucketList;
