import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

import IcoCircleCheck from '@components/atoms/icon/IcoCircleCheck';
import IcoTrashCan from '@components/atoms/icon/IcoTrashCan';
import IcoBlackCircle from '@components/atoms/icon/IcoBlackCircle';

import palette from '@style/palette';
import { ITodo } from '@models/bucketList/ITodo';

interface IProps {
  todo: ITodo;
  isLoading?: boolean;
  isFreeze?: boolean;
  onToggleState: (id: ITodo) => void;
  onRemove: (id: number) => void;
}

/**
 * 할일 리스트 아이템 요소
 * @component
 */

function TodoListItem(props: IProps) {
  const { todo, isLoading = false, isFreeze = false, onToggleState, onRemove } = props;

  const onToggleStateClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (isLoading || isFreeze) {
        return;
      }

      onToggleState(todo);
    },
    [todo, onToggleState, isLoading, isFreeze]
  );

  const onRemoveClick = useCallback(() => {
    onRemove(todo.id);
  }, [todo, onRemove]);

  const renderIsCompleteIcon = todo.isComplete ? (
    <IcoCircleCheck fill={palette.mainColor} />
  ) : (
    <IcoBlackCircle fill={palette.mainColor} />
  );

  const showRemoveBtn = !isLoading && !isFreeze;

  return (
    <S.TodoListItem data-cy='todoListItem'>
      <div>
        <i onClick={onToggleStateClick}>
          {isLoading ? <ClipLoader color={palette.mainColor} size={16} /> : renderIsCompleteIcon}
        </i>
        <S.ListTitle isComplete={todo.isComplete}>{todo.title}</S.ListTitle>
      </div>
      {showRemoveBtn && (
        <div onClick={onRemoveClick}>
          <IcoTrashCan fill={palette.greyD2} />
        </div>
      )}
    </S.TodoListItem>
  );
}

export default TodoListItem;

const S = {
  TodoListItem: styled.li`
    display: flex;
    padding: 1.5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.8rem;
    box-shadow: rgb(220, 220, 233) 0.1rem 0.4rem 1.7rem 0.3rem;
    margin-bottom: 2rem;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    i {
      height: 2.4rem;
    }
  `,
  ListTitle: styled.div<{ isComplete: boolean }>`
    font-size: 1.4rem;
    margin-top: 0.1rem;
    line-height: 1.2rem;
    text-decoration: ${({ isComplete }) => (isComplete ? 'line-through' : 'none')};
    color: ${({ isComplete, theme }) => (isComplete ? theme.colors.greyL1 : theme.colors.blackL1)};
    font-weight: 500;
    margin-left: 1rem;
  `
};
