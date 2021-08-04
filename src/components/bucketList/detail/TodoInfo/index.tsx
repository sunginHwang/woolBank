import React from 'react';
import styled from 'styled-components';

import useBucket from '@/services/bucketList/useBucket';
import useTodoQuerySetter from '@/services/bucketList/useTodoQuerySetter';
import TodoList from '@components/bucketList/todo/TodoList';
import AddTodo from '@components/bucketList/todo/AddTodo';
import SkeletonList from './SkeletonList';

interface IProps {
  bucketId: number;
  onToggleShowCompleteButton: (toggle: boolean) => void;
}

/**
 * 버킷리스트 상세 - 할것 리스트 정보
 * @component
 */

function TodoInfo({ bucketId, onToggleShowCompleteButton }: IProps) {
  const { bucket, isLoading } = useBucket(bucketId);
  const { onAddTodo, onRemoveTodo, onToggleTodoState, addLoading, updateLoading } = useTodoQuerySetter(bucketId);

  if (bucket.id === -1) {
    return null;
  }

  const onTodoInputFocusIn = () => {
    onToggleShowCompleteButton(false);
  };

  const onTodoInputFocusOut = () => {
    onToggleShowCompleteButton(true);
  };

  return (
    <S.BucketTodoInfo>
      <S.TodoTitle>할일목록</S.TodoTitle>
      {isLoading && <SkeletonList />}
      {!isLoading && (
        <TodoList
          isItemUpdateLoading={updateLoading}
          todoList={bucket.todoList}
          isFreeze={bucket.isComplete}
          onRemove={onRemoveTodo}
          onToggleState={onToggleTodoState}
        />
      )}
      {!bucket.isComplete && (
        <AddTodo
          isLoading={addLoading}
          onAdd={onAddTodo}
          onTodoItemFocusIn={onTodoInputFocusIn}
          onTodoItemFocusOut={onTodoInputFocusOut}
        />
      )}
    </S.BucketTodoInfo>
  );
}

export default React.memo(TodoInfo);

const S = {
  BucketTodoInfo: styled.div`
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.white};
  `,
  TodoTitle: styled.p`
    color: ${({ theme }) => theme.colors.blackL1};
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 2rem;
  `
};
