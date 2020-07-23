import React from 'react';
import { useHistory } from 'react-router';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';
import IcoPiggyBank from '../../components/icon/IcoPiggyBank';
import BucketListItem from '../../components/bucketList/BucketList/BucketListItem';
import MainCardArea from '../../components/main/MainCardArea';
import { IBucketList } from '../../models/IBucketList';
import BucketListContainer from '../../containers/bucketList/bucketListContainer';

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
    </PageTemplate>
  );
}

export default BucketList;
