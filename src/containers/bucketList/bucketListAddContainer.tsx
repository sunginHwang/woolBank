import React, { useEffect, useReducer } from 'react';
import BucketListInfoPhase from '../../components/bucketList/Add/BucketListInfoPhase';
import BucketListCategoryPhase from '../../components/bucketList/Add/BucketListCategoryPhase';
import BucketListPicturePhase from '../../components/bucketList/Add/BucketListPicturePhase';
import { useHistory } from 'react-router';
import AccountInfoPhase from '../../components/account/list/addPhase/AccountInfoPhase';
import { IBucketListCategory } from '../../models/bucketList/IBucketListCategory';
import TodoListPhase from '../../components/bucketList/Add/TodoListPhase';

type BucketListAddContainerProps = {
  phase: number;
  goNextPhase: () => void;
  goPrevPhase: () => void;
}

type Action = { type: 'SET_PHASE_ONE', payload : { title: string; description: string}} | { type: 'SET_PHASE_TWO', payload : { completeDate: string; category: IBucketListCategory}};

interface IBucketList {
  title: string;
  description: string;
  completeDate: string;
  category: IBucketListCategory;
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
    case 'SET_PHASE_TWO': {
      return {
        ...state,
        completeDate: action.payload.completeDate,
        category: action.payload.category
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
    description: '',
    completeDate: '',
    category: {
      type: '',
      name: ''
    }
  });

  useEffect(() => {
    /* phase < 1 && setAccount(initialAccountInfo); // 예적금 입력 종료시 초기화 처리 */
  }, [phase]);

  console.log(bucketListForm);

  const onCompletePhaseOne = (title: string, description: string) => {
    dispatch({ type: 'SET_PHASE_ONE', payload: { title, description } });
  };

  const onCompletePhaseTwo = (completeDate: string, category: IBucketListCategory) => {
    dispatch({ type: 'SET_PHASE_TWO', payload: { completeDate, category } });
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
        completeDate={bucketListForm.completeDate}
        category={bucketListForm.category}
        isActivePhase={phase >= 2}
        onCompletePhaseTwo={onCompletePhaseTwo}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <BucketListPicturePhase
        isActivePhase={phase >= 3}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <TodoListPhase
        isActivePhase={phase >= 4}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
    </>
  );
}

export default BucketListAddContainer;
