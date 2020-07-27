import React, { useEffect } from 'react';
import BucketListInfoPhase from '../../components/bucketList/Add/BucketListInfoPhase';
import BucketListCategoryPhase from '../../components/bucketList/Add/BucketListCategoryPhase';
import BucketListPicturePhase from '../../components/bucketList/Add/BucketListPicturePhase';
import { useHistory } from 'react-router';
import AccountInfoPhase from '../../components/account/list/addPhase/AccountInfoPhase';

type BucketListAddContainerProps = {
  phase: number;
  goNextPhase: () => void;
  goPrevPhase: () => void;
}

function BucketListAddContainer({
  phase,
  goNextPhase,
  goPrevPhase
}: BucketListAddContainerProps) {
/*
  const history = useHistory();
*/

  useEffect(() => {
    /* phase < 1 && setAccount(initialAccountInfo); // 예적금 입력 종료시 초기화 처리 */
  }, [phase])

  return (
    <>
      <BucketListInfoPhase
        isActivePhase={phase >= 1}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />

      <BucketListCategoryPhase
        isActivePhase={phase >= 2}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />

      <BucketListPicturePhase
        isActivePhase={phase >= 3}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
    </>
  );
}

export default BucketListAddContainer;
