import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import IcoBlackCircle from '../icon/IcoBlackCircle';
import IcoClose from '../icon/IcoClose';

type TodoInputProps = {
};

function TodoInput({}: TodoInputProps) {
  return (
    <S.TodoInput>
      <div>
        <i>
          <IcoBlackCircle fill={colors.colors.navyD1} />
        </i>
        <input />
      </div>
      <div>
        <IcoClose fill={colors.colors.greyD2} />
      </div>
    </S.TodoInput>
  )
}

const S: {
  TodoInput: any;
} = {
  TodoInput: styled.div`
    display: flex;
    width: 100%;
    padding: .9rem 1.5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: .8rem;
    box-shadow: rgb(220, 220, 233) .1rem .4rem 1.7rem .3rem;
  
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      
      &:first-child {
        flex: 1;
      }
    }
    
    i {
      height: 2.4rem;
      margin-right: 1rem;
    }
    
    input {
      flex: 1;
      background-color: #F2F3F5;
      border-radius: .8rem;
      padding: 1rem 2rem;
      border: 0.1rem solid ${props => props.theme.colors.greyL2};
      font-size: 1.3rem;
      margin-right: .5rem;
      
      &::placeholder {
        color: #65676B;
      }
    }
  `
};

export default TodoInput;
