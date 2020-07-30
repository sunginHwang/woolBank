import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import { ClipLoader } from 'react-spinners';
import IcoPlus from '../icon/IcoPlus';

type AddTodoButtonProps = {
  loading?: boolean;
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
};

function TodoAddButton({
  loading = false,
  onClick
}: AddTodoButtonProps) {
  const onButtonClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    // 로딩중 && 비활성화 상태 일시 버튼 클릭  안되도록
    if (!loading && onClick) {
      onClick(e);
    }
  }
  const elMessage = <IcoPlus />;
  return (
    <S.BaseButton
      onClick={onButtonClick}
    >
      {loading
        ? <ClipLoader color={colors.colors.white} size={20} />
        : elMessage}
    </S.BaseButton>
  );
}

const S: {
  BaseButton: any;
} = {
  BaseButton: styled.button`
  border-radius: 50%; 
  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: .1rem solid ${props => props.theme.colors.navyD1};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.navyD1};
  `
};

export default TodoAddButton;
