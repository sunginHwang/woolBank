import React, { useEffect, useReducer } from 'react';
import BucketListInfoPhase from '../../components/bucketList/Add/BucketListInfoPhase';
import BucketListCompleteDatePhase from '../../components/bucketList/Add/BucketListCompleteDatePhase';
import BucketListPicturePhase from '../../components/bucketList/Add/BucketListPicturePhase';
import { useHistory } from 'react-router';
import TodoListPhase from '../../components/bucketList/Add/TodoListPhase';
import { ITodo } from '../../models/ITodo';

type BucketListAddContainerProps = {
  phase: number;
  goNextPhase: () => void;
  goPrevPhase: () => void;
}

type Action =
  { type: 'SET_PHASE_ONE', payload : { title: string; description: string}} |
  { type: 'SET_PHASE_TWO', payload : { completeDate: string }} |
  { type: 'SET_PHASE_THREE', payload : { mainImgFile: File}} |
  { type: 'SET_LAST_PHASE', payload : { todoList: ITodo[]}} |
  { type: 'TOGGLE_LOADING', payload: boolean };

interface IBucketList {
  title: string;
  description: string;
  completeDate: string;
  todoList: ITodo[];
}

interface IBucketListAddForm extends IBucketList {
  mainImgFile: File | null;
  loading: boolean;
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
        completeDate: action.payload.completeDate
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
    case 'TOGGLE_LOADING': {
      return {
        ...state,
        loading: action.payload
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
    mainImgFile: null,
    todoList: [],
    loading: false
  });

  useEffect(() => {
    /* phase < 1 && setAccount(initialAccountInfo); // 예적금 입력 종료시 초기화 처리 */
  }, [phase]);

  const onCompletePhaseOne = (title: string, description: string) => {
    dispatch({ type: 'SET_PHASE_ONE', payload: { title, description } });
  };

  const onCompletePhaseTwo = (completeDate: string) => {
    dispatch({ type: 'SET_PHASE_TWO', payload: { completeDate } });
  };

  const onCompletePhaseThree = (mainImgFile: File) => {
    dispatch({ type: 'SET_PHASE_THREE', payload: { mainImgFile } });
  };

  const onCompleteLastPhase = (todoList: any) => {
    dispatch({ type: 'SET_LAST_PHASE', payload: { todoList } });
    onAddBucketList();
  };

  /**
   * 버킷리스트 추가
   */
  const onAddBucketList = () => {
    // someThing 입력 작업
    dispatch({ type: 'TOGGLE_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'TOGGLE_LOADING', payload: false });
    }, 2000);
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
      <BucketListCompleteDatePhase
        isActivePhase={phase >= 2}
        completeDate={bucketListForm.completeDate}
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
        loading={bucketListForm.loading}
        onCompleteLastPhase={onCompleteLastPhase}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
    </>
  );
}

export default BucketListAddContainer;
