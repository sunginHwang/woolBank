import React from 'react';
import styled from 'styled-components';
import { ITodo } from '../../models/ITodo';
import IcoCircleCheck from '../icon/IcoCircleCheck';
import colors from '../../style/colors';
import IcoTrashCan from '../icon/IcoTrashCan';

interface TodoListItemProps {
  todo: ITodo
}

function TodoListItem({ todo }: TodoListItemProps) {
  return (
    <S.TodoListItem>
      <div>
        <IcoCircleCheck fill={colors.colors.navyD1} />
        <span>{todo.title}</span>
      </div>
      <div>
        <IcoTrashCan fill={colors.colors.greyD2} />
      </div>
    </S.TodoListItem>
  );
}

const S: {
  TodoListItem: any;
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
  
    div{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span {
      font-size: 1.4rem;
      margin-top: .1rem;
      line-height: 1.2rem;
      color: black;
      font-weight: 500;
      margin-left: 1rem;
    }
    
    
  `
};

export default TodoListItem;
