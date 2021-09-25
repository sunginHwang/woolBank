import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router';

import BucketListInfoPhase from '@components/bucketList/add/BucketListInfoPhase';
import BucketListCompleteDatePhase from '@components/bucketList/add/BucketListCompleteDatePhase';
import BucketListPicturePhase from '@components/bucketList/add/BucketListPicturePhase';
import TodoListPhase from '@components/bucketList/add/TodoListPhase';

import { useToast } from '@support/hooks/useToast';
import { useAlert } from '@support/hooks/useAlert';
import useRequest from '@support/hooks/useRequest';
import { saveBucketList, updateBucketList } from '@support/api/bucketListApi';
import { ITodo } from '@models/bucketList/ITodo';
import { IBucketListForm } from '@models/bucketList/IBucketListForm';
import { parseDate } from '@support/util/date';
import useBucket from '@/services/bucketList/useBucket';

export interface BucketListAddContainerProps {
  bucketListId?: number;
}

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

// todo 버킷 수정 후 데이터 연동 처리 필요
function BucketListAddContainer({ bucketListId = -1 }: BucketListAddContainerProps) {
  console.log(bucketListId);
  const saveMode: SaveModeType = bucketListId ? 'update' : 'insert';
  const isUpdateMode = saveMode === 'update';
  // 업데이트의 경우 todoList 입력 페이즈는 비노출
  const maxPhase = isUpdateMode ? 3 : 4;
  const [phase, setPhase] = useState(1);

  const history = useHistory();
  const [onSaveRequest, saveLoading] = useRequest(saveBucketList);
  const [onUpdateRequest, updateLoading] = useRequest(updateBucketList);
  const onToast = useToast();
  const [onAlert] = useAlert();
  const { bucket } = useBucket(bucketListId);
  /**
   * 버킷리스트 수정 정보 조회
   **/
  const getUpdateBucketListForm = (bucketListId: number): IBucketListForm => {
    if (bucket.id !== -1) {
      return {
        id: bucket.id,
        title: bucket.title,
        description: bucket.description,
        completeDate: parseDate(bucket.completeDate),
        thumbImageUrl: bucket.thumbImageUrl,
        imageUrl: bucket.imageUrl,
        mainImgFile: null,
        todoList: []
      };
    }

    return saveBucketListForm;
  };
  const initBucketListFormData = bucketListId ? getUpdateBucketListForm(bucketListId) : saveBucketListForm;
  const [bucketListForm, dispatch] = useReducer(reducer, initBucketListFormData);

  /**
   * 다음단계 이동
   **/
  const goNextPhase = () => {
    if (phase < maxPhase) {
      setPhase((phase) => phase + 1);
    }
  };

  /**
   * 이전단계 이동
   **/
  const goPrevPhase = () => {
    if (phase > 1) {
      setPhase((phase) => phase - 1);
    } else {
      // 맨처음 단계에서 뒤로가기는 버킷리스트 페이지 이동
      history.push('/bucket-list');
    }
  };

  /**
   * 일단계 (제목, 내용) 작성
   **/
  const onCompletePhaseOne = (title: string, description: string) => {
    dispatch({ type: 'SET_PHASE_ONE', payload: { title, description } });
  };

  /**
   * 이단계 (목표일) 작성
   **/
  const onCompletePhaseTwo = (completeDate: string) => {
    dispatch({ type: 'SET_PHASE_TWO', payload: { completeDate } });
  };

  /**
   * Index 작성
   **/
  const onChangeTodoList = (todoList: any) => {
    dispatch({ type: 'SET_TODO_LIST', payload: { todoList } });
  };

  /**
   * 삼단계 (이미지 파일) 등록
   **/
  const setImageFile = (mainImgFile: File | null) => {
    dispatch({ type: 'SET_IMG_FILE', payload: { mainImgFile } });
  };

  /**
   * 버킷리스트 추가 or 수정
   */
  const onUpsertBucketList = async () => {
    const formData = Object.assign({}, bucketListForm);

    let upsertBucketListId = 0;

    if (isUpdateMode) {
      await onUpdateRequest({
        params: formData,
        onSuccess: (res: any) => {
          upsertBucketListId = res.data.bucketListId;
        },
        onError: () => {
          onToast('버킷리스트 수정을 실패하였습니다. 다시 시도해주세요.');
        }
      });

      if (upsertBucketListId === bucketListForm.id) {
        history.goBack();
        onToast('수정 되었습니다.');
      }
    } else {
      await onSaveRequest({
        params: formData,
        onSuccess: (res: any) => {
          upsertBucketListId = res.data.bucketListId;
        },
        onError: () => {
          onToast('버킷리스트 생성에 실패하였습니다. 다시 시도해주세요.');
        }
      });

      if (upsertBucketListId > 0) {
        onToast('생성 되었습니다.');
        history.push(`/bucket-list/${upsertBucketListId}`);
      }
    }
  };

  // 업데이트 해야 하는데 업데이트 대상 ID가 다르면 이전페이지 이동
  if (bucketListId && bucketListId !== bucketListForm.id) {
    onAlert('잘못된 접근 입니다.');
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
