import React, { useEffect, useReducer } from 'react';
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

type Action = { type: 'SET_PHASE_ONE', payload : { title: string; description: string}};

interface IBucketList {
  title: string;
  description: string;
}

function reducer(state: IBucketList, action: Action): IBucketList {
  switch (action.type) {
    case 'SET_PHASE_ONE': {
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description
      }
    }
    default:
      throw new Error('Unhandled action');
  }
}

function BucketListAddContainer({
  phase,
  goNextPhase,
  goPrevPhase
}: BucketListAddContainerProps) {
/*
  const history = useHistory();
*/
  const [bucketListForm, dispatch] = useReducer(reducer, {
    title: '',
    description: ''
  });

  useEffect(() => {
    /* phase < 1 && setAccount(initialAccountInfo); // 예적금 입력 종료시 초기화 처리 */
  }, [phase]);

  console.log(bucketListForm);

  const onCompletePhaseOne = (title: string, description: string) => {
    dispatch({ type: 'SET_PHASE_ONE', payload: { title, description } });
  };

  return (
    <>
      <BucketListInfoPhase
        title={bucketListForm.title}
        description={bucketListForm.description}
        isActivePhase={phase >= 1}
        onCompletePhaseOne={onCompletePhaseOne}
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
