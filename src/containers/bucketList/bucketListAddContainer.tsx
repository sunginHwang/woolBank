import React, { useEffect, useReducer } from 'react';
import BucketListInfoPhase from '../../components/bucketList/Add/BucketListInfoPhase';
import BucketListCategoryPhase from '../../components/bucketList/Add/BucketListCategoryPhase';
import BucketListPicturePhase from '../../components/bucketList/Add/BucketListPicturePhase';
import { useHistory } from 'react-router';
import { IBucketListCategory } from '../../models/bucketList/IBucketListCategory';
import TodoListPhase from '../../components/bucketList/Add/TodoListPhase';

type BucketListAddContainerProps = {
  phase: number;
  goNextPhase: () => void;
  goPrevPhase: () => void;
}

type Action =
  { type: 'SET_PHASE_ONE', payload : { title: string; description: string}} |
  { type: 'SET_PHASE_TWO', payload : { completeDate: string; category: IBucketListCategory}} |
  { type: 'SET_PHASE_THREE', payload : { mainImgFile: File}} |
  { type: 'SET_LAST_PHASE', payload : { todoList: any}};

interface IBucketList {
  title: string;
  description: string;
  completeDate: string;
  category: IBucketListCategory;
  todoList: any;
}

interface IBucketListAddForm extends IBucketList {
  mainImgFile: File | null;
}

function reducer(state: IBucketListAddForm, action: Action): IBucketListAddForm {
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
    case 'SET_PHASE_THREE': {
      return {
        ...state,
        mainImgFile: action.payload.mainImgFile
      }
    }
    case 'SET_LAST_PHASE': {
      return {
        ...state,
        todoList: action.payload.todoList
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
    },
    mainImgFile: null,
    todoList: []
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

  const onCompletePhaseThree = (mainImgFile: File) => {
    dispatch({ type: 'SET_PHASE_THREE', payload: { mainImgFile } });
  };

  const onCompleteLastPhase = (todoList: any) => {
    dispatch({ type: 'SET_LAST_PHASE', payload: { todoList } });
    onAddBucketList();
  };

  const onAddBucketList = () => {
    // someThing 입력 작업
  };

  return (
    <>
      <BucketListInfoPhase
        isActivePhase={phase >= 1}
        title={bucketListForm.title}
        description={bucketListForm.description}
        onCompletePhaseOne={onCompletePhaseOne}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />

      <BucketListCategoryPhase
        isActivePhase={phase >= 2}
        completeDate={bucketListForm.completeDate}
        bucketListCategory={bucketListForm.category}
        onCompletePhaseTwo={onCompletePhaseTwo}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <BucketListPicturePhase
        mainImgFile={bucketListForm.mainImgFile}
        onCompletePhaseThree={onCompletePhaseThree}
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
