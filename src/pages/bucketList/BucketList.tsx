import React from 'react';
import { useHistory } from 'react-router';
import colors from '../../style/colors';
import PageTemplate from '../../components/common/PageTemplate';
import IcoPiggyBank from '../../components/icon/IcoPiggyBank';
import BucketListContainer from '../../containers/bucketList/list/bucketListContainer';

function BucketList() {
  const history = useHistory();

  /**
   * 버킷리스트 등록 페이지 이동
   **/
  const goSaveBucketListPage = () => {
    history.push('/bucket-list/save');
  };

  /**
   * 뒤로가기 이동
   **/
  const onBackClick = () => {
    history.goBack();
  };

  const renderAccountAddIcon = (
    <div onClick={goSaveBucketListPage}>
      <IcoPiggyBank width={30} height={30} fill={colors.colors.navyD1} />
    </div>
  );

  return (
    <PageTemplate title='버킷리스트' onBackClick={onBackClick} rightHeader={renderAccountAddIcon}>
      <BucketListContainer />
    </PageTemplate>
  );
}

export default BucketList;
