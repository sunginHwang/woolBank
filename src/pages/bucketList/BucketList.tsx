import React from 'react';
import { useHistory } from 'react-router';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';
import IcoPiggyBank from '../../components/icon/IcoPiggyBank';
import BucketListContainer from '../../containers/bucketList/bucketListContainer';

function BucketList() {
  const history = useHistory();

  const goSaveBucketListPage = () => {
    history.push('bucket-list/save');
  };

  const onBackClick = () => {
    history.goBack();
  };

  const AccountAddIconEl = (
    <div onClick={goSaveBucketListPage}>
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
    </PageTemplate>
  );
}

export default BucketList;
