import React, { useRef } from 'react';
import styled from 'styled-components';

import TodoInput from '@components/bucketList/todo/TodoInput';
import TodoAddButton from '@components/bucketList/todo/TodoAddButton';
import { useToggle } from '@support/hooks/useToggle';
import { ITodo } from '@models/bucketList/ITodo';

interface IProps {
  onAdd: (todo: ITodo) => void;
  isLoading: boolean;
  onTodoItemFocusIn?: () => void;
  onTodoItemFocusOut?: () => void;
}
/**
 * 버킷리스트 상세 - 할일 추가
 * @component
 */

function AddTodo(props: IProps) {
  const {
    isLoading,
    onAdd,
    onTodoItemFocusIn = () => {},
    onTodoItemFocusOut = () => {}
  } = props;
  const [showAddInput, onAddInput, offAddInput] = useToggle(false);
  const addRef = useRef<HTMLDivElement>(null);

  // 할일 아이템 추가
  const onAddTodo = (title: string) => {
    onAdd({
      id: -999, // 포맷맞추기용 id
      title: title,
      isComplete: false
    });
    offAddInput();
    // 추가 후 스크롤 최하단 이동 (입력 편리 ux)
    addRef.current && addRef.current.scrollIntoView();
  };

  return (
    <S.TodoAdd ref={addRef}>
      {showAddInput ? (
        <TodoInput
          onAdd={onAddTodo}
          onClose={offAddInput}
          onFocusIn={onTodoItemFocusIn}
          onFocusOut={onTodoItemFocusOut}
        />
      ) : (
        <TodoAddButton loading={isLoading} onClick={onAddInput} />
      )}
    </S.TodoAdd>
  )
}

export default AddTodo;

const S = {
  TodoAdd: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20rem;
  `
};
