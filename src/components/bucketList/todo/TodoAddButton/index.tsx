import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

import IcoPlus from '@components/atoms/icon/IcoPlus';

import palette from '@style/palette';

export interface AddTodoButtonProps {
  loading?: boolean;
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

/**
 * todo 추가 버튼
 * @component
 */

function TodoAddButton({ loading = false, onClick }: AddTodoButtonProps) {
  const onAddClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    // 로딩중 && 비활성화 상태 일시 버튼 클릭  안되도록
    if (!loading && onClick) {
      onClick(e);
    }
  };

  return (
    <S.TodoAddButton onClick={onAddClick}>
      {loading ? <ClipLoader color={palette.mainColor} size={20} /> : <IcoPlus />}
    </S.TodoAddButton>
  );
}

export default TodoAddButton;

const S: {
  TodoAddButton: any;
} = {
  TodoAddButton: styled.button`
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.1rem solid ${({ theme }) => theme.colors.mainColor};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.mainColor};
  `
};
