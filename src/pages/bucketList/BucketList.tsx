import React from 'react';
import { useHistory } from 'react-router';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';
import IcoPiggyBank from '../../components/icon/IcoPiggyBank';
import BucketListContainer from '../../containers/bucketList/bucketListContainer';
import BucketListAddContainer from '../../containers/bucketList/bucketListAddContainer';

function BucketList() {
  const history = useHistory();

  const AccountAddIconEl = (
    <div>
      <IcoPiggyBank width={30} height={30} fill={colors.colors.navyD1} />
    </div>
  );

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <PageTemplate
      title='버킷리스트'
      onBackClick={onBackClick}
      rightHeader={AccountAddIconEl}
    >
      <BucketListContainer />
      <BucketListAddContainer />
    </PageTemplate>
  );
}

export default BucketList;
