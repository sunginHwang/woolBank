import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ITodo } from '../../models/ITodo';
import IcoCircleCheck from '../icon/IcoCircleCheck';
import colors from '../../style/colors';
import IcoTrashCan from '../icon/IcoTrashCan';
import IcoBlackCircle from '../icon/IcoBlackCircle';

interface TodoListItemProps {
  todo: ITodo;
  onToggleState: (id: ITodo) => void;
  onRemove: (id: number) => void;
}

function TodoListItem({ todo, onToggleState, onRemove }: TodoListItemProps) {
  /**
   * todo 완료 상태 토글
   */
  const onToggleStateClick = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    onToggleState(todo);
  }, [todo, onToggleState]);

  /**
   * todo 삭제
   */
  const onRemoveClick = useCallback(() => {
    onRemove(todo.id);
  }, [todo, onRemove]);

  return (
    <S.TodoListItem>
      <div>
        <i onClick={onToggleStateClick}>
          {
            todo.isComplete
              ? <IcoCircleCheck fill={colors.colors.navyD1} />
              : <IcoBlackCircle fill={colors.colors.navyD1} />
          }
        </i>
        <S.ListTitle isComplete={todo.isComplete}>{todo.title}</S.ListTitle>
      </div>
      <div onClick={onRemoveClick}>
        <IcoTrashCan fill={colors.colors.greyD2} />
      </div>
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
    border-radius: .8rem;
    box-shadow: rgb(220, 220, 233) .1rem .4rem 1.7rem .3rem;
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
    margin-top: .1rem;
    line-height: 1.2rem;
    text-decoration: ${(props: any) => props.isComplete ? 'line-through' : 'none'};
    color: ${(props: any) => props.isComplete ? props.theme.colors.greyL1 : props.theme.colors.blackL1};
    font-weight: 500;
    margin-left: 1rem;
  `
};

export default TodoListItem;
