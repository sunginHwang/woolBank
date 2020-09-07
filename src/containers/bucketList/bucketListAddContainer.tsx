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
import { saveBucketList, updateBucketList } from '../../support/api/bucketListApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNotification } from '../../support/hooks/useNotification';

type BucketListAddContainerProps = {
  bucketListId?: number;
};

type Action =
  | { type: 'SET_PHASE_ONE'; payload: { title: string; description: string } }
  | { type: 'SET_PHASE_TWO'; payload: { completeDate: string } }
  | { type: 'SET_IMG_FILE'; payload: { mainImgFile: File | null } }
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
    case 'SET_IMG_FILE': {
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

type SaveModeType = 'insert' | 'update';

function BucketListAddContainer({ bucketListId }: BucketListAddContainerProps) {
  const saveMode: SaveModeType = bucketListId ? 'update' : 'insert';
  const isUpdateMode = saveMode === 'update';
  // 업데이트의 경우 todoList 입력 페이즈는 비노출
  const maxPhase = isUpdateMode ? 3 : 4;
  const [phase, setPhase] = useState(1);
  const history = useHistory();
  const bucketListDetailDetailCache = useSelector((state: RootState) => state.BucketList.bucketListDetailCache);

  const getUpdateBucketListForm = (bucketListId: number): IBucketListForm => {
    const bucketListDetail = bucketListDetailDetailCache.find((bucketList) => bucketList.id === bucketListId);

    if (bucketListDetail) {
      return {
        id: bucketListDetail.id,
        title: bucketListDetail.title,
        description: bucketListDetail.description,
        completeDate: bucketListDetail.completeDate,
        thumbImageUrl: bucketListDetail.thumbImageUrl,
        imageUrl: bucketListDetail.imageUrl,
        mainImgFile: null,
        todoList: []
      };
    }

    return saveBucketListForm;
  };

  const initBucketListFormData = bucketListId ? getUpdateBucketListForm(bucketListId) : saveBucketListForm;

  const [bucketListForm, dispatch] = useReducer(reducer, initBucketListFormData);
  const [onSaveRequest, saveLoading, saveError] = useRequest(saveBucketList);
  const [onUpdateRequest, updateLoading, updateError] = useRequest(updateBucketList);
  const [onShowNotification] = useNotification();

  useEffect(() => {
    saveError && alert(saveError);
    updateError && alert(updateError);
  }, [saveError, updateError]);

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

  const onChangeTodoList = (todoList: any) => {
    dispatch({ type: 'SET_TODO_LIST', payload: { todoList } });
  };

  const setImageFile = (mainImgFile: File | null) => {
    dispatch({ type: 'SET_IMG_FILE', payload: { mainImgFile } });
  };

  /**
   * 버킷리스트 추가 or 수정
   */
  const onUpsertBucketList = async () => {
    const formData = Object.assign({}, bucketListForm);

    if (formData.mainImgFile) {
      const uploadImage = await saveImageAndGetImageUrl(formData.mainImgFile);

      if (!uploadImage) {
        alert('이미지 업로드에 실패하였습니다. 다시 시도해 주세요.');
        return;
      }

      formData.thumbImageUrl = uploadImage.thumbImageUrl;
      formData.imageUrl = uploadImage.imageUrl;
    }

    let upsertBucketListId = 0;

    if (isUpdateMode) {
      await onUpdateRequest({
        params: formData,
        callbackFunc: (res: any) => {
          upsertBucketListId = res.data.bucketListId;
        }
      });

      if (upsertBucketListId === bucketListForm.id) {
        history.goBack();
        onShowNotification('수정 되었습니다.');
      }
    } else {
      await onSaveRequest({
        params: formData,
        callbackFunc: (res: any) => {
          upsertBucketListId = res.data.bucketListId;
        }
      });

      if (upsertBucketListId > 0) {
        onShowNotification('생성 되었습니다.');
        history.push(`/bucket-list/${upsertBucketListId}`);
      }
    }
  };

  // 업데이트 해야 하는데 업데이트 대상 ID가 다르면 이전페이지 이동
  if (bucketListId && bucketListId !== bucketListForm.id) {
    alert('잘못된 접근 입니다.');
    history.goBack();
    return null;
  }

  return (
    <>
      <BucketListInfoPhase
        maxPhase={maxPhase}
        isActivePhase={phase >= 1}
        title={bucketListForm.title}
        description={bucketListForm.description}
        onCompletePhaseOne={onCompletePhaseOne}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <BucketListCompleteDatePhase
        maxPhase={maxPhase}
        isActivePhase={phase >= 2}
        completeDate={bucketListForm.completeDate}
        onCompletePhaseTwo={onCompletePhaseTwo}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <BucketListPicturePhase
        isActivePhase={phase >= 3}
        isLastPhase={isUpdateMode}
        maxPhase={maxPhase}
        updateLoading={updateLoading}
        mainImage={bucketListForm.imageUrl}
        setImageFile={setImageFile}
        onUpdateBucketList={onUpsertBucketList}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
      <TodoListPhase
        maxPhase={maxPhase}
        isActivePhase={phase >= 4}
        loading={saveLoading}
        todoList={bucketListForm.todoList}
        onChangeTodoList={onChangeTodoList}
        onAddBucketList={onUpsertBucketList}
        goPrevPhase={goPrevPhase}
        goNextPhase={goNextPhase}
      />
    </>
  );
}

export default BucketListAddContainer;
