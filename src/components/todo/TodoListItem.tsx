import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ITodo } from '../../models/ITodo';
import IcoCircleCheck from '../icon/IcoCircleCheck';
import colors from '../../style/colors';
import IcoTrashCan from '../icon/IcoTrashCan';
import IcoBlackCircle from '../icon/IcoBlackCircle';
import { ClipLoader } from 'react-spinners';

interface TodoListItemProps {
  todo: ITodo;
  isLoading?: boolean;
  onToggleState: (id: ITodo) => void;
  onRemove: (id: number) => void;
}

function TodoListItem({ todo, isLoading = false, onToggleState, onRemove }: TodoListItemProps) {
  /**
   * todo 완료 상태 토글
   */
  const onToggleStateClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      !isLoading && onToggleState(todo);
    },
    [todo, onToggleState, isLoading]
  );

  /**
   * todo 삭제
   */
  const onRemoveClick = useCallback(() => {
    onRemove(todo.id);
  }, [todo, onRemove]);

  const renderIsCompleteIcon = todo.isComplete ? (
    <IcoCircleCheck fill={colors.colors.mainColor} />
  ) : (
    <IcoBlackCircle fill={colors.colors.mainColor} />
  );

  return (
    <S.TodoListItem>
      <div>
        <i onClick={onToggleStateClick}>
          {isLoading ? <ClipLoader color={colors.colors.mainColor} size={16} /> : renderIsCompleteIcon}
        </i>
        <S.ListTitle isComplete={todo.isComplete}>{todo.title}</S.ListTitle>
      </div>
      {!isLoading && (
        <div onClick={onRemoveClick}>
          <IcoTrashCan fill={colors.colors.greyD2} />
        </div>
      )}
    </S.TodoListItem>
  );
}

const S: {
  TodoListItem: any;
  ListTitle: any;
} = {
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
  ListTitle: styled.div`
    font-size: 1.4rem;
    margin-top: 0.1rem;
    line-height: 1.2rem;
    text-decoration: ${(props: any) => (props.isComplete ? 'line-through' : 'none')};
    color: ${(props: any) => (props.isComplete ? props.theme.colors.greyL1 : props.theme.colors.blackL1)};
    font-weight: 500;
    margin-left: 1rem;
  `
};

export default TodoListItem;
