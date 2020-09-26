import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

import IcoPlus from '@components/icon/IcoPlus';

import colors from '@style/colors';

export interface AddTodoButtonProps {
  loading?: boolean;
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
};

function TodoAddButton({ loading = false, onClick }: AddTodoButtonProps) {
  /**
   * todo 추가 하기
   **/
  const onAddClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    // 로딩중 && 비활성화 상태 일시 버튼 클릭  안되도록
    if (!loading && onClick) {
      onClick(e);
    }
  };

  return (
    <S.TodoAddButton onClick={onAddClick}>
      {loading ? <ClipLoader color={colors.colors.mainColor} size={20} /> : <IcoPlus />}
    </S.TodoAddButton>
  );
}

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
    border: 0.1rem solid ${(props) => props.theme.colors.mainColor};
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.mainColor};
  `
};

export default TodoAddButton;
