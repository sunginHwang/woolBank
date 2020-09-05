import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router';
import BucketListInfoPhase from '../../components/bucketList/Add/BucketListInfoPhase';
import BucketListCompleteDatePhase from '../../components/bucketList/Add/BucketListCompleteDatePhase';
import BucketListPicturePhase from '../../components/bucketList/Add/BucketListPicturePhase';
import TodoListPhase from '../../components/bucketList/Add/TodoListPhase';
import { ITodo } from '../../models/ITodo';
import useRequest from '../../support/hooks/useRequest';
import { IBucketListForm } from '../../models/bucketList/IBucketListForm';
import { saveImageAndGetImageUrl } from '../../support/api/imageApi';
import { saveBucketList } from '../../support/api/bucketListApi';

type BucketListAddContainerProps = {
  bucketListId?: number;
};

type Action =
  | { type: 'SET_PHASE_ONE'; payload: { title: string; description: string } }
  | { type: 'SET_PHASE_TWO'; payload: { completeDate: string } }
  | { type: 'SET_PHASE_THREE'; payload: { mainImgFile: File } }
  | { type: 'SET_TODO_LIST'; payload: { todoList: ITodo[] } }
  | { type: 'TOGGLE_LOADING'; payload: boolean };

function reducer(state: IBucketListForm, action: Action): IBucketListForm {
  switch (action.type) {
    case 'SET_PHASE_ONE': {
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description
      };
    }
    case 'SET_PHASE_TWO': {
      return {
        ...state,
        completeDate: action.payload.completeDate
      };
    }
    case 'SET_PHASE_THREE': {
      return {
        ...state,
        mainImgFile: action.payload.mainImgFile
      };
    }
    case 'SET_TODO_LIST': {
      return {
        ...state,
        todoList: action.payload.todoList
      };
    }
    default:
      throw new Error('Unhandled action');
  }
}

const saveBucketListForm: IBucketListForm = {
  title: '',
  description: '',
  completeDate: '',
  mainImgFile: null,
  todoList: []
};

function BucketListAddContainer({ bucketListId }: BucketListAddContainerProps) {
  const maxPhase = bucketListId ? 3 : 4;

  const [phase, setPhase] = useState(1);
  const history = useHistory();
  const [bucketListForm, dispatch] = useReducer(reducer, saveBucketListForm);

  const [onSaveRequest, saveLoading, saveError] = useRequest(saveBucketList);

  useEffect(() => {
    saveError && alert(saveError);
  }, [saveError]);

  const goNextPhase = () => {
    if (phase < maxPhase) {
      setPhase((phase) => phase + 1);
    }
  };

  const goPrevPhase = () => {
    if (phase > 1) {
      setPhase((phase) => phase - 1);
    }
  };

  const onCompletePhaseOne = (title: string, description: string) => {
    dispatch({ type: 'SET_PHASE_ONE', payload: { title, description } });
  };

  const onCompletePhaseTwo = (completeDate: string) => {
    dispatch({ type: 'SET_PHASE_TWO', payload: { completeDate } });
  };

  const onCompletePhaseThree = (mainImgFile: File) => {
    dispatch({ type: 'SET_PHASE_THREE', payload: { mainImgFile } });
  };

  const onChangeTodoList = (todoList: any) => {
    dispatch({ type: 'SET_TODO_LIST', payload: { todoList } });
  };

  /**
   * 버킷리스트 추가
   */
  const onAddBucketList = async () => {
    if (bucketListForm.mainImgFile) {
      const uploadImage = await saveImageAndGetImageUrl(bucketListForm.mainImgFile);

      if (!uploadImage) {
        alert('이미지 업로드에 실패하였습니다. 다시 시도해 주세요.');
        return;
      }

      bucketListForm.thumbImageUrl = uploadImage.thumbImageUrl;
      bucketListForm.imageUrl = uploadImage.imageUrl;
    }

    let savedBucketListId = 0;

    await onSaveRequest({
      params: bucketListForm,
      callbackFunc: (res: any) => {
        savedBucketListId = res.data.bucketListId;
      }
    });

    if (savedBucketListId > 0) {
      history.push(`/bucket-list/${savedBucketListId}`);
    }
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
        loading={saveLoading}
        todoList={bucketListForm.todoList}
        onChangeTodoList={onChangeTodoList}
        onAddBucketList={onAddBucketList}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
    </>
  );
}

export default BucketListAddContainer;
